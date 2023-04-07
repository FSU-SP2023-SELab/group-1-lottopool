from flask import Blueprint, g

from ..db import init_db_conn
from ..models import Pool, Income, Payout, Agency, Ticket

# Create main db blueprint
# - This Blueprint is mainly used to register before and after
#   request handlers related to database functions
db_handler = Blueprint("db", __name__)


@db_handler.before_app_request
def add_db_to_scope():
    """Adds DB connector to the request's global scope, if one doesn't already
    exist"""

    # Check using 'in' operator to avoid KeyErrors
    if "db" not in g:
        g.db = init_db_conn()


@db_handler.teardown_app_request
def remove_db_from_scope(res):
    """Closes DB connector after request is done, if it's still open"""

    # If still open, close
    if g.db:
        g.db.commit()
        g.db.close()

    # Return response
    return res


@db_handler.get("/huh")
def huh():
    """NOTE: This is a temp tester function that should be removed!"""

    # fake a user
    u = "abcdefg1234"

    # make an agency
    a = Agency()
    a.name = "save function tester"
    a.address = "100 test st."
    a.phone = "1-800-555-test"
    print("Agency:", a)
    a.save()

    # make a pool
    p = Pool()
    p.name = "Powerball for April 20th"
    p.set_agency(a)
    p.jackpot = 1000000.00
    print("Pool:", p)
    p.save()

    # make a ticket for the pool
    t = Ticket()
    t.set_user(u)
    t.set_pool(p)
    t.value = 3.00
    print("Ticket:", t)
    t.save()

    # report some income
    i = Income()
    i.set_agency(a)
    i.set_pool(p)
    i.amount = 700000.00
    print("Income:", i)
    i.save()

    # report a payout
    o = Payout()
    o.set_pool(p)
    o.set_user(u)
    o.amount = 695000.00
    print("Payout:", o)
    o.save()

    # return EVERYTHING
    return {
        "user_id": u,
        "agency": vars(a),
        "pool": vars(p),
        "ticket": vars(t),
        "income": vars(i),
        "payout": vars(o),
    }


@db_handler.get("/tickets")
def tickets():
    """NOTE: This is a temp tester function that should be removed!"""

    t = Ticket.find_by_uuid("9d9a7492-b125-4f38-8af4-cb0678a9c4d5")
    print(t)

    return vars(t)
