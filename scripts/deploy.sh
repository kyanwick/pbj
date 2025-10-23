#!/bin/bash

# Deploy script for SaaS production deployment
# Rebuilds Docker image and restarts containers

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "🚀 PB+J SaaS Deployment to Production"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Project: $PROJECT_DIR"
echo ""

# 1. Initialize storage (if first time)
echo "🗂️  Ensuring storage directories exist..."
sudo mkdir -p /mnt/elitecloud/saas-storage/{brand_kits,scheduled_posts,media,generated_history,archive}
sudo mkdir -p /mnt/elitecloud/saas-db
sudo chmod -R 755 /mnt/elitecloud/saas-storage /mnt/elitecloud/saas-db
echo "✅ Storage ready"
echo ""

# 2. Check for .env
echo "🔧 Checking environment configuration..."
if [ ! -f "$PROJECT_DIR/.env" ]; then
  echo "⚠️  .env file not found. Copying from .env.example..."
  cp "$PROJECT_DIR/.env.example" "$PROJECT_DIR/.env"
  echo "❌ Please edit .env with your configuration:"
  echo "   nano .env"
  exit 1
fi
echo "✅ .env configured"
echo ""

# 3. Stop existing containers
echo "🛑 Stopping existing containers..."
cd "$PROJECT_DIR"
sudo docker-compose down
echo "✅ Containers stopped"
echo ""

# 4. Rebuild Docker image (builds frontend)
echo "📦 Rebuilding Docker image (this builds the frontend)..."
sudo docker-compose build --no-cache web
echo "✅ Docker image rebuilt"
echo ""

# 5. Start containers
echo "🚀 Starting Docker containers..."
sudo docker-compose up -d
echo "✅ Containers started"
echo ""

# 6. Wait for services
echo "⏳ Waiting for services to be ready..."
sleep 10

# 7. Verify
echo "✅ Verifying deployment..."
sudo docker ps | grep my-saas || echo "⚠️  Container not running yet"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Deployment complete!"
echo ""
echo "📍 Live at: https://pb.kyanoberas.com"
echo ""
echo "📋 Quick commands:"
echo "   View logs:     docker-compose logs -f web"
echo "   Stop:          docker-compose down"
echo "   Restart:       docker-compose restart"
echo "   Rebuild only:  docker-compose build --no-cache web"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

