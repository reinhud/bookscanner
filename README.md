# Bookscanner

It is a basic application that allows you to search for books.


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This is a uni project for the class of "System and Software Engineering".
The project features a frontend with Next.js and a FastAPI backend.
CI/CD workflows have been set up for seamless deployment on an example linode server.
For development, DevContainers are utilized.


## Features

Outline the main features and functionalities of the project.

- Pages: Intro, Login, SignUp, Home, Recommenaations, Search History, Account 
- Authentification: via OAuth2 with JWT Tokens as cookies
- Booksearch: via Google and Open Library
- CI/CD: Automatic deployment
- Devcontainer&Docker: fully dockerized, develoment in container

## Installation

Provide instructions for installing and setting up the project locally. Include any dependencies and prerequisites.

```bash
# Example installation commands
$ git clone gh repo clone reinhud/bookscanner
```

Deploying for production:
- docker-compose -f docker-compose.prod.yaml -p bookscanner up --build
- docker-compose -f docker-compose.prod.yaml -p bookscanner up 


