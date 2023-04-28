from flask import Blueprint, request, g

from .security.guards import admin_guard
from ..models import Pool, Ticket, UserBalance
from .messages import Message, ErrorMessage

# create main admin blueprint
admin = Blueprint("admin", __name__, url_prefix="/admin")


@admin.route("/get_pool/<pool_id>", methods=["GET"])
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


@admin.route("/add_pool", methods=["POST"])
@admin_guard
def admin_add_pool():
    """
    Allows admin to create a new pool

    ACCEPTS: Pool
    """

    data = request.json
    pool = Pool(**data)

    pool.save()
    return pool.to_dict()


@admin.route("/list_tickets/<pool_id>", methods=["GET"])
@admin_guard
def admin_list_tickets(pool_id: str):
    """
    Gets all tickets for for a given pool
    """

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

    # Convert to array and add all tickets
    ticket_data = [t.to_dict() for t in Ticket.find_by_pool(pool)]

    # Format Message
    m = Message("success")
    m["tickets"] = ticket_data

    # Return message
    return m.to_dict()


@admin.route("/mark_won", methods=["POST"])
@admin_guard
def admin_set_won():
    """
    Marks a pool as won and handles accordingly

    ACCEPTS:
    {
        "pool_id": str,
        "won": bool
    }
    """

    # Get payload
    data = request.json
    if "pool_id" not in data or "won" not in data:
        return (
            ErrorMessage(
                "No Pool Found", "Could not find a pool with matching criteria!"
            ).to_dict(),
            404,
        )

    # Get pool by UUID
    pool_id = data["pool_id"]
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

    # Sanity check
    new_val = 1 if data["won"] else 0
    if new_val == pool.won:
        return (
            ErrorMessage("Bad Request", f"pool.won is already {new_val}").to_dict(),
            400,
        )

    # Set new val
    pool.set_won_and_save(new_val)

    # Calculate Balances
    breakdown = pool.get_breakdown()
    total_cnt = pool.get_ticket_count()

    # Modify user balances
    for user in breakdown:
        # Calculate Balance
        user_cnt = breakdown[user]
        payout = (pool.jackpot / total_cnt) * user_cnt
        print(f"{user} won {payout}")

        # Get User Balance
        bal = UserBalance.get_user_balance(user)
        if pool.won == 1:
            bal.add(payout)
        elif pool.won == 0:
            bal.sub(payout)
        bal.save()

    # Format pool as dict
    pool_data = pool.to_dict()

    # Format Message
    m = Message("success")
    m["pool"] = pool_data

    # Return message
    return m.to_dict()


@admin.route("set_pool_acquired", methods=["POST"])
@admin_guard
def admin_mark_acquired():
    """
    Marks all tickets from a pool as acquired

    ACCEPTS:
    {
        "pool_id": str,
        "picture_url": str
    }
    """

    # Get payload
    data = request.json
    if "pool_id" not in data or "picture_url" not in data:
        return (
            ErrorMessage(
                "No Pool Found", "Could not find a pool with matching criteria!"
            ).to_dict(),
            404,
        )

    # Get pool by UUID
    pool_id = data["pool_id"]
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

    # Get all tickets by pool, and mark as acquired
    tix = Ticket.find_by_pool(pool)
    for ticket in tix:
        ticket.acquired = 1
        ticket.picture_url = data["picture_url"]
        ticket.save()

    # Return message
    return Message("success").to_dict()
