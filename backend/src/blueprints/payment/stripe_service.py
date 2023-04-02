from flask import Blueprint, jsonify
import os
import stripe

bp_url_prefix = "/payment"
stripe_service = Blueprint("stripe_service", __name__, url_prefix=bp_url_prefix)

stripe.api_key = os.getenv("STRIPE_API_KEY")


@stripe_service.route("/create-payment-intent", methods=["GET"])
def create_payment():
    # Create a PaymentIntent with the amount,
    # currency, and a payment method type.
    # See the documentation [0] for the full list of supported parameters.
    #
    # [0] https://stripe.com/docs/api/payment_intents/create
    try:
        intent = stripe.PaymentIntent.create(
            amount=1999,
            currency="EUR",
            automatic_payment_methods={
                "enabled": True,
            },
        )

        # Send PaymentIntent details to the front end.
        return jsonify({"clientSecret": intent.client_secret})
    except stripe.error.StripeError as e:  # type: ignore
        return jsonify({"error": {"message": str(e)}}), 400
    except Exception as e:
        return jsonify({"error": {"message": str(e)}}), 400


@stripe_service.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    session = stripe.checkout.Session.create(
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
        mode="payment",
        success_url="http://localhost:3000/",
        cancel_url="http://localhost:3000/",
    )
    return {"success": True, "redirect": session.url}
