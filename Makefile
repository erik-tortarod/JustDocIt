# Variables globales
DOCKER_USERNAME ?= eriktortarod
PROJECT_NAME ?= justdocit
SERVICES := frontend auth api

.PHONY: start-all stop-all rebuild-all push-to-dockerhub make-logs make-shell make-help

# Inicia todos los servicios
start-all:
	@echo "Iniciando todos los servicios..."
	docker-compose -f docker/docker-compose.yml up -d

# Detiene todos los servicios
stop-all:
	@echo "Deteniendo todos los servicios..."
	docker-compose -f docker/docker-compose.yml down

# Reconstruye todos los servicios
rebuild-all:
	@echo "Reconstruyendo todos los servicios..."
	docker-compose -f docker/docker-compose.yml down
	docker-compose -f docker/docker-compose.yml build --no-cache
	docker-compose -f docker/docker-compose.yml up -d

# Publica las imágenes en DockerHub
push-to-dockerhub:
	@echo "Publicando imágenes en DockerHub..."
	@for service in $(SERVICES); do \
		echo "Publicando $(DOCKER_USERNAME)/$(PROJECT_NAME)-$$service..."; \
		docker push $(DOCKER_USERNAME)/$(PROJECT_NAME)-$$service:latest; \
	done

# Muestra los logs de un contenedor específico
logs-%:
	@echo "Mostrando logs del contenedor $*..."
	docker-compose -f docker/docker-compose.yml logs -f $*

# Abre un shell en un contenedor específico
shell-%:
	@echo "Abriendo shell en el contenedor $*..."
	docker-compose -f docker/docker-compose.yml exec $* /bin/sh

# Muestra la ayuda
help:
	@echo "Comandos disponibles:"
	@echo "  make start-all                - Inicia todos los servicios"
	@echo "  make stop-all                 - Detiene todos los servicios"
	@echo "  make rebuild-all              - Reconstruye todos los servicios"
	@echo "  make push-to-dockerhub        - Publica las imágenes en DockerHub"
	@echo "  make logs-CONTENEDOR          - Muestra los logs del contenedor especificado"
	@echo "  make shell-CONTENEDOR         - Abre un shell en el contenedor especificado"
	@echo "  make help                     - Muestra esta ayuda"