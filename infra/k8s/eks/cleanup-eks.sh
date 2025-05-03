#!/bin/bash

# Script para eliminar la aplicación de EKS

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

# Advertencia sobre los LoadBalancers
print_section "IMPORTANTE"
echo "Los LoadBalancers de AWS pueden tardar unos minutos en eliminarse completamente."
echo "Verifica en la consola de AWS que todos los LoadBalancers se hayan eliminado para evitar cargos innecesarios."

# Recordatorio sobre MongoDB Atlas
print_section "RECORDATORIO: MongoDB Atlas"
echo "Recuerda que tus datos siguen almacenados en MongoDB Atlas."
echo "Si deseas eliminar la base de datos, deberás hacerlo manualmente desde MongoDB Atlas."

# Fin del script
print_section "Limpieza completada con éxito"
echo "Todos los recursos Kubernetes han sido eliminados."