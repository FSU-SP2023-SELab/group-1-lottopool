# Lottery Pooling

## Project Description

*TO BE WRITTEN LATER*

## Distribution of Work

*ALSO TO BE WRITTEN LATER*

## List of Libraries

See `requirements.txt`.

## Setup

- Clone the repo to your location of choice.
- Create a venv using `python3 -m venv .venv`
- Activate the venv using `source .venv/bin/activate`
  - Pro Tip: you can use the `.` shorthand for `source` in some shells
- Install requirements using `pip3 install -r requirements.txt`
- Make sure `.flaskenv` exists and is up to date
  - If it doesn't exist, you'll need to make it then add your secrets to it
- Run using `flask run` or test using `python -m pytest tests/`

## Running

### Development

- Put all env vars in `.flaskenv` then use `flask run`.
  - Flask will load the variables in `.flaskenv` into the session, then launch the generator function in our package's `__init__.py` file

### Production

- *TO BE IMPLEMENTED LATER*

## Testing

- Install the `lotterypool` package in development mode using `pip3 install -e .`
  - This is the purpose of the `setup.py` file
  - `setup.cfg` is used later in our testing suite to specify vars for pytest and coverage.
- You are now ready to test!
- Then use `python -m pytest tests/` to test the code
  - Pytest will look for any files in `tests/` that begin with `test_`, and then run functions in those files that also begin with that same prefix.
- You can also run coverage tests with `coverage run -m pytest`
  - After running, generate a report using `coverage report`
