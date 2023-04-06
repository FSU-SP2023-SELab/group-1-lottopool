import uuid

from flask import g


class Agency:
    """
    The model used to represent lottery agencies

    :param id: The agency's ID
    :type id: str, optional
    :param name: The agency's name
    :type name: str, optional
    :param address: The agency's current address
    :type address: str, optional
    :param phone: The agency's current phone number
    :type phone: str, optional
    """

    def __init__(
        self,
        id: str = None,
        name: str = "",
        address: str = "",
        phone: str = "",
    ):
        self.id = id if id else str(uuid.uuid4())
        self.name = name
        self.address = address
        self.phone = phone

    def __repr__(self) -> str:
        return f'Agency(name="{self.name}")'

    def save(self):
        """Commits current changes to database"""

        # Execute query
        cur = g.db.cursor()
        cur.execute(
            """
            REPLACE INTO agency (id, name, address, phone)
            VALUES (%(id)s, %(name)s, %(address)s, %(phone)s)
            """,
            self.__dict__,
        )

    @classmethod
    def find_by_uuid(self, id: str):
        """
        Searches the database for an Agency by ID

        :param str id: The UUID to search for

        :returns: The corresponding Agency object
        :rtype: :class:`models.Agency`
        """

        # Execute query
        cur = g.db.cursor(dictionary=True)
        cur.execute(f"SELECT * FROM agency WHERE id='{id}'")
        data = cur.fetchone()

        # If no row, None. Else, Agency
        if not data:
            return None
        return Agency(**data)
