from .fixtures import db_fixture  # noqa


def test_index(client, db_fixture):  # noqa: F811
    """Ensure that an index page is recieved"""

    # With context...
    with client:
        # Get index
        res = client.get("/api/landing", follow_redirects=True)

        # Assert that it's ok
        assert res.status_code == 200
