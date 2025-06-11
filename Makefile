# Variables globales
DOCKER_USERNAME ?= eriktortarod
PROJECT_NAME ?= justdocit
SERVICES := frontend auth api

.PHONY: start-all stop-all rebuild-all push-to-dockerhub logs shell help format run-all

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
	@echo "Eliminando imágenes del proyecto..."
	@for service in frontend auth api; do \
		echo "Eliminando $(DOCKER_USERNAME)/$(PROJECT_NAME)-$$service..."; \
		docker rmi $(DOCKER_USERNAME)/$(PROJECT_NAME)-$$service:latest 2>/dev/null || true; \
	done
	docker-compose -f docker/docker-compose.yml build --no-cache frontend auth api
	docker-compose -f docker/docker-compose.yml up -d

# Publica las imágenes en DockerHub
push-to-dockerhub:
	@echo "Verificando imágenes..."
	@for service in $(SERVICES); do \
		if ! docker images | grep -q "$(DOCKER_USERNAME)/$(PROJECT_NAME)-$$service"; then \
			echo "Imagen $(DOCKER_USERNAME)/$(PROJECT_NAME)-$$service no encontrada. Construyendo..."; \
			docker-compose -f docker/docker-compose.yml build $$service; \
			docker tag $$(docker-compose -f docker/docker-compose.yml images -q $$service) $(DOCKER_USERNAME)/$(PROJECT_NAME)-$$service:latest; \
		fi \
	done
	@echo "Publicando imágenes en DockerHub..."
	@for service in $(SERVICES); do \
		echo "Publicando $(DOCKER_USERNAME)/$(PROJECT_NAME)-$$service..."; \
		docker push $(DOCKER_USERNAME)/$(PROJECT_NAME)-$$service:latest || { echo "Error al publicar $$service"; exit 1; }; \
	done

# Muestra los logs de un contenedor específico
logs-%:
	@echo "Mostrando logs del contenedor $*..."
	docker-compose -f docker/docker-compose.yml logs -f $*

# Abre un shell en un contenedor específico
shell-%:
	@echo "Abriendo shell en el contenedor $*..."
	docker-compose -f docker/docker-compose.yml exec $* /bin/sh

format:
	@echo "Formateando frontend con npm..."
	cd frontend && npm run format

	@echo "Formateando backend (auth)..."
	cd auth && ./mvnw spring-javaformat:apply

	@echo "Formateando backend (api)..."
	cd api && ./mvnw spring-javaformat:apply

	@echo "Formato aplicado correctamente."

# Ejecuta el proyecto en local sin contenedores
run-all:
	@echo "Ejecutando el proyecto en local sin contenedores..."
	@echo "Iniciando frontend..."
	cd frontend && npm run dev &
	@echo "Iniciando backend (auth)..."
	cd auth && ./mvnw spring-boot:run &
	@echo "Iniciando backend (api)..."
	cd api && ./mvnw spring-boot:run &
	@echo "Todos los servicios están ejecutándose en local."

# Muestra la ayuda
help:
	@echo "Comandos disponibles:"
	@echo "  make start-all                - Inicia todos los servicios"
	@echo "  make stop-all                 - Detiene todos los servicios"
	@echo "  make rebuild-all              - Reconstruye todos los servicios"
	@echo "  make push-to-dockerhub        - Publica las imágenes en DockerHub"
	@echo "  make logs-CONTENEDOR          - Muestra los logs del contenedor especificado"
	@echo "  make shell-CONTENEDOR         - Abre un shell en el contenedor especificado"
	@echo "  make format                   - Da formato al código del frontend y backend"
	@echo "  make run-all                  - Ejecuta el proyecto en local sin contenedores"
	@echo "  make help                     - Muestra esta ayuda"