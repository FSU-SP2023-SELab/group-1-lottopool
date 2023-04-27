from .fixtures import db_fixture  # noqa


def test_index(client):  # noqa: F811
    """Ensure that an index page is recieved"""

    # With context...
    with client:
        # Get index
        res = client.get("/api/status", follow_redirects=True)

        # Assert that it's ok
        assert res.status_code == 200
