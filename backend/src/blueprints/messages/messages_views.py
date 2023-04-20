from flask import Blueprint, g
from .message import Message
from ..security.guards import login_guard
from ..security.auth0_service import auth0_service

bp_url_prefix = "/messages"
messages = Blueprint("messages", __name__, url_prefix=bp_url_prefix)


@messages.route("/public")
def public():
    return vars(Message("No access required."))


@messages.route("/protected_or_admin")
@login_guard
def protected_or_admin():
    if auth0_service.has_admin_role(g.access_token):
        return vars(Message("The API successfully recognized you as an admin."))
    else:
        return vars(Message("The API successfully validated your access token."))
