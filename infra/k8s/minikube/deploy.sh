#!/bin/bash

# Script para desplegar la aplicación en Minikube

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

# Comprobar que Minikube está funcionando
print_section "Verificando que Minikube está en ejecución"
if minikube status | grep -q 'Running'; then
    print_success "Minikube está en ejecución"
else
    print_error "Minikube no está en ejecución. Por favor, inicia Minikube con 'minikube start' y vuelve a ejecutar este script."
fi

# Obtener la IP de Minikube
print_section "Obteniendo la IP de Minikube"
MINIKUBE_IP=$(minikube ip)
if [ -z "$MINIKUBE_IP" ]; then
    print_error "No se pudo obtener la IP de Minikube"
else
    print_success "IP de Minikube: $MINIKUBE_IP"
fi

# Reemplazar la IP de Minikube en los archivos
print_section "Reemplazando la IP de Minikube en los archivos"
sed -i "s/MINIKUBE_IP/$MINIKUBE_IP/g" auth.yaml
sed -i "s/MINIKUBE_IP/$MINIKUBE_IP/g" api.yaml
sed -i "s/MINIKUBE_IP/$MINIKUBE_IP/g" frontend.yaml
print_success "IP de Minikube reemplazada en los archivos"

# Crear el namespace y los secretos
print_section "Creando namespace, secretos y volumen"
kubectl apply -f secrets.yaml
print_success "Namespace, secretos y volumen creados"

# Desplegar MongoDB
print_section "Desplegando MongoDB"
kubectl apply -f mongodb.yaml
print_success "MongoDB desplegado"

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

# Desplegar Frontend
print_section "Desplegando Frontend"
kubectl apply -f frontend.yaml
print_success "Frontend desplegado"

# Esperar a que todos los pods estén listos
print_section "Esperando a que todos los pods estén listos"
kubectl wait --for=condition=Ready pods --all -n my-app --timeout=300s
print_success "Todos los pods están listos"

# Mostrar los servicios
print_section "Servicios desplegados"
kubectl get services -n my-app

# Mostrar URLs de acceso
print_section "URLs de acceso"
echo -e "Frontend: \t${GREEN}http://$MINIKUBE_IP:30173${NC}"
echo -e "Auth Service: \t${GREEN}http://$MINIKUBE_IP:30080${NC}"
echo -e "API Service: \t${GREEN}http://$MINIKUBE_IP:30082${NC}"
echo -e "Mongo Express: \t${GREEN}http://$MINIKUBE_IP:30081${NC} (usuario: admin, contraseña: pass)"

# Fin del script
print_section "Despliegue completado con éxito"
echo "Puedes acceder a la aplicación usando las URLs mostradas arriba."
echo "Para ver los logs de un servicio, usa: kubectl logs -n my-app deployment/[nombre-servicio]"
echo "Para eliminar todo el despliegue, usa: kubectl delete namespace my-app"