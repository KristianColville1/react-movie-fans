
# MovieFans

Developer: Kristian Colville

put responsive image here

Starting point: put base project here

## Table of Contents

* [Project Goals](#project-goals)
  * [Personal Goals](#personal-goals)
* [User Experience (UX)](#user-experience-ux)
  * [Target Audience](#target-audience)
* [Design](#design)
  * [Color Scheme](#color-scheme)
  * [Typography](#typography)
  * [Layout](#layout)
  * [Icons](#icons)
  * [Styling with Tailwind and MUI](#styling-with-tailwind-and-mui)
* [Technologies &amp; Tools](#technologies--tools)
  * [Tech stack](#tech-stack)
  * [Data &amp; services](#data--services)
  * [Testing &amp; tooling](#testing--tooling)
  * [Code quality &amp; formatting](#code-quality--formatting)
  * [Front end &amp; docs](#front-end--docs)
* [Architecture](#architecture)
  * [Component Structure](#component-structure)
  * [Routing](#routing)
  * [State Management](#state-management)
* [Features](#features)
  * [Release 1](#release-1)
  * [Release 2](#release-2)
  * [Release 3](#release-3)
  * [Release 4](#release-4)
  * [Future Features](#future-features)
* [Data](#data)
  * [TMDB](#tmdb)
  * [Supabase Schema](#supabase-schema)
  * [Row Level Security](#row-level-security)
* [Testing](#testing)
  * [Actual Testing](#actual-testing)
  * [End-to-end Tests](#end-to-end-tests)
  * [Manual Testing](#manual-testing)
  * [Accessibility](#accessibility)
* [Bugs](#bugs)
  * [Bug Details](#bug-details)
  * [Known Issues](#known-issues)
* [Releases](#releases)
  * [Overview](#overview)
  * [Git Workflow](#git-workflow)
  * [Development Strategy](#development-strategy)
    * [Git Scope &amp; Branching](#git-scope--branching)
  * [Release Results](#release-results)
    * [Release 1](#release-1-1)
    * [Release 2](#release-2-1)
    * [Release 3](#release-3-1)
    * [Release 4](#release-4-1)
* [Development &amp; Deployment](#development--deployment)
  * [Version Control](#version-control)
  * [Cloning the Repository](#cloning-the-repository)
  * [Environment Variables](#environment-variables)
  * [Running Locally](#running-locally)
  * [Container &amp; CI](#container--ci)
  * [Bunny Magic Containers](#bunny-magic-containers)
  * [Usage](#usage)
* [Credits](#credits)

---

## Project Goals

MovieFans is a React single page application built on The Movie Database (TMDB) API. It started from the Movies app developed in the labs and was extended in stages, with each release adding features from the next band of the grading spectrum. The application will:

- **Deliver a responsive, branded UI** that works on phones, tablets and desktops, using Tailwind CSS for styling and MUI for structure, with a custom colour palette, an animated mobile navigation, a fixed width container and a card based movie grid.
- **Add a second data entity** in the form of Actors, with its own list and detail views, so the app is not limited to movies alone and can support browsing by the people involved rather than only by title.
- **Provide extensive data hyperlinking** through a full navigation loop, where a movie leads to its cast, an actor leads to their biography and filmography, and a film in that filmography leads back to a movie detail page.
- **Support multi criteria search and filtering** against the whole TMDB catalogue rather than a single page of results, pushing genre, release year range, minimum rating and sort order into the TMDB discover endpoint as query parameters, with pagination on every listing page.
- **Let users build personal collections** including favourites, favourite actors, a watch list and their own fantasy movies, each with its own page, empty state and toast confirmation.
- **Restrict parts of the app behind authentication** using Supabase email and password sign in, a route guard that separates public from private routes, and premium functionality that is only offered to signed in users.
- **Persist user data on a backend** in Supabase Postgres, with a declarative schema kept in the repository, generated migrations applied through the Supabase CLI, and row level security so a user can only ever read and write their own rows.
- **Prioritise maintainability and code quality** with TypeScript in strict mode, an atomic design component structure, path aliases in place of relative traversal, ESLint, JSDoc on every component and API function, and a Storybook entry for each presentational component.
- **Support testing, containerisation and deployment** through an end to end Playwright suite that drives the running app, a Docker image served by nginx, and a GitHub Actions workflow that builds, publishes to GHCR and rolls the deployed container.

By working through the grading bands in order rather than building everything at once, the project aims to deliver a movie discovery app with a real backend, a clear component structure and a deployment pipeline, while keeping each stage documented and tagged.

### Personal Goals

As the developer, my goals for this project include:

- **Extending the lab application incrementally** through the Good, Very Good, Excellent and Outstanding bands, tagging the repository at the end of each one, rather than rewriting the app from scratch and losing the structure the labs established.
- **Learning react-query properly** and understanding the split between server state, which is fetched and cached, and client state, which lives in context, instead of holding everything in component state.
- **Getting Tailwind and MUI to work together** rather than choosing one over the other, by understanding CSS layers well enough that utility classes win without needing overrides on every component.
- **Treating the database as code** by keeping the schema in the repository, generating migrations from it with the Supabase CLI, and never making a change through the dashboard that is not reflected in a file.
- **Understanding row level security as the actual security boundary**, since the Supabase key is public by design, and verifying every table with two separate accounts rather than assuming a policy works.
- **Building a test suite that exercises the real application** end to end in a browser, including sign up, sign in, private route redirection, and the creation and deletion of a fantasy movie.
- **Applying skills from other modules on the course**, particularly containers, environment configuration, continuous integration and deployment, to take the application from a local dev server to a live URL.
- **Documenting the work honestly** in this README, including the bugs that were found and fixed, the ones still open, and the features that were deliberately left out.

These goals guide an incremental, front end focused approach that meets the assignment brief while leaving the codebase typed, tested, deployable and understandable to someone reading it for the first time.

---

## User Experience (UX)

MovieFans is built for people who want to browse films, follow the people who make them, and keep track of what they have enjoyed or intend to watch. The experience centres on a searchable catalogue of movies with detail pages that link outwards to cast, reviews and related pages, and on a set of personal lists that persist between visits once a user signs in. Anyone can browse and search without an account, and signing in adds the collections, the sorting controls and the fantasy movie builder on top of what is already there.

### Target Audience

MovieFans is aimed at anyone who watches films and wants a better way to find and organise them. The main audiences include:

- **Casual browsers:** People who want to see what is popular or coming soon, open a film, watch the trailer and read the overview, without creating an account first.
- **Film fans who curate:** Users who want to keep a record of what they love and a separate list of what they still mean to watch, and who expect those lists to survive closing the tab.
- **People who follow actors rather than titles:** Viewers who start from a performer, read their biography, look through their filmography and use it to find their next film, and who want to save the actors they follow.
- **Users searching with specific criteria:** People who know roughly what they want, a certain genre, a release window or a minimum rating, and want to narrow the whole catalogue down to it rather than scroll.
- **Aspiring creators:** Users who enjoy the idea of casting their own film, and who use the fantasy movie feature to record a title, overview, genres, release date, runtime and production companies of their own.
- **Users on the go:** People browsing from a phone, who need the navigation to collapse into a menu, the cards to reflow to a single column and the touch targets to stay usable on a small screen.

The app is designed so that the public experience is complete and worth using on its own, while an account adds persistence and personalisation rather than unlocking something that should have been free.

---

## Design

### Color Scheme

### Typography

### Layout

### Icons

### Styling with Tailwind and MUI

---

## Technologies & Tools

### Tech stack

### Data & services

### Testing & tooling

### Code quality & formatting

### Front end & docs

---

## Architecture

### Component Structure

### Routing

### State Management

---

## Features

### Release 1

### Release 2

### Release 3

### Release 4

### Future Features

---

## Data

### TMDB

### Supabase Schema

### Row Level Security

---

## Testing

### Actual Testing

### End-to-end Tests

### Manual Testing

### Accessibility

---

## Bugs

### Bug Details

### Known Issues

---

## Releases

### Overview

### Git Workflow

### Development Strategy

#### Git Scope & Branching

### Release Results

#### Release 1

#### Release 2

#### Release 3

#### Release 4

---

## Development & Deployment

### Version Control

### Cloning the Repository

### Environment Variables

### Running Locally

### Container & CI

### Bunny Magic Containers

### Usage

---

## Credits
