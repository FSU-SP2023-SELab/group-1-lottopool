from flask import Blueprint, g

from ..db import init_db_conn
from ..models import Agency, Users

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
        g.db.close()

    # Return response
    return res


@db_handler.get("/huh")
def huh():
    """NOTE: This is a temp tester function that should be removed!"""

    a = Agency.find_by_uuid("a6545b27-d403-11ed-9ffa-0242ac140002")
    print(a)
    return vars(a)


@db_handler.get("/users")
def users():
    """NOTE: This is a temp tester function that should be removed!"""

    u = Users.find_by_uuid("1091751e-d4a4-11ed-9ffa-0242ac140002")
    print(u)
    return vars(u)
