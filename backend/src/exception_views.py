from flask import Blueprint, request, jsonify
from werkzeug import exceptions


exception = Blueprint("exception", __name__)


@exception.app_errorhandler(exceptions.InternalServerError)
def _handle_internal_server_error(ex):
    if request.path.startswith("/api/"):
        return jsonify(message=str(ex)), ex.code
    else:
        return ex


@exception.app_errorhandler(exceptions.NotFound)
def _handle_not_found_error(ex):
    if request.path.startswith("/api/"):
        return {"message": "Not Found"}, ex.code
    else:
        return ex
