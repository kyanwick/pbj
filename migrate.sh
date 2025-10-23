#!/bin/bash

# PB+J Database Migration Script
# Use this when you make changes to the database schema

set -e

echo "🔄 Running Database Migrations..."
echo ""

BACKEND_DIR="/home/kyanwick/saas/backend"

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if backend is running
if ! curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
  echo -e "${YELLOW}⚠️  Backend is not running!${NC}"
  echo ""
  echo "Start the backend first:"
  echo "  cd /home/kyanwick/saas/backend && npm start"
  echo ""
  exit 1
fi

echo -e "${BLUE}✅ Backend is running${NC}"
echo ""

# Run migrations
echo -e "${YELLOW}Running migrate.js...${NC}"
cd "$BACKEND_DIR"

if npm start:migrate > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Migrations completed successfully${NC}"
else
  # Fallback if npm script doesn't exist
  node scripts/migrate.js
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Migrations completed successfully${NC}"
  else
    echo -e "${RED}❌ Migration failed${NC}"
    exit 1
  fi
fi

echo ""
echo -e "${BLUE}📊 Your database schema has been updated!${NC}"
echo ""
echo "If you added new test data, seed it with:"
echo "  cd $BACKEND_DIR && node scripts/seed.js"
echo ""
