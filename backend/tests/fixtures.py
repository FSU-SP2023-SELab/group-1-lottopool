import os
import pytest
from typing import Optional
from mysql import connector

# The first few lines here are not stored within a class/function
# because we want it to be run upon first import into the project. -A

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASSWORD")
DB_NAME = "lottopool"


def init_db_conn(active_db: Optional[str] = DB_NAME):
    """
    Returns new cursor connected to MySQL database
    - Should be stored in global context scope (i.e. flask.g) so
      each session gets its own dedicated DB conn
    - If calling manually, use w/ a 'with' statement
    """

    # Define kwargs
    db_config = {
        "host": DB_HOST,
        "user": DB_USER,
        "password": DB_PASS,
        "database": active_db,
    }

    # Return connector
    return connector.connect(**db_config)


def _run_schema(cur, file, working_dir="schema"):
    """
    Executes a schema file from a working directory, given a MySQL cursor
    """

    # Check file exists and is a SQL file
    f_path = os.path.join(working_dir, file)
    if not os.path.exists(f_path):
        raise Exception("ERROR: Requested schema does not exist")
    elif not f_path.endswith(".sql"):
        raise Exception("ERROR: Requested schema is not of type .sql")

    # Open file and read in
    with open(f_path, "r") as file:
        text = file.read()

        # Attempt to execute schema
        try:
            cur.execute(text, multi=True)

        # If execution failed, log error
        except connector.Error as e:
            print(f"ERROR: {e}")


@pytest.fixture
def db_fixture():
    """
    Main fixture to handle database init for testing
    NOTE: Requires the DB env vars set properly!
    """

    # Get cursor with server context, so we can query tables
    with init_db_conn(active_db=None) as db:
        cur = db.cursor()

        # Define schema, should reset database
        _run_schema(cur, "schema.sql")

        # Add test data
        _run_schema(cur, "sample_data.sql")
