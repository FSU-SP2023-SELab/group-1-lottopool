from flask import Blueprint

from src.blueprints.messages.messages_service import (
    get_public_message,
    get_protected_message,
    get_admin_message,
)
from src.blueprints.security.guards import (
    authorization_guard,
)

bp_url_prefix = "/messages"
messages = Blueprint("messages", __name__, url_prefix=bp_url_prefix)


@messages.route("/public")
def public():
    return vars(get_public_message())


@messages.route("/protected")
@authorization_guard
def protected():
    return vars(get_protected_message())


@messages.route("/admin")
@authorization_guard
def admin():
    return vars(get_admin_message())
