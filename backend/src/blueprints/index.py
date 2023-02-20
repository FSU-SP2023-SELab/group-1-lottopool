from flask import Blueprint

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
