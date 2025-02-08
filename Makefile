DOCKER_COMPOSE = docker compose
ENV ?= dev
DOCKER_COMPOSE_FILE = $(if $(filter prod,$(ENV)),-f docker-compose.prod.yml,)
DOCKER_COMPOSE_CMD = $(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE)

.PHONY: up build down stop in log ps help

up:
	$(DOCKER_COMPOSE_CMD) up -d

build:
	$(DOCKER_COMPOSE_CMD) build --no-cache

down:
	$(DOCKER_COMPOSE_CMD) down

stop:
	$(DOCKER_COMPOSE_CMD) stop

inback:
	$(DOCKER_COMPOSE_CMD) exec backend bash

infront:
	$(DOCKER_COMPOSE_CMD) exec frontend bash

logback:
	$(DOCKER_COMPOSE_CMD) logs -f backend

logfront:
	$(DOCKER_COMPOSE_CMD) logs -f frontend

ps:
	$(DOCKER_COMPOSE_CMD) ps

help:
	@echo "Usage: make [target] [ENV=dev|prod]"
	@echo ""
	@echo "Targets:"
	@echo "  up        Start containers in the specified environment (default: dev)"
	@echo "  build     Build containers without cache"
	@echo "  down      Stop and remove containers, networks, and volumes"
	@echo "  stop      Stop containers"
	@echo "  inback    Access app container via bash (backend)"
	@echo "  infront   Access app container via bash (frontend)"
	@echo "  logback   Show logs for the app container (backend)"
	@echo "  logfront  Show logs for the app container (frontend)"
	@echo "  ps        Show status for the app container"