import os
from flask import Flask
from flask_cors import CORS
from .middleware import PrefixMiddleware
from flask_talisman import Talisman
from src.blueprints.security.auth0_service import auth0_service
from utils import safe_get_env_var


def create_app(test_config=None):
    """
    WSGI app builder function
    - We use this builder function to configure our application before it is
      exposed to any other modules. This ensures that regardless of whether
      flask or pytest is running it, the app is identical.
    """

    # Environment Variables
    auth0_audience = safe_get_env_var("AUTH0_AUDIENCE")
    auth0_domain = safe_get_env_var("AUTH0_DOMAIN")

    # Initialize application
    app = Flask(__name__)

    # HTTP Security Headers

    csp = {"default-src": ["'self'"], "frame-ancestors": ["'none'"]}

    Talisman(
        app,
        force_https=False,
        frame_options="DENY",
        content_security_policy=csp,
        referrer_policy="no-referrer",
        x_xss_protection=False,
        x_content_type_options=True,
    )

    auth0_service.initialize(auth0_domain, auth0_audience)

    @app.after_request
    def add_headers(response):
        response.headers["X-XSS-Protection"] = "0"
        response.headers[
            "Cache-Control"
        ] = "no-store, max-age=0, \
            must-revalidate"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
        response.headers["Content-Type"] = "application/json; charset=utf-8"
        response.headers[
            "Strict-Transport-Security"
        ] = "max-age=31536000; includeSubDomains"
        return response

    # Init CORS
    if os.environ.get("FLASK_DEBUG") == "1":
        print("Debug detected, Starting with CORS...")
        CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

    # Init WSGI server to serve everything prefixed w/ `/api`
    # It will return 404 errors for anything not in thie subdir
    app.wsgi_app = PrefixMiddleware(app.wsgi_app, prefix="/api")

    # Handle testing config, if it was passed in
    # We call this second because we want to overwite MONGO_URI
    # See: conftest.py:pytest_configure()
    if test_config:
        app.config.update(**test_config)

    # Import blueprints
    from .blueprints import index, api, exception, messages

    app.register_blueprint(index)
    app.register_blueprint(api)
    app.register_blueprint(exception)
    app.register_blueprint(messages)

    # Return app object
    return app
