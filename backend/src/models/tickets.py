import uuid
from flask import g
from models import Users


class Tickets:
    """The model used to represent tickets
    :param id: The ticket's unique ID
    :type id: str, optional
    :param pool_id: The ticket's pool's ID
    :type pool_id: str, optional
    :param user_id: the ticket's user's ID
    :type user_id: str, optional
    :param value: The value of the ticket
    :type value: double, optional
    :param picture_url: The ticket's qr code url
    :type picture_url: str, optional
    :param acquired:
    :param auth0_id: The user's auth0 id number
    :type auth0_id: str, optional
    """

    def __init__(
        self,
        id: str = None,
        pool_id: str = None,
        user_id: str = None,
        value: float = 0.0,
        picture_url: str = "",
        acquired: int = 0,
    ):
        self.id = id if id else str(uuid.uuid4())
        self.pool_id = pool_id = pool_id if pool_id else str(uuid.uuid4())
        self.user_id = user_id = user_id if user_id else str(uuid.uuid4())
        self.value = value
        self.picture_url = picture_url
        self.acquired = acquired

    def __repr__(self) -> str:
        return f'Ticket(id="{self.id}")'

    def save(self):
        """Commits current changes to database"""

        # Execute query
        cur = g.db.cursor()
        cur.execute(
            """
            REPLACE INTO tickets (id, pool_id, user_id, value, picture_url, acquired)
            VALUES (%(id)s, %(pool_id)s, %(user_id)s, %(value)s, %(picture_url)s, 
                        %(acquired)s)
            """,
            self.__dict__,
        )

    def setUser(self, user_id: Users):
        self.user_id = Users.id

    @classmethod
    def find_by_uuid(self, id: str):
        """
        Searches the database for a Ticket by ID

        :param str id: The UUID to search for

        :returns: The corresponding Ticket object
        :rtype: :class:`models.Tickets`
        """
        cur = g.db.cursor(dictionary=True)
        cur.execute(f"SELECT * FROM tickets WHERE id='{id}'")
        data = cur.fetchone()
        return Tickets(**data)
