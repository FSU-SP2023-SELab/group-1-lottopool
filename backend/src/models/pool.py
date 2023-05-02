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
        won: int = None,
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

    def to_dict(self):
        return self.__dict__

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

    def set_won_and_save(self, won: int):
        """uh?"""

        # Set value
        self.won = won

        # SQL
        cur = g.db.cursor(dictionary=True)
        cur.execute("UPDATE pools SET won=%s WHERE id=%s", (self.won, self.id))

    def set_agency(self, agency: Agency):
        self.agency_id = agency.id

    def get_ticket_count(self, unique: bool = False):
        """
        :param bool unique: Return count of unique individuals or total tickets

        :returns: Gets count of tickets in pool
        :rtype: int
        """

        # Execute query
        cur = g.db.cursor(dictionary=True)
        if unique:
            cur.execute(
                "SELECT COUNT(DISTINCT user_id) AS count FROM tickets WHERE pool_id=%s AND paid_for=1",
                (self.id,),
            )
        else:
            cur.execute(
                "SELECT COUNT(id) AS count FROM tickets WHERE pool_id=%s AND paid_for=1",
                (self.id,),
            )

        # Return data
        entry = cur.fetchone()
        if not entry:
            return 0
        return entry["count"]

    def get_breakdown(self) -> "dict[str, int]":
        """
        Gets a breakdown of how many tickets each person bought
        """

        # Execure query
        cur = g.db.cursor(dictionary=True)
        q = "SELECT user_id, COUNT(id) AS cnt FROM tickets WHERE pool_id=%s AND paid_for=1 GROUP BY user_id"
        cur.execute(q, (self.id,))

        # Get value and return
        data = cur.fetchall()
        if len(data) == 0:
            return {}
        return {d["user_id"]: d["cnt"] for d in data}

    @classmethod
    def find_by_uuid(cls, id: str):
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

    @classmethod
    def find_latest(cls):
        """
        Searches the database for a Pool by most recent? start time

        :returns: The corresponding Pool object
        :rtype: :class:`models.Pool`
        """

        # Execute query
        cur = g.db.cursor(dictionary=True)
        cur.execute("SELECT * FROM pools ORDER BY start DESC LIMIT 1")
        data = cur.fetchone()

        # If no row, None. Else, Pool
        if not data:
            return None
        return Pool(**data)

    @classmethod
    def get_current_pools(cls):
        """
        Searches the database for all current pools

        :returns: The corresponding Pool object
        :rtype: :class:`models.Pool`
        """

        # Execute query
        cur = g.db.cursor(dictionary=True)
        cur.execute("SELECT * FROM pools WHERE end > CURDATE()")
        data = cur.fetchall()

        # Return either an empty list or list of Pools
        return [Pool(**d) for d in data]

    @classmethod
    def get_user_pools(cls, user_id: str):
        """
        Searches the database all pools a user is/was enrolled in

        :returns: The corresponding Pool object
        :rtype: :class:`models.Pool`
        """

        # Execute query
        cur = g.db.cursor(dictionary=True)
        cur.execute(
            """
            SELECT * FROM pools WHERE id IN (
                SELECT DISTINCT pool_id FROM tickets
                WHERE user_id=%s
            )
            """,
            (user_id,),
        )
        data = cur.fetchall()

        # If no row, None. Else, list of Pools
        return [Pool(**d) for d in data]
