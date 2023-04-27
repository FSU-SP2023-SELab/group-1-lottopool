from flask import Blueprint, request

from .security.guards import admin_guard
from ..models import Pool, Ticket, UserBalance
from .messages import Message, ErrorMessage

# create main admin blueprint
admin = Blueprint("admin", __name__, url_prefix="/admin")


@admin.route("/pool/<pool_id>", methods=["GET"])
@admin_guard
def admin_get_pool(pool_id: str):
    """Gets admin view of pool, including all tickets"""

    # Get pool by UUID
    print(pool_id)
    pool = Pool.find_by_uuid(pool_id)

    # If not found, return error
    if not pool:
        return (
            ErrorMessage(
                "No Pool Found", "Could not find a pool with matching criteria!"
            ).to_dict(),
            404,
        )

    # Convert to dict and add all tickets
    pool_data = pool.to_dict()
    pool_data["all_tickets"] = [t.to_dict() for t in Ticket.find_by_pool(pool)]

    # Format Message
    m = Message("success")
    m["pool"] = pool_data

    # Return message
    return m.to_dict()


@admin.route("/pool/add_pool", methods=["POST"])
@admin_guard
def admin_add_pool():
    """Allows admin to create a new pool"""

    data = request.json
    pool = Pool(**data)

    pool.save()
    return pool.to_dict()


@admin.route("pool/list_tickets", methods=["GET"])
@admin_guard
def admin_list_tickets(pool_id: str):
    # Get pool by UUID
    print(pool_id)
    pool = Pool.find_by_uuid(pool_id)

    # If not found, return error
    if not pool:
        return (
            ErrorMessage(
                "No Pool Found", "Could not find a pool with matching criteria!"
            ).to_dict(),
            404,
        )
    # Convert to dict and add all tickets
    ticket_data = [t.to_dict() for t in Ticket.find_by_pool(pool)]

    # Format Message
    m = Message("success")
    m["tickets"] = ticket_data

    # Return message
    return m.to_dict()


@admin.route("pool/has_won", methods=["POST"])
@admin_guard
def admin_has_won(pool_id: str, victory: int):
    # Get pool by UUID
    print(pool_id)
    pool = Pool.find_by_uuid(pool_id)

    # If not found, return error
    if not pool:
        return (
            ErrorMessage(
                "No Pool Found", "Could not find a pool with matching criteria!"
            ).to_dict(),
            404,
        )
    # Set the pool's won field to the int passed in (0: false, 1: true)
    pool.won = victory
    pool.save()

    # Format pool as dict
    pool_data = pool.to_dict()
    # Format Message
    m = Message("success")
    m["pool"] = pool_data

    # Return message
    return m.to_dict()


@admin.route("pool/mark_purchased", methods=["POST"])
@admin_guard
def admin_mark_purchased(ticket_id: str, victory: int):
    # Get pool by UUID
    print(ticket_id)
    ticket = Ticket.find_by_uuid(ticket_id)

    # If not found, return error
    if not ticket:
        return (
            ErrorMessage(
                "No Ticket Found", "Could not find a ticket with matching criteria!"
            ).to_dict(),
            404,
        )
    # Set the pool's won field to the int passed in (0: false, 1: true)
    ticket.acquired = victory
    ticket.save()

    # Format pool as dict
    ticket_data = ticket.to_dict()
    # Format Message
    m = Message("success")
    m["ticket"] = ticket_data

    # Return message
    return m.to_dict()
