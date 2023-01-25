import pytest
from lotterypool import create_app


@pytest.fixture
def app():

    # create app using testing config
    app = create_app({"TESTING": True})

    # return it
    return app


@pytest.fixture
def client(app):
    return app.test_client()