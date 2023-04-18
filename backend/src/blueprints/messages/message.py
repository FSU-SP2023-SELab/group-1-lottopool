class Message:
    message: str

    def __init__(self, message):
        self.message = message


class ErrorMessage:
    error: str
    error_description: str

    def __init__(self, error, error_description):
        self.error = error
        self.error_description = error_description
