#!/bin/bash

# Initialize storage directories on the large drive
# Run this before first docker-compose up

set -e

echo "🔧 Initializing SaaS storage directories..."

# Storage paths
STORAGE_BASE="/mnt/elitecloud/saas-storage"
DB_BASE="/mnt/elitecloud/saas-db"

# Create directories
mkdir -p "$STORAGE_BASE/brand_kits"
mkdir -p "$STORAGE_BASE/scheduled_posts"
mkdir -p "$STORAGE_BASE/media"
mkdir -p "$STORAGE_BASE/generated_history"
mkdir -p "$STORAGE_BASE/archive"
mkdir -p "/mnt/elitecloud/saas-logs"
mkdir -p "$DB_BASE"

# Set permissions (allowing Docker containers to write)
chmod -R 755 "$STORAGE_BASE"
chmod -R 755 "/mnt/elitecloud/saas-logs"
chmod -R 755 "$DB_BASE"

echo "✅ Storage directories created:"
echo "   Brand Kits: $STORAGE_BASE/brand_kits"
echo "   Scheduled Posts: $STORAGE_BASE/scheduled_posts"
echo "   Media: $STORAGE_BASE/media"
echo "   Generated History: $STORAGE_BASE/generated_history"
echo "   Archive: $STORAGE_BASE/archive"
echo "   Database: $DB_BASE"
echo ""
echo "📊 Disk usage:"
df -h | grep elitecloud
