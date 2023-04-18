import jwt
import os

from src.blueprints.messages.error_messages import (
    signing_key_unavailable_message,
    invalid_token_message,
    jwks_uri_not_initialized_message,
    signing_key_not_found_message,
)


class Auth0Service:
    """Perform JSON Web Token (JWT) validation using PyJWT"""

    def __init__(self):
        self.issuer_url = None
        self.audience = None
        self.algorithm = ["RS256"]
        self.jwks_uri = None

    def initialize(self, auth0_domain, auth0_audience):
        self.issuer_url = f"https://{auth0_domain}/"
        self.jwks_uri = f"{self.issuer_url}.well-known/jwks.json"
        self.audience = auth0_audience

    def get_signing_key(self, token):
        if not self.jwks_uri:
            return jwks_uri_not_initialized_message()

        try:
            jwks_client = jwt.PyJWKClient(self.jwks_uri)
            return jwks_client.get_signing_key_from_jwt(token).key
        except Exception as error:
            return signing_key_unavailable_message(error)

    def has_admin_role(self, payload):
        if not payload:
            return False

        namespace = os.getenv("AUTH0_DOMAIN")
        roles = payload.get(f"{namespace}roles", [])
        return "Admin" in roles

    def validate_jwt(self, token):
        try:
            jwt_signing_key = self.get_signing_key(token)
            if not jwt_signing_key:
                return signing_key_not_found_message()

            payload = jwt.decode(
                token,
                jwt_signing_key,  # type: ignore
                algorithms=self.algorithm,
                audience=self.audience,
                issuer=self.issuer_url,
            )
        except Exception as error:
            return invalid_token_message(error)

        return payload


auth0_service = Auth0Service()
