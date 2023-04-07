import uuid

from flask import g


class Payout:
    """
    The model used to represent money we recieve from agencies

    :param id: The ticket's unique ID
    :type id: str, optional
    :param user_id: The user this is assoiated with
    :type user_id: str
    :param pool_id: The pool this is associated with
    :type pool_id: str
    :param amount: The amount we paid out
    :type amount: double
    """

    def __init__(
        self,
        id: str = None,
        user_id: str = None,
        pool_id: str = None,
        amount: float = None,
    ):
        self.id = id if id else str(uuid.uuid4())
        self.user_id = user_id
        self.pool_id = pool_id
        self.amount = amount

    def __repr__(self) -> str:
        return f'Payout(id="{self.id}")'

    def save(self):
        """Commits current changes to database"""

        # Execute query
        cur = g.db.cursor()
        cur.execute(
            """
            REPLACE INTO payouts (id, user_id, pool_id, amount)
            VALUES (%(id)s, %(user_id)s, %(pool_id)s, %(amount)s)
            """,
            self.__dict__,
        )

    @classmethod
    def find_by_uuid(self, id: str):
        """
        Searches the database for an Payout record by ID

        :param str id: The UUID to search for

        :returns: The corresponding Payout object
        :rtype: :class:`models.Payout`
        """

        # Execute query
        cur = g.db.cursor(dictionary=True)
        cur.execute(f"SELECT * FROM payouts WHERE id='{id}'")
        data = cur.fetchone()

        # If no row, None. Else, Agency
        if not data:
            return None
        return Payout(**data)
