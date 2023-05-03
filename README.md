<img src="/frontend/src/assets/lottopool_logo.svg" width="128"/>

# Lottopool

## Project Description

Lottopool is a lottery pooling system where users can buy lottery tickets through our platform. We'll pool them together and split earnings equally amongst tickets in a pool if at least one of the tickets wins. The platform will be a website where users can login via Auth0 and buy a certain amount of tickets at a list price. We will then manage keeping track of buyers, physically acquiring the tickets, and splitting earnings if there is a winning ticket.

More documentation regarding division of labor, Use Case & Sequence diagrams, Implementation & Testing, etc. can be found in the [paperwork](paperwork/) folder.

## List of Libraries

See `requirements.txt` and `frontend/package.json`.

## Contributing

We're not really accepting external pull requests at the moment, as this is intended to be a group project for Florida State University's Computer Science program. To be honest, the only reason the repo is public instead of private is so we can enforce branch protection rules. Regardless, to see this project's contribution guidelines, please see [CONTRIBUTING.md](./CONTRIBUTING.md).

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
  - As an alternative, run `npm run dev` (or `doppler run -- npm run dev`, if using Doppler) to start the frontend without auto-opening the page in your browser

[In-Depth Frontend Documentation](frontend/README.md)

## Backend Testing

The Python backend is configured to use [Pytest][Pytest].

- `cd backend`
- Install the `lotterypool` package in development mode using `pip3 install -e .`
  - This is the purpose of the `setup.py` file
  - `setup.cfg` is used later in our testing suite to specify vars for pytest and coverage.
- You are now ready to test!
- Then use `python -m pytest tests/` to test the code
  - Pytest will look for any files in `tests/` that begin with `test_`, and then run functions in those files that also begin with that same prefix.
- You can also run coverage tests with `coverage run -m pytest`
  - After running, generate a report using `coverage report`

## Frontend Testing

Frontend testing is configured via [solidjs-testing-library][solidjs-testing-library] and [Vitest][Vitest].

- `cd frontend`
- Install dependencies with `npm install`
- Run tests with `npm test`
  - Vitest looks for any files ending in `*.test.tsx` and runs them
- Additionally a coverage report is given with `npm run coverage`
  - Results are displayed in the command line, as well as a simple website is created to view in the `coverage/` folder

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
[solidjs-testing-library]: https://github.com/solidjs/solid-testing-library/
[Vitest]: https://vitest.dev/
[Pytest]: https://docs.pytest.org/en/7.2.x/
