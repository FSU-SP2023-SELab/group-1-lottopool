from flask import g


class Agency:
    """The model used to represent lottery agencies"""

    def __init__(self, id: str, name: str, address: str, phone: str):
        self.id = id
        self.name = name
        self.address = address
        self.phone = phone

    def __repr__(self) -> str:
        return f'Agency(name="{self.name}")'

    @classmethod
    def find_by_uuid(self, id: str):
        cur = g.db.cursor(dictionary=True)
        cur.execute(f"SELECT * FROM agency WHERE id='{id}'")
        data = cur.fetchone()
        return Agency(**data)
