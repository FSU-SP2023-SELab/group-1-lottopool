from src.blueprints.messages.message import ErrorMessage


def signing_key_unavailable_message(error):
    return vars(
        ErrorMessage(
            error="signing_key_unavailable",
            error_description="Unable to verify credentials",
        )
    )


def invalid_token_message(error):
    return vars(
        ErrorMessage(
            error="invalid_token",
            error_description="Bad credentials.",
        )
    )


def jwks_uri_not_initialized_message():
    return vars(
        ErrorMessage(
            error="jwks_uri_not_initialized",
            error_description="The JWKS URI has not been initialized.",
        )
    )


def signing_key_not_found_message():
    return vars(
        ErrorMessage(
            error="signing_key_not_found",
            error_description="The signing key could not be found.",
        )
    )
