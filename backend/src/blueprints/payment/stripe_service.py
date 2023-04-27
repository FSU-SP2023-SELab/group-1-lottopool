from flask import Blueprint, request, g
import os
import stripe
from ..security.guards import login_guard
from ...models.ticket import Ticket

bp_url_prefix = "/payment"
stripe_service = Blueprint("stripe_service", __name__, url_prefix=bp_url_prefix)

stripe.api_key = os.getenv("STRIPE_API_KEY")
endpoint_secret = os.getenv("STRIPE_ENDPOINT_SECRET")
client_origin_url = os.getenv("CLIENT_ORIGIN_URL")


@stripe_service.route("/webhook", methods=["POST"])
def stripe_webhook():
    payload = request.get_data(as_text=True)
    sig_header = request.headers.get("Stripe-Signature", type=str)

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)

    except ValueError as e:
        # Invalid payload
        return "Invalid payload", 400
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return "Invalid signature", 400

    # Handle the checkout.session.completed event
    if event["type"] == "checkout.session.completed":
        print("Payment was successful.")
        # client_reference_id is the ticket id
        ticket_id = event["data"]["object"]["client_reference_id"]
        updatedTicket = Ticket.find_by_uuid(ticket_id)
        updatedTicket.set_paid_for(True)
        updatedTicket.save()
        return "Success", 200
    else:
        print("Payment was unsuccessful.")

    return "Failure", 400


@stripe_service.route("/create-checkout-session", methods=["GET"])
@login_guard
def create_checkout_session():
    args = request.args
    # grab headers sent from frontend, default 0
    ticketNums = args.get("ticketNums", "0")
    poolId = args.get("poolId", "0")

    print("pre payment id: ", g.user_id)

    checkoutTicket = Ticket(user_id=g.user_id, pool_id=poolId, numbers=ticketNums)
    # checkout session object creation
    session = stripe.checkout.Session.create(
        # client_reference_id is the ticket id
        client_reference_id=checkoutTicket.id,
        line_items=[
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": "Ticket",
                    },
                    "unit_amount": 250,
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

    checkoutTicket.save()
    return {"success": True, "redirect": session.url}
