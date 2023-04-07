import uuid

from flask import g
from datetime import datetime

from .agency import Agency


class Pool:
    """
    The model used to represent our lottery pools

    :param id: The pool's ID
    :type id: str, optional
    :param name: The pool's name
    :type name: str
    :param agency_id: The ID of the associated agency
    :type agency_id: str
    :param start: The start datetime
    :type start: datetime
    :param end: The end datetime
    :type end: datetime
    :param jackpot: The total jackpot amount
    :type jackpot: double
    :param ppt: Price per ticket
    :type ppt: double
    :param won: Whether the pool won or not
    :type won: int
    """

    def __init__(
        self,
        id: str = None,
        name: str = None,
        agency_id: str = None,
        start: datetime = None,
        end: datetime = None,
        jackpot: float = None,
        ppt: float = None,
        won: bool = None,
    ):
        self.id = id if id else str(uuid.uuid4())
        self.name = name
        self.agency_id = agency_id
        self.start = start
        self.end = end
        self.jackpot = jackpot
        self.ppt = ppt
        self.won = won

    def __repr__(self) -> str:
        return f'Pool(name="{self.name}")'

    def save(self):
        """Commits current changes to database"""

        # Execute query
        cur = g.db.cursor()
        cur.execute(
            """
            REPLACE INTO pools
                (id, name, agency_id, start, end, jackpot, ppt, won)
            VALUES (
                %(id)s, %(name)s, %(agency_id)s, %(start)s, %(end)s,
                %(jackpot)s, %(ppt)s, %(won)s
            )
            """,
            self.__dict__,
        )

    def set_agency(self, agency: Agency):
        self.agency_id = agency.id

    @classmethod
    def find_by_uuid(self, id: str):
        """
        Searches the database for a Pool by ID

        :param str id: The UUID to search for

        :returns: The corresponding Pool object
        :rtype: :class:`models.Pool`
        """

        # Execute query
        cur = g.db.cursor(dictionary=True)
        cur.execute(f"SELECT * FROM pools WHERE id='{id}'")
        data = cur.fetchone()

        # If no row, None. Else, Agency
        if not data:
            return None
        return Pool(**data)
