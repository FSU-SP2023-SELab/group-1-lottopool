from flask import Blueprint
from src.blueprints.messages.message import Message
from src.blueprints.security.guards import (
    authorization_guard,
)

bp_url_prefix = "/messages"
messages = Blueprint("messages", __name__, url_prefix=bp_url_prefix)


@messages.route("/public")
def public():
    return vars(Message("No access required."))


@messages.route("/protected")
@authorization_guard
def protected():
    return vars(Message("The API successfully validated your access token."))


@messages.route("/admin")
@authorization_guard
def admin():
    return vars(Message("The API successfully recognized you as an admin."))
