import uuid

from flask import g

from .pool import Pool


class Ticket:
    """
    The model used to represent tickets

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
        picture_url: str = None,
        numbers: str = None,
        acquired: int = 0,
        paid_for: int = 0,
    ):
        self.id = id if id else str(uuid.uuid4())
        self.pool_id = pool_id
        self.user_id = user_id
        self.picture_url = picture_url
        self.numbers = numbers
        self.acquired = acquired
        self.paid_for = paid_for

    def __repr__(self) -> str:
        return f'Ticket(id="{self.id}")'

    def to_dict(self):
        return self.__dict__

    def save(self):
        """Commits current changes to database"""

        # Execute query
        cur = g.db.cursor()
        cur.execute(
            """
            REPLACE INTO tickets (id, pool_id, user_id, picture_url, 
                numbers, acquired, paid_for)
            VALUES (
                %(id)s, %(pool_id)s, %(user_id)s, %(picture_url)s, 
                %(numbers)s, %(acquired)s, %(paid_for)s
            )
            """,
            self.__dict__,
        )

    def set_user(self, user_id: str):
        self.user_id = user_id

    def set_pool(self, pool: Pool):
        self.pool_id = pool.id

    @classmethod
    def find_by_uuid(cls, id: str):
        """
        Searches the database for a Ticket by ID

        :param str id: The UUID to search for

        :returns: The corresponding Ticket object
        :rtype: :class:`models.Tickets`
        """

        cur = g.db.cursor(dictionary=True)
        cur.execute(f"SELECT * FROM tickets WHERE id='{id}'")
        data = cur.fetchone()
        return Ticket(**data)

    @classmethod
    def find_by_user(cls, user_id: str):
        """
        Searches the database for all of a user's Tickets

        :param str id: The UUID to search for

        :returns: The corresponding Ticket object
        :rtype: :class:`models.Tickets`
        """

        cur = g.db.cursor(dictionary=True)
        cur.execute("SELECT * FROM tickets WHERE user_id=%s", (user_id,))
        data = cur.fetchall()
        return [Ticket(**d) for d in data]

    @classmethod
    def find_by_pool(cls, pool: Pool, user_id: str = ""):
        """
        Searches the database for all tickets in pool

        :param Pool pool: The pool to search against

        :returns: List of corresponding Ticket objects
        :rtype: :class:`models.Tickets`
        """

        cur = g.db.cursor(dictionary=True)
        if user_id != "":
            cur.execute(
                "SELECT * FROM tickets WHERE pool_id=%s AND user_id = %s",
                (pool.id, user_id),
            )
        else:
            cur.execute("SELECT * FROM tickets WHERE pool_id=%s", (pool.id,))
        data = cur.fetchall()
        return [Ticket(**data) for data in data]
