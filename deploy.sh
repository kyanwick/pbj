#!/bin/bash

# Deploy script for PB+J production deployment
# Pulls latest code, rebuilds Docker containers, and restarts services

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR"

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_section() {
  echo ""
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${GREEN}$1${NC}"
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo ""
}

print_section "� PB+J Production Deployment"

# 1. Pull latest code
print_section "1️⃣  Pulling latest code from GitHub"
cd "$PROJECT_DIR"
git pull origin master || git pull origin main
echo -e "${GREEN}✅ Code updated${NC}"

# 2. Verify environment
print_section "2️⃣  Verifying environment configuration"
if [ ! -f "$PROJECT_DIR/.env" ]; then
  echo -e "${RED}❌ .env file not found${NC}"
  echo "Create .env with required variables (DB_PASSWORD, JWT_SECRET, etc.)"
  exit 1
fi
echo -e "${GREEN}✅ .env configured${NC}"

# 3. Stop containers
print_section "3️⃣  Stopping existing containers"
cd "$FRONTEND_DIR"
docker compose down
echo -e "${GREEN}✅ Containers stopped${NC}"

# 4. Rebuild images
print_section "4️⃣  Rebuilding Docker images"
docker compose build --no-cache backend web
echo -e "${GREEN}✅ Images rebuilt${NC}"

# 5. Start containers
print_section "5️⃣  Starting containers"
docker compose up -d
echo -e "${GREEN}✅ Containers started${NC}"

# 6. Wait and verify
print_section "6️⃣  Verifying deployment"
sleep 5
docker ps | grep -E "pbj-backend|pbj-frontend|pbj-postgres" || echo -e "${YELLOW}⚠️  Containers still starting...${NC}"

# 7. Check backend health
echo ""
echo "Checking backend health..."
for i in {1..10}; do
  if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend is healthy${NC}"
    break
  fi
  if [ $i -eq 10 ]; then
    echo -e "${YELLOW}⚠️  Backend health check failed, but containers are running${NC}"
  else
    sleep 2
  fi
done

print_section "🎉 Deployment Complete!"
echo -e "${GREEN}📍 App live at: https://pb.kyanoberas.com${NC}"
echo ""
echo "📋 Useful commands:"
echo "   View logs:        docker compose logs -f backend"
echo "   Restart services: docker compose restart"
echo "   Stop:             docker compose down"
echo "   Status:           docker compose ps"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

