#!/bin/bash

# PB+J Local Development Startup Script
# Starts: Database (Docker) + Backend (local) + Frontend (local)

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR"

echo "🚀 Starting PB+J Local Development..."
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print section headers
print_section() {
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${GREEN}$1${NC}"
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo ""
}

# Kill any existing processes if restarting
cleanup() {
  echo ""
  echo -e "${YELLOW}Stopping services...${NC}"
  pkill -f "npm start" 2>/dev/null || true
  pkill -f "quasar dev" 2>/dev/null || true
  pkill -f "docker compose" 2>/dev/null || true
}

trap cleanup EXIT

# 1. Start Database
print_section "1️⃣  Starting Database (PostgreSQL)"
cd "$FRONTEND_DIR"
docker compose up -d db
sleep 5

if docker ps | grep -q pbj-postgres; then
  echo -e "${GREEN}✅ Database running${NC}"
else
  echo -e "${YELLOW}⚠️  Database may still be starting...${NC}"
fi
echo ""

# 2. Start Backend
print_section "2️⃣  Starting Backend Server"
cd "$BACKEND_DIR"
echo -e "${YELLOW}Backend starting on http://localhost:5000${NC}"
npm start &
BACKEND_PID=$!
sleep 3

if curl -s http://localhost:5000/api/health > /dev/null; then
  echo -e "${GREEN}✅ Backend running${NC}"
else
  echo -e "${YELLOW}⚠️  Backend still starting...${NC}"
fi
echo ""

# 3. Start Frontend
print_section "3️⃣  Starting Frontend Dev Server"
cd "$FRONTEND_DIR"
echo -e "${YELLOW}Frontend starting on http://localhost:9001${NC}"
npm run dev &
FRONTEND_PID=$!
sleep 5

echo ""
print_section "🎉 Local Development Environment Ready!"
echo ""
echo -e "${GREEN}Frontend:${NC}  http://localhost:9001"
echo -e "${GREEN}Backend:${NC}   http://localhost:5000"
echo -e "${GREEN}Database:${NC}  PostgreSQL in Docker"
echo ""
echo -e "${BLUE}Test Credentials:${NC}"
echo "  Email:    demo@example.com"
echo "  Password: password"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo ""

# Keep script running
wait
