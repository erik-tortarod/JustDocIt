#!/bin/bash

# Script para eliminar todos los recursos creados por deploy.sh
# Para el dominio tortarod.shop

echo "🧹 Iniciando limpieza de recursos..."

# Eliminar el Ingress
echo "🗑️ Eliminando el Ingress..."
kubectl delete ingress tortarod-ingress

# Eliminar el servicio de Apache
echo "🗑️ Eliminando el servicio de Apache..."
kubectl delete service apache-service

# Eliminar el deployment de Apache
echo "🗑️ Eliminando el deployment de Apache..."
kubectl delete deployment apache-test

# Eliminar los secrets y configmaps
echo "🗑️ Eliminando secrets y configmaps..."
kubectl delete secret tortarod-shop-tls -n ingress-nginx
kubectl delete configmap tortarod-shop-ca -n ingress-nginx

# Eliminar el Ingress Controller
echo "🗑️ Eliminando el Ingress Controller..."
helm uninstall nginx-ingress -n ingress-nginx

# Eliminar el archivo de valores personalizados
echo "🗑️ Eliminando archivos temporales..."
rm -f custom-values.yaml apache-ingress.yaml

# Opcional: Eliminar el namespace (descomenta si quieres eliminar todo)
# echo "🗑️ Eliminando el namespace ingress-nginx..."
# kubectl delete namespace ingress-nginx

echo "✅ ¡Limpieza completada!"
echo "👋 Todos los recursos han sido eliminados"