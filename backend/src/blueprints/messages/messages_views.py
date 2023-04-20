from flask import Blueprint
from src.blueprints.messages.message import Message
from src.blueprints.security.guards import (
    protected_or_admin_guard,
)

bp_url_prefix = "/messages"
messages = Blueprint("messages", __name__, url_prefix=bp_url_prefix)


@messages.route("/public")
def public():
    return vars(Message("No access required."))


@messages.route("/protected_or_admin")
@protected_or_admin_guard
def protected_or_admin(admin=False):
    if admin:
        return vars(Message("The API successfully recognized you as an admin."))
    else:
        return vars(Message("The API successfully validated your access token."))
