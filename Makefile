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

# Docker Hub settings
DOCKER_HUB_USERNAME = eriktortarod
API_IMAGE_NAME = docker-api
AUTH_IMAGE_NAME = docker-auth
FRONTEND_IMAGE_NAME = docker-frontend
VERSION = latest

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

# Reconstruir y reiniciar completamente todos los servicios
rebuild-all:
	@echo "Deteniendo y eliminando todos los contenedores existentes..."
	$(DOCKER_COMPOSE) -f $(DC_FULL) down -v --remove-orphans
	@echo "Limpiando imágenes no utilizadas..."
	$(DOCKER) system prune -f
	@echo "Formateando código en las carpetas auth y api..."
	@cd $(AUTH_DIR) && mvn spring-javaformat:apply
	@cd $(API_DIR) && mvn spring-javaformat:apply
	@echo "Reconstruyendo todos los servicios..."
	$(DOCKER_COMPOSE) -f $(DC_FULL) build --no-cache
	@echo "Iniciando servicios con configuración limpia..."
	$(DOCKER_COMPOSE) -f $(DC_FULL) up -d

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

# Comandos eliminados - Solo se mantienen update-dockerhub y push-all-images

# Push all images to Docker Hub
push-all-images:
	@echo "Iniciando sesión en Docker Hub..."
	$(DOCKER) login
	@echo "Construyendo imágenes..."
	$(DOCKER) build -t $(DOCKER_HUB_USERNAME)/$(API_IMAGE_NAME):$(VERSION) $(API_DIR)
	$(DOCKER) build -t $(DOCKER_HUB_USERNAME)/$(AUTH_IMAGE_NAME):$(VERSION) $(AUTH_DIR)
	$(DOCKER) build -t $(DOCKER_HUB_USERNAME)/$(FRONTEND_IMAGE_NAME):$(VERSION) $(FRONTEND_DIR)
	@echo "Subiendo imágenes a Docker Hub..."
	$(DOCKER) push $(DOCKER_HUB_USERNAME)/$(API_IMAGE_NAME):$(VERSION)
	$(DOCKER) push $(DOCKER_HUB_USERNAME)/$(AUTH_IMAGE_NAME):$(VERSION)
	$(DOCKER) push $(DOCKER_HUB_USERNAME)/$(FRONTEND_IMAGE_NAME):$(VERSION)
	@echo "Todas las imágenes han sido subidas a Docker Hub exitosamente"

# Build and push all images (alias)
update-dockerhub: push-all-images
	@echo "Docker Hub images updated successfully"

# Ayuda
help:
	@echo "Makefile simplificado para el proyecto"
	@echo ""
	@echo "Comandos disponibles:"
	@echo "  make init        - Crea la estructura de directorios inicial"
	@echo "  make run-all     - Inicia todos los servicios"
	@echo "  make stop-all    - Detiene todos los servicios"
	@echo "  make rebuild-all - Detiene, elimina, reconstruye e inicia todos los servicios"
	@echo "  make logs        - Muestra los logs de todos los servicios"
	@echo "  make logs-XXX    - Muestra los logs del servicio XXX"
	@echo "                     (mongodb, mongo-express, api, auth, frontend)"
	@echo "  make shell-XXX   - Abre una terminal en el contenedor XXX"
	@echo "                     (mongodb, mongo-express, api, auth, frontend)"
	@echo ""
	  @echo "Docker Hub commands:"
	@echo "  make push-all-images   - Construir y subir todas las imágenes a Docker Hub"
	@echo "  make update-dockerhub  - Alias para push-all-images"
	@echo ""
	@echo "  make help        - Muestra esta ayuda"
	@echo ""
	@echo "Puertos utilizados:"
	@echo "  Frontend:       http://localhost:3001"
	@echo "  API:            http://localhost:8082"
	@echo "  Auth:           http://localhost:8080"
	@echo "  MongoDB:        puerto 27018"
	@echo "  MongoDB Express: http://localhost:8081 (admin/pass)"