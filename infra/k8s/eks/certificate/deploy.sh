#!/bin/bash

# Script para desplegar NGINX Ingress Controller y un servidor Apache de ejemplo
# Para el dominio tortarod.shop

echo "🚀 Iniciando despliegue de Ingress Controller y Apache..."

# Crear namespace para ingress-nginx si no existe
kubectl create namespace ingress-nginx --dry-run=client -o yaml | kubectl apply -f -

# Añadir el repositorio de Helm para ingress-nginx
echo "📦 Añadiendo repositorio de Helm para NGINX Ingress Controller..."
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

# Instalar NGINX Ingress Controller
echo "🔧 Instalando NGINX Ingress Controller..."
helm install nginx-ingress ingress-nginx/ingress-nginx --namespace ingress-nginx

# Esperar a que el servicio de ingress-nginx esté disponible
echo "⏳ Esperando a que el Ingress Controller esté listo..."
kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=120s

# Obtener la IP externa del Ingress Controller
echo "🔍 Obteniendo la IP externa del Ingress Controller..."
echo "Por favor, configura un registro A en tu DNS para tortarod.shop que apunte a la IP externa mostrada a continuación:"
sleep 5
kubectl get svc -n ingress-nginx nginx-ingress-ingress-nginx-controller -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
echo ""

# Crear secret TLS para el certificado
echo "🔒 Creando el secret para los certificados SSL..."
echo "⚠️ Asegúrate de tener los archivos certificate.crt, private.key y ca_bundle.crt en el directorio actual"
kubectl create secret tls tortarod-shop-tls --key private.key --cert certificate.crt -n ingress-nginx
kubectl create configmap tortarod-shop-ca --from-file=ca.crt=ca_bundle.crt -n ingress-nginx

# Actualizar el Ingress Controller para usar el certificado por defecto
echo "🔄 Configurando el Ingress Controller para usar el certificado por defecto..."
cat <<EOF > custom-values.yaml
controller:
  extraArgs:
    default-ssl-certificate: "ingress-nginx/tortarod-shop-tls"
  config:
    ssl-ciphers: "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384"
    ssl-protocols: "TLSv1.2 TLSv1.3"
    use-forwarded-headers: "true"
EOF

helm upgrade nginx-ingress ingress-nginx/ingress-nginx -n ingress-nginx --values custom-values.yaml

# Crear deployment de Apache
echo "🌐 Creando deployment de Apache..."
kubectl create deployment apache-test --image=httpd:2.4

# Exponer el deployment como un servicio
echo "🔗 Exponiendo el deployment como un servicio..."
kubectl expose deployment apache-test --port=80 --name=apache-service

# Crear el ingress para el servicio de Apache
echo "🚪 Creando el Ingress para el servicio de Apache..."
cat <<EOF > apache-ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: tortarod-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/backend-protocol: "HTTP"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - tortarod.shop
    secretName: tortarod-shop-tls
  rules:
  - host: tortarod.shop
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: apache-service
            port:
              number: 80
EOF

kubectl apply -f apache-ingress.yaml

echo "✅ ¡Despliegue completado!"
echo "🌍 Ahora puedes acceder a https://tortarod.shop para ver tu servidor Apache"
echo "⚠️ Recuerda que puede tomar unos minutos hasta que todo esté listo y los DNS se propaguen"

# Mostrar información del LoadBalancer
echo ""
echo "📊 Información del LoadBalancer:"
kubectl get svc -n ingress-nginx