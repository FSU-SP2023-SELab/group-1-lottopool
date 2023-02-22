from src.blueprints.messages.message import Message


def get_public_message():
    return Message("No access required.")


def get_protected_message():
    return Message("The API successfully validated your access token.")


def get_admin_message():
    return Message("The API successfully recognized you as an admin.")
