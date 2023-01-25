import pytest

def test_index(client):
    """Ensure that an index page is recieved"""

    # With context...
    with client:

        # Get index
        res = client.get(
            "/",
            follow_redirects=True
        )

        # Assert that it's ok
        assert res.status_code == 200
