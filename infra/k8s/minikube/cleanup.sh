#!/bin/bash

# Script para eliminar la aplicación de Minikube

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
}

# Confirmar que el usuario quiere eliminar todo
print_section "Confirmación de eliminación"
read -p "¿Estás seguro de que quieres eliminar toda la aplicación? [y/N] " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_error "Operación cancelada por el usuario"
    exit 1
fi

# Eliminar todo el namespace
print_section "Eliminando todo el namespace my-app"
kubectl delete namespace my-app
print_success "Namespace my-app eliminado"

# Restaurar los archivos YAML a su estado original
print_section "Restaurando archivos YAML a su estado original"
sed -i "s/http:\/\/[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}:30173/http:\/\/MINIKUBE_IP:30173/g" auth.yaml
sed -i "s/http:\/\/[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}:30173/http:\/\/MINIKUBE_IP:30173/g" api.yaml
sed -i "s/http:\/\/[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}:30080/http:\/\/MINIKUBE_IP:30080/g" frontend.yaml
sed -i "s/http:\/\/[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}:30082/http:\/\/MINIKUBE_IP:30082/g" frontend.yaml
print_success "Archivos YAML restaurados"

# Fin del script
print_section "Limpieza completada con éxito"
echo "Todos los recursos han sido eliminados y los archivos YAML se han restaurado a su estado original."