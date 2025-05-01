# Etapa de construcción
FROM node:20-bullseye-slim AS build

WORKDIR /app

# Argumentos que se pasarán durante el build
ARG VITE_API_URL
ARG VITE_DOCS_URL

# Establecer las variables de entorno para el build
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_DOCS_URL=$VITE_DOCS_URL

# Copiamos los archivos de dependencias primero
COPY package.json package-lock.json* ./
RUN npm install

# Copiamos el resto del código
COPY . .

# Construimos la aplicación para producción
RUN npm run build

# Etapa de producción con Apache
FROM debian:bullseye-slim

# Instalamos Apache
RUN apt-get update && apt-get install -y \
    apache2 \
    && rm -rf /var/lib/apt/lists/*

# Configuramos Apache para una SPA
RUN a2enmod rewrite
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Copiamos los archivos construidos desde la etapa anterior
COPY --from=build /app/dist /var/www/html

# Exponemos el puerto 80
EXPOSE 80

# Iniciamos Apache en primer plano
CMD ["apache2ctl", "-D", "FOREGROUND"]