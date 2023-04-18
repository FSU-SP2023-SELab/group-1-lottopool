from functools import wraps
from http import HTTPStatus


from flask import request, g

from src.blueprints.security.auth0_service import auth0_service
from src.utils import json_abort

unauthorized_error = {"message": "Requires authentication"}

invalid_request_error = {
    "error": "invalid_request",
    "error_description": "Authorization header value must follow this format:\
        Bearer access-token",
    "message": "Requires authentication",
}


def get_bearer_token_from_request():
    authorization_header = request.headers.get("Authorization", None)

    if not authorization_header:
        json_abort(HTTPStatus.UNAUTHORIZED, unauthorized_error)
        return

    authorization_header_elements = authorization_header.split()

    if len(authorization_header_elements) != 2:
        json_abort(HTTPStatus.BAD_REQUEST, invalid_request_error)
        return

    auth_scheme = authorization_header_elements[0]
    bearer_token = authorization_header_elements[1]

    if not (auth_scheme and auth_scheme.lower() == "bearer"):
        json_abort(HTTPStatus.UNAUTHORIZED, unauthorized_error)
        return

    if not bearer_token:
        json_abort(HTTPStatus.UNAUTHORIZED, unauthorized_error)
        return

    return bearer_token


def protected_or_admin_guard(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_bearer_token_from_request()
        validated_token = auth0_service.validate_jwt(token)

        # Checks to make sure validated_token is dict
        if not isinstance(validated_token, dict):
            return json_abort(403, {"message": "Permission denied"})

        g.access_token = validated_token

        # Check if the user is an admin or protected
        if auth0_service.has_admin_role(validated_token):
            return f(*args, **kwargs, admin=True)
        elif validated_token.get("sub"):
            return f(*args, **kwargs, admin=False)
        else:
            return json_abort(403, {"message": "Permission denied"})

    return decorated


def permissions_guard(required_permissions=None):
    def decorator(function):
        @wraps(function)
        def wrapper():
            access_token = g.get("access_token")

            if not access_token:
                json_abort(401, unauthorized_error)
                return

            if required_permissions is None:
                return function()

            if not isinstance(required_permissions, list):
                json_abort(500, {"message": "Internal Server Error"})

            token_permissions = access_token.get("permissions")

            if not token_permissions:
                json_abort(403, {"message": "Permission denied"})

            required_permissions_set = set(required_permissions)
            token_permissions_set = set(token_permissions)

            if not required_permissions_set.issubset(token_permissions_set):
                json_abort(403, {"message": "Permission denied"})

            return function()

        return wrapper

    return decorator
