from flask import Blueprint, request, session, render_template, redirect, \
    url_for, flash

# Create main frontend blueprint
index = Blueprint(
    "index",
    __name__,
)

# Index page
@index.route("/", methods=["GET", "POST"])
def homepage():
    """
    Renders the homepage
    """

    return "Hello, world!"