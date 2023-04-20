from flask import Blueprint

from .messages import Message, ErrorMessage
from ..models import Pool, Ticket

# create main api blueprint
api = Blueprint("api", __name__)


@api.route(
    "/hello-world",
    methods=[
        "GET",
    ],
)
def apihello():
    # renders the api response

    return {"message": "Hello from the API"}


@api.route("/landing", methods=["GET"])
def landing_page():
    """
    Returns the stats for the latest pool!
    """

    # Get latest pool
    lp = Pool.find_latest()
    if not lp:
        return ErrorMessage(
            "No Pool Found", "Could not find a pool with matching criteria!"
        )

    # Get people in pool
    tix_count = lp.get_ticket_count()
    user_count = lp.get_ticket_count(unique=True)

    # Format Message
    m = Message("success")
    m["pool"] = lp.to_dict()
    m["tix_count"] = tix_count
    m["user_count"] = user_count

    # Return message
    return m.to_dict()
