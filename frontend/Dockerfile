# Fase de construcción
FROM node:20-alpine as build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copiar el resto de archivos
COPY . .

# Construir la aplicación
RUN npm run build

# Fase de producción
FROM nginx:alpine

# Copiar archivos estáticos generados
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Script de inicio para verificar la estructura del directorio
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]