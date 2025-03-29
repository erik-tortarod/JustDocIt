# Makefile simplificado para proyecto con MongoDB, Spring Boot y React

# Variables de comandos
DOCKER_COMPOSE = sudo docker compose
DOCKER = sudo docker

# Carpeta Docker Compose
DOCKER_DIR = ./docker

# Archivo docker-compose principal
DC_FULL = $(DOCKER_DIR)/docker-compose.yaml

# Variables de directorios
API_DIR = ./api
AUTH_DIR = ./auth
FRONTEND_DIR = ./frontend

# Crear estructura de directorios
init:
	@mkdir -p $(DOCKER_DIR)
	@mkdir -p $(API_DIR)
	@mkdir -p $(AUTH_DIR)
	@mkdir -p $(FRONTEND_DIR)
	@echo "Estructura de directorios creada correctamente."

# Iniciar todos los servicios
run-all:
	$(DOCKER_COMPOSE) -f $(DC_FULL) up -d

# Detener todos los servicios
stop-all:
	$(DOCKER_COMPOSE) -f $(DC_FULL) down

# Ver logs de un servicio específico
logs-mongodb:
	$(DOCKER_COMPOSE) -f $(DC_FULL) logs -f mongodb

logs-mongo-express:
	$(DOCKER_COMPOSE) -f $(DC_FULL) logs -f mongo-express

logs-api:
	$(DOCKER_COMPOSE) -f $(DC_FULL) logs -f api

logs-auth:
	$(DOCKER_COMPOSE) -f $(DC_FULL) logs -f auth

logs-frontend:
	$(DOCKER_COMPOSE) -f $(DC_FULL) logs -f frontend

# Ver todos los logs
logs:
	$(DOCKER_COMPOSE) -f $(DC_FULL) logs -f

# Entrar a un contenedor
shell-mongodb:
	$(DOCKER) exec -it mongodb bash || $(DOCKER) exec -it mongodb sh

shell-mongo-express:
	$(DOCKER) exec -it mongo-express bash || $(DOCKER) exec -it mongo-express sh

shell-api:
	$(DOCKER) exec -it api bash || $(DOCKER) exec -it api sh

shell-auth:
	$(DOCKER) exec -it auth bash || $(DOCKER) exec -it auth sh

shell-frontend:
	$(DOCKER) exec -it frontend bash || $(DOCKER) exec -it frontend sh

# Ayuda
help:
	@echo "Makefile simplificado para el proyecto"
	@echo ""
	@echo "Comandos disponibles:"
	@echo "  make init        - Crea la estructura de directorios inicial"
	@echo "  make run-all     - Inicia todos los servicios"
	@echo "  make stop-all    - Detiene todos los servicios"
	@echo "  make logs        - Muestra los logs de todos los servicios"
	@echo "  make logs-XXX    - Muestra los logs del servicio XXX"
	@echo "                     (mongodb, mongo-express, api, auth, frontend)"
	@echo "  make shell-XXX   - Abre una terminal en el contenedor XXX"
	@echo "                     (mongodb, mongo-express, api, auth, frontend)"
	@echo "  make help        - Muestra esta ayuda"
	@echo ""
	@echo "Puertos utilizados:"
	@echo "  Frontend:       http://localhost:5173"
	@echo "  API:            http://localhost:8082"
	@echo "  Auth:           http://localhost:8080"
	@echo "  MongoDB:        puerto 27018"
	@echo "  MongoDB Express: http://localhost:8081 (admin/pass)"