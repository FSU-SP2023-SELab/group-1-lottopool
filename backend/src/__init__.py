import os
from flask import Flask
from flask_cors import CORS

from .db import db_check_first_run
from .middleware import PrefixMiddleware
from flask_talisman import Talisman
from .blueprints.security.auth0_service import auth0_service
from .blueprints.messages.message import ErrorMessage


def create_app(test_config=None):
    """
    WSGI app builder function
    - We use this builder function to configure our application before it is
      exposed to any other modules. This ensures that regardless of whether
      flask or pytest is running it, the app is identical.
    """

    # Environment Variables
    auth0_audience = os.getenv("AUTH0_AUDIENCE")
    auth0_domain = os.getenv("AUTH0_DOMAIN")

    # Initialize application
    app = Flask(__name__)

    # Initialize database
    db_check_first_run()

    # Initialize Auth0
    auth0_service.initialize(auth0_domain, auth0_audience)

    # CORS Initialization
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

    # Security Header Middleware
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

    # More Init CORS
    # TODO: merge with talisman?
    if os.getenv("FLASK_DEBUG") == "1":
        print("Debug detected, Starting with CORS...")
        CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

    # Init WSGI server to serve everything prefixed w/ `/api`
    # It will return 404 errors for anything not in thie subdir
    app.wsgi_app = PrefixMiddleware(app.wsgi_app, prefix="/api")

    # Add 404 Handler
    @app.errorhandler(404)
    def not_found_error(error):
        return (
            ErrorMessage(
                "Not Found", "The requested URL is not on this server."
            ).to_dict(),
            404,
        )

    # Handle testing config, if it was passed in
    # We call this second because we want to overwite MONGO_URI
    # See: conftest.py:pytest_configure()
    if test_config:
        app.config.update(**test_config)

    # Import blueprints

    from .blueprints import index, api, db_handler, messages, admin, stripe_service

    app.register_blueprint(index)
    app.register_blueprint(api)
    app.register_blueprint(admin)
    app.register_blueprint(db_handler)
    app.register_blueprint(messages)
    app.register_blueprint(stripe_service)

    # Return app object
    return app
