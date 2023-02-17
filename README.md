# Lottery Pooling

## Project Description

*TO BE WRITTEN LATER*

## Distribution of Work

*ALSO TO BE WRITTEN LATER*

## List of Libraries

See `requirements.txt` and `frontend/package.json`.

## Contributing

To see this project's contribution guidelines, please see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Setup

Start by cloning the repo to your location of choice, and then following the steps below for each of the sub-projects.

Make sure your secrets and other env vars are also being loaded. You'll have to handle that yourself. Our team uses [Doppler][doppler] to inject secrets for us.

### Backend

- Create a venv using `python3 -m venv .venv`
- Activate the venv using `source .venv/bin/activate`
  - Pro Tip: you can use the `.` shorthand for `source` in some shells
- Install requirements using `pip3 install -r requirements.txt`
- Run using `flask run` (or `doppler run -- flask run`, if using Doppler)

### Frontend

- Change directories into `/frontend`
- Install dependencies using `npm install`
- Run using `npm start` (or `doppler run -- npm start`, if using Doppler)

## Testing

Testing is a work in progress. However, the Python backend is configured to use Pytest.

- Install the `lotterypool` package in development mode using `pip3 install -e .`
  - This is the purpose of the `setup.py` file
  - `setup.cfg` is used later in our testing suite to specify vars for pytest and coverage.
- You are now ready to test!
- Then use `python -m pytest tests/` to test the code
  - Pytest will look for any files in `tests/` that begin with `test_`, and then run functions in those files that also begin with that same prefix.
- You can also run coverage tests with `coverage run -m pytest`
  - After running, generate a report using `coverage report`

## Deploying

This repository has support for Docker. It compiles the frontend and backend into their own images which can be networked together either manually, or by using Docker Compose/Kubernetes.

To quickly get started, manually loading your env vars then running `docker compose up -d` will do the following:

- Builds frontend, tagging the image as `lp-frontend:dev`, then exposes the frontend's web server on port `3000`
- Builds backend, tagging the image as `lp-backend:dev`, then starts the API internally
- Starts a MariaDB server with persistent storage

Docker compose handles the networking for you, and visiting `http://localhost:3000` should take you to the project!

## Debug

Multiple debug configurations have been setup for debugging in VSCode. These are useful when stepping through breakpoints in code and stopping on errors for easier debugging. The Chrome debug option is specifically setup to attach to VSCode's debugging process in order to have breakpoints hit in the VSCode editor itself. If no debug browser is used, breakpoints can be used inside a browser inspect panel instead.

### Compound Debug Configurations

- Launch Frontend + Backend
  - This debug config will launch the Solid frontend and the Flask backend
- Launch Frontend + Backend + Chrome Debug
  - This will launch the above config, but with an additional Chrome debug browser instance launched

[doppler]: https://www.doppler.com/
