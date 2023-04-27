from flask import Blueprint, g

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
