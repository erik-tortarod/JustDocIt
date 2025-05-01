#!/bin/bash

# Script para desplegar la aplicación en EKS

# Colores para la salida
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Funciones de utilidad
print_section() {
    echo -e "\n${YELLOW}==== $1 ====${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# Comprobar que kubectl está configurado para EKS
print_section "Verificando conexión a EKS"
if kubectl cluster-info &> /dev/null; then
    print_success "Conectado al cluster EKS"
else
    print_error "No se puede conectar al cluster EKS. Asegúrate de que kubectl está configurado correctamente."
fi

# Crear el namespace y los secretos
print_section "Creando namespace y secretos"
kubectl apply -f secrets.yaml
print_success "Namespace y secretos creados"

# Desplegar MongoDB
print_section "Desplegando MongoDB"
kubectl apply -f mongodb.yaml
print_success "MongoDB desplegado"

# Esperar a que MongoDB esté listo (ajustado el tiempo para EKS)
print_section "Esperando a que MongoDB esté listo"
sleep 30  # Dar tiempo para que MongoDB inicie sin persistencia
kubectl wait --for=condition=ready pod -l app=mongodb -n my-app --timeout=120s
print_success "MongoDB está listo"

# Desplegar Mongo Express
print_section "Desplegando Mongo Express"
kubectl apply -f mongo-express.yaml
print_success "Mongo Express desplegado"

# Desplegar Auth
print_section "Desplegando Auth Service"
kubectl apply -f auth.yaml
print_success "Auth Service desplegado"

# Desplegar API
print_section "Desplegando API Service"
kubectl apply -f api.yaml
print_success "API Service desplegado"

# NO desplegar Frontend todavía - necesitamos las URLs primero
print_section "Esperando a que los servicios obtengan IPs externas"
echo "Esto puede tomar varios minutos..."

# Función para obtener la URL del LoadBalancer
get_lb_url() {
    local service_name=$1
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        local external_ip=$(kubectl get service $service_name -n my-app -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
        
        if [ ! -z "$external_ip" ] && [ "$external_ip" != "<pending>" ]; then
            echo "$external_ip"
            return 0
        fi
        
        echo "Intento $attempt de $max_attempts: Esperando IP externa para $service_name..."
        sleep 10
        ((attempt++))
    done
    
    return 1
}

# Obtener URLs de los LoadBalancers
print_section "Obteniendo URLs de los LoadBalancers"

AUTH_URL=$(get_lb_url "auth")
API_URL=$(get_lb_url "api")
MONGO_EXPRESS_URL=$(get_lb_url "mongo-express")

if [ -z "$AUTH_URL" ] || [ -z "$API_URL" ]; then
    print_error "No se pudieron obtener todas las URLs necesarias"
fi

# Construir y desplegar Frontend con las URLs correctas
print_section "Construyendo Frontend con URLs correctas"

# Cambiar al directorio del frontend
cd ../../../frontend || exit

# Construir la imagen con las variables correctas
docker build \
    --build-arg VITE_API_URL="http://$AUTH_URL:8080" \
    --build-arg VITE_DOCS_URL="http://$API_URL:8082" \
    -t eriktortarod/docker-frontend:latest .

# Subir la imagen a Docker Hub
print_section "Subiendo imagen del Frontend a Docker Hub"
docker push eriktortarod/docker-frontend:latest

# Volver al directorio de EKS
cd ../infra/k8s/eks || exit

# Desplegar Frontend
print_section "Desplegando Frontend"
kubectl apply -f frontend.yaml
print_success "Frontend desplegado"

# Esperar a que el Frontend esté listo
print_section "Esperando a que Frontend esté listo"
kubectl wait --for=condition=Ready pod -l app=frontend -n my-app --timeout=300s

# Obtener URL del Frontend
FRONTEND_URL=$(get_lb_url "frontend")

if [ -z "$FRONTEND_URL" ]; then
    print_error "No se pudo obtener la URL del Frontend"
fi

# Actualizar las variables de entorno en Auth y API
print_section "Actualizando variables de entorno en Auth y API"

# Actualizar Auth
kubectl set env deployment/auth -n my-app \
    FRONTEND_URL="http://$FRONTEND_URL"

# Actualizar API
kubectl set env deployment/api -n my-app \
    FRONTEND_URL="http://$FRONTEND_URL"

print_success "Variables de entorno actualizadas"

# Reiniciar Auth y API para aplicar los cambios
print_section "Reiniciando Auth y API para aplicar cambios"
kubectl rollout restart deployment auth -n my-app
kubectl rollout restart deployment api -n my-app

# Esperar a que los rollouts se completen
kubectl rollout status deployment auth -n my-app
kubectl rollout status deployment api -n my-app

# Mostrar los servicios
print_section "Servicios desplegados"
kubectl get services -n my-app

# Mostrar URLs de acceso
print_section "URLs de acceso"
echo -e "Frontend: \t${GREEN}http://$FRONTEND_URL${NC}"
echo -e "Auth Service: \t${GREEN}http://$AUTH_URL:8080${NC}"
echo -e "API Service: \t${GREEN}http://$API_URL:8082${NC}"
echo -e "Mongo Express: \t${GREEN}http://$MONGO_EXPRESS_URL:8081${NC} (usuario: admin, contraseña: pass)"

# Fin del script
print_section "Despliegue completado con éxito"
echo "Puedes acceder a la aplicación usando las URLs mostradas arriba."
echo "Para ver los logs de un servicio, usa: kubectl logs -n my-app deployment/[nombre-servicio]"
echo "Para eliminar todo el despliegue, usa: kubectl delete namespace my-app"