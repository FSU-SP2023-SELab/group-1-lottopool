import uuid

from flask import g

from .pool import Pool
from .agency import Agency


class Income:
    """
    The model used to represent money we recieve from agencies

    :param id: The ticket's unique ID
    :type id: str, optional
    :param amount: How much we recieved
    :type amount: float
    :param pool_id: The pool this income is for
    :type pool_id: str
    :param agency_id: The agency that paid us
    :type agency_id: str
    """

    def __init__(
        self,
        id: str = None,
        amount: float = None,
        pool_id: str = None,
        agency_id: str = None,
    ):
        self.id = id if id else str(uuid.uuid4())
        self.amount = amount
        self.pool_id = pool_id
        self.agency_id = agency_id

    def __repr__(self) -> str:
        return f'Income(id="{self.id}")'

    def save(self):
        """Commits current changes to database"""

        # Execute query
        cur = g.db.cursor()
        cur.execute(
            """
            REPLACE INTO income (id, amount, pool_id, agency_id)
            VALUES (%(id)s, %(amount)s, %(pool_id)s, %(agency_id)s)
            """,
            self.__dict__,
        )

    def set_pool(self, pool: Pool):
        self.pool_id = pool.id

    def set_agency(self, agency: Agency):
        self.agency_id = agency.id

    @classmethod
    def find_by_uuid(self, id: str):
        """
        Searches the database for an Income record by ID

        :param str id: The UUID to search for

        :returns: The corresponding Income object
        :rtype: :class:`models.Income`
        """

        # Execute query
        cur = g.db.cursor(dictionary=True)
        cur.execute(f"SELECT * FROM income WHERE id='{id}'")
        data = cur.fetchone()

        # If no row, None. Else, Agency
        if not data:
            return None
        return Income(**data)
