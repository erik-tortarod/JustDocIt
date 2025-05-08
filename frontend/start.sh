#!/bin/sh
set -e

echo "===== Verificando archivos en /usr/share/nginx/html ====="
ls -la /usr/share/nginx/html
echo "===== Verificación completa ====="

# Iniciar nginx
exec nginx -g 'daemon off;'