from flask import g


class Users:
    """The model used to represent users"""

    def __init__(self, id: str, auth0_id: str):
        self.id = id
        self.auth0_id = auth0_id

    def __repr__(self) -> str:
        return f'User(id="{self.id}")'

    @classmethod
    def find_by_uuid(self, id: str):
        cur = g.db.cursor(dictionary=True)
        cur.execute(f"SELECT * FROM users WHERE id='{id}'")
        data = cur.fetchone()
        return Users(**data)
