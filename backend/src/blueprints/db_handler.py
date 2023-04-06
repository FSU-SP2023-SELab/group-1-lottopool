from flask import Blueprint, g

from ..db import init_db_conn
from ..models import Agency, Tickets

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

    a = Agency.find_by_uuid("b8197906-d49f-11ed-9ffa-0242ac140002")
    print(a)

    b = Agency()
    b.name = "save function tester"
    b.address = "100 test st."
    b.phone = "1-800-555-test"
    print(b)
    b.save()

    return {"a": vars(a), "b": vars(b)}


@db_handler.get("/tickets")
def tickets():
    """NOTE: This is a temp tester function that should be removed!"""

    t = Tickets.find_by_uuid("9d9a7492-b125-4f38-8af4-cb0678a9c4d5")
    print(t)

    return vars(t)
