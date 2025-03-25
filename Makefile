# Makefile para aplicación Spring Boot con MongoDB

# Variables de comandos
DOCKER_COMPOSE = sudo docker-compose
DOCKER = sudo docker
MAVEN = sudo ./mvnw

# Archivo docker-compose específico para MongoDB
DOCKER_COMPOSE_FILE = docker-compose.mongo.yaml

# Variables de aplicación
APP_NAME = mongodbbasic

# Variables de MongoDB
MONGO_PORT = 27018
MONGO_CONTAINER = mongodb
MONGO_EXPRESS_PORT = 8081
MONGO_EXPRESS_CONTAINER = mongo-express
MONGO_USERNAME = rootuser
MONGO_PASSWORD = rootpass
MONGO_AUTH_DB = admin

# Variables de MongoDB Express
MONGO_EXPRESS_USERNAME = admin
MONGO_EXPRESS_PASSWORD = pass
MONGO_EXPRESS_URL = http://localhost:$(MONGO_EXPRESS_PORT)

# Comandos para Docker
.PHONY: docker-up docker-down docker-restart docker-logs mongodb-shell mongodb-express

docker-up:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d

docker-down:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down

docker-restart:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) restart

docker-logs:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) logs -f

# MongoDB
mongodb-shell:
	$(DOCKER) exec -it $(MONGO_CONTAINER) mongosh -u $(MONGO_USERNAME) -p $(MONGO_PASSWORD) --authenticationDatabase $(MONGO_AUTH_DB)

mongodb-express:
	@echo "Abriendo MongoDB Express en $(MONGO_EXPRESS_URL)"
	@echo "Usuario: $(MONGO_EXPRESS_USERNAME)"
	@echo "Contraseña: $(MONGO_EXPRESS_PASSWORD)"
	xdg-open $(MONGO_EXPRESS_URL) || open $(MONGO_EXPRESS_URL) || echo "No se pudo abrir el navegador automáticamente. Visita $(MONGO_EXPRESS_URL)"

# Comandos para la aplicación Spring Boot
.PHONY: build run clean test

build:
	$(MAVEN) clean package -DskipTests

run:
	$(MAVEN) spring-boot:run

clean:
	$(MAVEN) clean

test:
	$(MAVEN) test

# Comandos combinados
.PHONY: start stop restart

start: docker-up build run

stop: docker-down

restart: docker-restart run

# Ayuda
.PHONY: help

help:
	@echo "Makefile para aplicación Spring Boot con MongoDB"
	@echo ""
	@echo "Comandos disponibles:"
	@echo "  make docker-up        - Inicia los contenedores Docker de MongoDB (usando $(DOCKER_COMPOSE_FILE))"
	@echo "  make docker-down      - Detiene los contenedores Docker (usando $(DOCKER_COMPOSE_FILE))"
	@echo "  make docker-restart   - Reinicia los contenedores Docker (usando $(DOCKER_COMPOSE_FILE))"
	@echo "  make docker-logs      - Muestra los logs de los contenedores en tiempo real"
	@echo "  make mongodb-shell    - Abre un shell de MongoDB en el contenedor"
	@echo "  make mongodb-express  - Abre MongoDB Express en el navegador"
	@echo "  make build            - Compila la aplicación Spring Boot"
	@echo "  make run              - Ejecuta la aplicación Spring Boot"
	@echo "  make clean            - Limpia los directorios de compilación"
	@echo "  make test             - Ejecuta los tests de la aplicación"
	@echo "  make start            - Inicia los contenedores y la aplicación"
	@echo "  make stop             - Detiene los contenedores"
	@echo "  make restart          - Reinicia los contenedores y la aplicación"
	@echo "  make help             - Muestra esta ayuda"