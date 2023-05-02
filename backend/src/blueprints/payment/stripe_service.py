from flask import Blueprint, request, g
import os
import stripe
from ..security.guards import login_guard
from ...models.ticket import Ticket, Pool
from ...blueprints.messages.message import ErrorMessage

bp_url_prefix = "/payment"
stripe_service = Blueprint("stripe_service", __name__, url_prefix=bp_url_prefix)

stripe.api_key = os.getenv("STRIPE_API_KEY")
endpoint_secret = os.getenv("STRIPE_ENDPOINT_SECRET")
client_origin_url = os.getenv("CLIENT_ORIGIN_URL")


@stripe_service.route("/webhook", methods=["POST"])
def stripe_webhook():
    """
    Webhook that Stripe POSTs to upon event completion
    """

    # Get data from request
    payload = request.get_data(as_text=True)
    sig_header = request.headers.get("Stripe-Signature", type=str)

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)

    # Invalid payload
    except ValueError:
        return "Invalid payload", 400

    # Invalid signature
    except stripe.error.SignatureVerificationError:
        return "Invalid signature", 400

    # Handle the checkout.session.completed event
    if event["type"] == "checkout.session.completed":
        # Get corresponding ticket id
        ticket_id = event["data"]["object"]["client_reference_id"]

        # Update Ticket
        updatedTicket = Ticket.find_by_uuid(ticket_id)
        updatedTicket.set_paid_for(True)
        updatedTicket.save()

        # Print for logs
        print("Payment was successful. Ticket:", ticket_id)

        return "Success", 200

    elif event["type"] == "checkout.session.expired":
        # TODO: Add handling for session failures to delete bad tickets
        ticket_id = event["data"]["object"]["client_reference_id"]
        deletedTicket = Ticket.find_by_uuid(ticket_id)
        # maybe deletedticket.delete()?
        return "Checkout expired", 400

    # If we hit this block, it's an event we're not sure how to handle.
    # Log it, but do nothing.
    else:
        print("WARNING: Stripe webhook recieved unhandled event:", event["type"])

    # Return 200 regardless
    # We do this so that the webhook doesn't fire multiple times
    # REF: https://stripe.com/docs/webhooks#built-in-retries
    return "Ok", 200


@stripe_service.route("/create-checkout-session", methods=["POST"])
@login_guard
def create_checkout_session():
    """
    Creates a checkout sesison for the user to buy a ticket
    """

    # Get JSON payload
    data = request.json
    if not data or "ticketNums" not in data or "poolId" not in data:
        return ErrorMessage("Bad Request", "Malformed JSON payload").to_dict(), 400

    # Get data from payload
    ticketNums = data["ticketNums"]
    poolId = data["poolId"]

    # Get Pool
    pool = Pool.find_by_uuid(poolId)
    if not pool:
        return (
            ErrorMessage(
                "Resource not found",
                "The requested pool resource is not found in our database",
            ).to_dict(),
            400,
        )

    # Calculate Values
    unit_price = int(pool.ppt * 100)

    # Create new ticket
    checkoutTicket = Ticket(user_id=g.user_id, pool_id=poolId, numbers=ticketNums)
    checkoutTicket.save()

    # Create checkout session object
    # NOTE: client_reference_id is the ticket id
    session = stripe.checkout.Session.create(
        client_reference_id=checkoutTicket.id,
        line_items=[
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": "Ticket",
                    },
                    "unit_amount": unit_price,
                },
                "quantity": 1,
            }
        ],
        automatic_tax={
            "enabled": True,
        },
        mode="payment",
        success_url=client_origin_url,
        cancel_url=client_origin_url,
    )

    # Return redirect request to the frontend
    return {"success": True, "redirect": session.url}
