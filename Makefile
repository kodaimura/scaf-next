ENV ?= dev
WEB_PORT ?= 3000
SMOKE_BASE_URL ?= http://127.0.0.1:$(WEB_PORT)
DOCKER_COMPOSE = docker compose
DOCKER_COMPOSE_FILE = $(if $(filter prod,$(ENV)),-f docker-compose.prod.yml,-f docker-compose.yml)
DOCKER_COMPOSE_CMD = $(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE)
RUN_WEB = $(DOCKER_COMPOSE_CMD) run --rm web

.PHONY: up build build_no_cache down down_volumes stop in log logs ps reup restart install lint typecheck check format format_check smoke audit audit_all outdated help

up:
	$(DOCKER_COMPOSE_CMD) up -d

build:
	$(DOCKER_COMPOSE_CMD) build

build_no_cache:
	$(DOCKER_COMPOSE_CMD) build --no-cache

down:
	$(DOCKER_COMPOSE_CMD) down

down_volumes:
	$(DOCKER_COMPOSE_CMD) down -v

stop:
	$(DOCKER_COMPOSE_CMD) stop

in:
	$(DOCKER_COMPOSE_CMD) exec web sh

log:
	$(DOCKER_COMPOSE_CMD) logs -f web

logs: log

ps:
	$(DOCKER_COMPOSE_CMD) ps

reup: down up

restart:
	$(DOCKER_COMPOSE_CMD) restart web

install:
	$(RUN_WEB) npm install

lint:
	$(RUN_WEB) npm run lint

typecheck:
	$(RUN_WEB) npm run typecheck

check:
	$(RUN_WEB) npm run check

format:
	$(RUN_WEB) npm run format

format_check:
	$(RUN_WEB) npm run format:check

smoke:
	sh scripts/smoke.sh "$(SMOKE_BASE_URL)"

audit:
	$(RUN_WEB) npm audit --omit=dev

audit_all:
	$(RUN_WEB) npm audit

outdated:
	$(RUN_WEB) npm outdated

help:
	@echo "Usage: make [target] [ENV=dev|prod]"
	@echo ""
	@echo "Targets:"
	@echo "  up        Start containers"
	@echo "  build     Build containers"
	@echo "  build_no_cache Build containers without cache"
	@echo "  down      Stop and remove containers and networks"
	@echo "  down_volumes Stop and remove containers, networks, and volumes"
	@echo "  stop      Stop containers"
	@echo "  in        Access web container via sh"
	@echo "  log       Show web container logs"
	@echo "  ps        Show container status"
	@echo "  reup      Restart the environment"
	@echo "  restart   Restart web container"
	@echo "  install   Install npm dependencies"
	@echo "  lint      Run ESLint"
	@echo "  typecheck Run TypeScript check"
	@echo "  check     Run lint and production build"
	@echo "  format    Format files with Prettier"
	@echo "  smoke     Check key routes"
	@echo "  audit     Audit production dependencies"
	@echo "  audit_all Audit all dependencies"
	@echo "  outdated  Check outdated dependencies"
