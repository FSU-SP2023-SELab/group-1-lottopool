import os
from flask import Flask

def create_app(test_config=None):
    """
    WSGI app builder function
    - We use this builder function to configure our application before it is 
      exposed to any other modules. This ensures that regardless of whether 
      flask or pytest is running it, the app is identical.
    """

    # Initialize application
    app = Flask(__name__)

    # Handle testing config, if it was passed in
    # We call this second because we want to overwite MONGO_URI
    # See: conftest.py:pytest_configure()
    if test_config:
        app.config.update(**test_config)

    # Import blueprints
    from .blueprints import index
    app.register_blueprint(index)

    # Return app object
    return app