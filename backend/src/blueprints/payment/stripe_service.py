from flask import Blueprint, request
import os
import stripe

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
        # TODO: run some custom code here
        user_id = event["data"]["object"]["client_reference_id"]
        print("post payment id: ", user_id)

    return "Success", 200


@stripe_service.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    authId = request.headers.get("Auth-Token", type=str)
    print("pre payment id: ", authId)
    session = stripe.checkout.Session.create(
        client_reference_id=authId,
        line_items=[
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": "Ticket",
                    },
                    "unit_amount": 100,
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
    return {"success": True, "redirect": session.url}
