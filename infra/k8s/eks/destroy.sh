#!/bin/bash

echo "🗑️ Starting cleanup..."

# Delete all deployments
echo "🗑️ Removing API deployment..."
kubectl delete -f api-deploy.yaml

echo "🗑️ Removing Frontend deployment..."
kubectl delete -f frontend-deploy.yaml

echo "🗑️ Removing Auth deployment..."
kubectl delete -f auth-deploy.yaml

echo "✅ Cleanup completed successfully!" 