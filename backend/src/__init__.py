import os
from flask import Flask
from flask_cors import CORS
from .middleware import PrefixMiddleware


def create_app(test_config=None):
    """
    WSGI app builder function
    - We use this builder function to configure our application before it is
      exposed to any other modules. This ensures that regardless of whether
      flask or pytest is running it, the app is identical.
    """

    # Initialize application
    app = Flask(__name__)

    # Init CORS
    if os.environ["FLASK_DEBUG"] == "1":
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
    from .blueprints import index, api

    app.register_blueprint(index)
    app.register_blueprint(api)

    # Return app object
    return app
