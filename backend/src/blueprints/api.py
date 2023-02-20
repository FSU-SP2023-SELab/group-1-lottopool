from flask import Blueprint

# create main api blueprint
api = Blueprint("api", __name__)


@api.route(
    "/hello-world",
    methods=[
        "GET",
    ],
)
def apihello():
    # renders the api response

    return {"message": "Hello from the API"}
