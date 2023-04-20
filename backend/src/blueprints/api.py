from flask import Blueprint, g

from .messages import Message, ErrorMessage
from .security.guards import protected_or_admin_guard
from ..models import Pool, Ticket, UserBalance

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


@api.route("/dashboard", methods=["GET"])
@protected_or_admin_guard
def dashboard(**kwargs):
    """
    Returns total earnings and tickets held
    """

    # Get Current Balance
    bal = UserBalance.get_user_balance(g.user_id)

    # Get current tickets
    tickets = []
    pools = Pool.get_current_pools()
    if pools:
        for pool in pools:
            tickets += Ticket.find_by_pool(pool, g.user_id)

    # Format Message
    m = Message("success")
    m["balance"] = bal.amount
    m["cur_tickets"] = [t.to_dict() for t in tickets]

    # Return message
    return m.to_dict()


@api.route("/pools", methods=["GET"])
@protected_or_admin_guard
def get_current_pools(**kwargs):
    """
    Gets all current pools
    """

    # Get current pools
    pools = Pool.get_current_pools()

    # Modify the dicts before we ship it
    pool_data_list = []
    if pools:
        for pool in pools:
            pool_data = pool.to_dict()
            pool_data["tix_count"] = pool.get_ticket_count()
            pool_data["user_count"] = pool.get_ticket_count(unique=True)
            pool_data_list.append(pool_data)

    # Format Message
    m = Message("success")
    m["pools"] = pool_data_list

    # Return message
    return m.to_dict()
