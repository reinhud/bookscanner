#!/bin/bash


# Pull the latest changes from the repository
git pull origin main

# Bring down existing containers
docker-compose -f docker-compose.prod.yaml down

# Bring up the containers in detached mode
docker-compose -f docker-compose.prod.yaml up -d
