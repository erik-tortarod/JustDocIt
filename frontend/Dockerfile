FROM node:20-bullseye-slim AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Override the .env file with environment variables at build time
# We'll create a new .env file based on Docker environment variables
ARG VITE_API_URL
ARG VITE_DOCS_URL
ARG VITE_ENVIROMENT

RUN echo "VITE_API_URL = '$VITE_API_URL'" > .env && \
    echo "VITE_DOCS_URL = '$VITE_DOCS_URL'" >> .env && \
    echo "VITE_ENVIROMENT = '$VITE_ENVIROMENT'" >> .env

# Build the application
RUN npm run build

# Production stage
FROM debian:bullseye-slim

# Install Apache
RUN apt-get update && apt-get install -y apache2 && rm -rf /var/lib/apt/lists/*

# Enable Apache modules
RUN a2enmod rewrite

# Copy Apache configuration
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Copy the built app from the build stage
COPY --from=build /app/dist /var/www/html/

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2ctl", "-D", "FOREGROUND"]