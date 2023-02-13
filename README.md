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


## Debug

Multiple debug configurations have been setup for debugging in VSCode. These are useful when stepping through breakpoints in code and stopping on errors for easier debugging. The Chrome debug option is specifically setup to attach to VSCode's debugging process in order to have breakpoints hit in the VSCode editor itself. If no debug browser is used, breakpoints can be used inside a browser inspect panel instead.

### Compound Debug Configurations

- Launch Frontend + Backend
  - This debug config will launch the Solid frontend and the Flask backend
- Launch Frontend + Backend + Chrome Debug
  - This will launch the above config, but with an additional Chrome debug browser instance launched
