# Contributing Guidelines

Hey! Thanks for wanting to help out with this project! This repository is open
source and open for contributions from anyone interested! :)

## Commits

How do we remember history?

> By writing it down clearly and carefully.

One of the most sacred resources we have in our history is commit messages.
Without well-written and clear commit messages, our history looses its
context and meaning, and thus its usefulness, quite quickly.  To write good
commit messages:

- Write in **present tense, imperative mood** (like commands)
  - `Implement faster tree search algorithm in hot code`
  - `Switch regular expression implementation to FST`
  - `Fix typo in documentation for public macros, add examples`
- Keep the subject line terse and add an expanded body if necessary
- Use `*` or `-` as bullet points when needed

## Forking

To start contributing, fork this repository onto your own GitHub profile by
pressing the fork button at the top-right.  This will create a copy of this
repository that is linked back, so you have your own sandbox to play around
in and experiment with!

Add this fork as a remote under the name `origin` and set it as the upstream
of all of your feature branches.  Add the [main repository][main-repo] as a
remote named `upstream` and set it as the upstream for the `main` and
`develop` branch.  In order for forking to work well, _do not sync main
or develop with your fork_, and only **pull** changes from the upstream.

This establishes a flow of changes like so:  You create your changes on
your computer, they are pushed to your fork, from your fork they are merged
into the mainline repository, and from the mainline repository they come
back into your computer.  Maintaining this flow will make using `git` and
GitHub in a forking workflow like ours much less painful.

## Branching

| Branch        | Description | Merge into | Branch from | Pass CI |
|---------------|-------------|------------|-------------|---------|
| `main`        | latest release version | N/A | N/A | Always |
| `develop`     | latest development version | `main` | `main` | Ideally always |
| `f/[feature]` | feature or change set in development | `develop` | `develop` | When finished |
| `b/[bug #]`   | fix for broken code or bad behaviour in production | `develop` & `main` | `main` | When finished |

### Main

The main branch represents the most current _release_ version of the
site at all times.  Specifically, this means:

- Should always work to the best of our ability
- Every commit corresponds to a particular release [version #][semver]
- Never merges _into_ any other branch
- Triggers automatic deployment and other similar tasks
- All changes are destined to end up here eventually, unless they are rejected
- **Do not push to main directly**

### Develop

The develop branch represents the most current _development_ version of the
site at all times.  Specifically, this means:

- Should always work to the best of our ability
- May introduce breaking changes without changing [version][semver] numbers
- Only merges _into_ `main`
- Since it represents the latest development changes, all features start here
- **Do not push to develop directly**

### Feature Branches

Feature branches are the most common type of branches, where most of this repository's code writing actually happens.

Feature branch pull requests must meet the following requirements before they are
merged:
- Must pass tests
- Must be reviewed by at least one other person

Create feature branches on your local machine after getting the latest
development changes using `git pull upstream develop`. Give them a descriptive
name prefixed by a `f/`.  For example: `f/faster-regex` is a valid name. The
remote tracking branch for your feature branches should be on your fork, and
you push changes with `git push origin f/[feature]`.

When you are ready, create a pull request against the main repo's `develop`
branch at which point we will review and accept or reject your changes. Once the
branch is no longer necessary, you may delete it off your fork and off your local
computer.

### Bug Branches

Bug branches differ from feature branches, because they are one of the few types
of branches that are allowed to make a pull request against `main`. These bug fix
branches should be as small as possible, and pertain solely to fixing a bug already
reported on GitHub Issues. Larger bugs that may require refactors should be
done under a feature branch.

Bug branch pull requests must meet the following requirements before they are
merged:
- Must pass tests
- Must be reviewed by at least two other people

Create bug branches on your local machine after getting the latest
main changes using `git pull upstream main`. The branch name should
contain the prefix `b/`, the GitHub issue number associated with this particular
bug, and a hyphenated short name as well. For example: `b/19-fix-typo` is a valid
name. The remote tracking branch for your feature branches should be on your fork,
and you push changes with `git push origin b/[id-and-name]`.

When you are ready, create a pull request against the main repo's `develop`
branch at which point we will review and accept or reject your changes. Once the
branch is no longer necessary, you may delete it off your fork and off your local
computer.

-----

[main-repo]: https://github.com/fsu-cop4090ls/lotterypool
[semver]: https://semver.org