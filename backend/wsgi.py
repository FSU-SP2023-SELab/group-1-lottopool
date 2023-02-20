# This file is explicitly used by gunicorn
from src import create_app

app = create_app()
