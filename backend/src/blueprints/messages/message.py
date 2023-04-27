import json
from collections import UserDict


class Message(UserDict):
    message: str

    def __init__(self, message):
        self.message = message

    def __setitem__(self, key, value):
        self.__dict__[key] = value

    def to_dict(self):
        return self.__dict__


class ErrorMessage(UserDict):
    error: str
    error_description: str

    def __init__(self, error, error_description):
        self.error = error
        self.error_description = error_description

    def __setitem__(self, key, value):
        self.__dict__[key] = value

    def to_dict(self):
        return self.__dict__
