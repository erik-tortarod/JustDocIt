#!/bin/bash

echo "🚀 Starting deployment..."

# Apply all deployments
echo "📦 Applying API deployment..."
kubectl apply -f api-deploy.yaml

echo "📦 Applying Frontend deployment..."
kubectl apply -f frontend-deploy.yaml

echo "📦 Applying Auth deployment..."
kubectl apply -f auth-deploy.yaml

echo "✅ Deployment completed successfully!" 