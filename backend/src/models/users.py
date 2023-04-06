import uuid
from flask import g


class Users:
    """The model used to represent users
    :param id: The user's ID
    :type id: str, optional
    :param auth0_id: The user's auth0 id number
    :type auth0_id: str, optional
    """

    def __init__(
        self,
        id: str = None,
        auth0_id: str = "",
    ):
        self.id = id if id else str(uuid.uuid4())
        self.auth0_id = auth0_id

    def __repr__(self) -> str:
        return f'User(id="{self.id}")'

    def save(self):
        """Commits current changes to database"""

        # Execute query
        cur = g.db.cursor()
        cur.execute(
            """
            REPLACE INTO users (id, auth0_id)
            VALUES (%(id)s, %(auth0_id)s)
            """,
            self.__dict__,
        )

    @classmethod
    def find_by_uuid(self, id: str):
        """
        Searches the database for a User by ID

        :param str id: The UUID to search for

        :returns: The corresponding User object
        :rtype: :class:`models.Users`
        """
        cur = g.db.cursor(dictionary=True)
        cur.execute(f"SELECT * FROM users WHERE id='{id}'")
        data = cur.fetchone()
        return Users(**data)
