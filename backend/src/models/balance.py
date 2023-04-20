from flask import g


class UserBalance:
    """
    Model used to represent a user's balance
    """

    def __init__(
        self,
        user_id: str,
        amount: float = 0,
    ):
        self.user_id = user_id
        self.amount = amount

    def __repr__(self) -> str:
        return f'UserBalance(amt="{self.amount}")'

    def to_dict(self):
        return self.__dict__

    def save(self):
        """Commits current changes to database"""

        # Execute query
        cur = g.db.cursor()
        cur.execute(
            """
            REPLACE INTO balances (user_id, amount)
            VALUES (
                %(user_id)s, %(amount)s
            )
            """,
            self.__dict__,
        )

    def add(self, value: float) -> float:
        """
        Adds amount to balance

        :param float value: The amount to increase by

        :returns: The new balance
        :rtype: float
        """
        self.amount += value
        return self.amount

    def sub(self, value: float):
        """
        Subtracts amount from balance, with some error checking

        :param float value: The amount to subtract

        :returns: The new balance
        :rtype: float
        """
        if self.amount - value < 0:
            self.amount = 0.0
        else:
            self.amount -= value
        return self.amount

    @classmethod
    def get_user_balance(cls, user_id: str):
        """
        Gets a User's Balance by their ID
        """

        cur = g.db.cursor(dictionary=True)
        cur.execute("SELECT * FROM balances where user_id=%s", (user_id,))
        data = cur.fetchone()

        if not data:
            return UserBalance(user_id)
        return UserBalance(**data)
