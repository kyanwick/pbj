# Docker Setup for SaaS

## Storage Architecture

This project uses **two separate storage tiers**:

### Primary Storage: `/mnt/elitecloud` (Large Drive - 916GB)
Used for all persistent data:
- **Brand kits** - User brand assets (logos, colors, guides)
- **Scheduled posts** - Posts ready for publishing
- **Media** - Generated images/videos
- **Generated history** - Historical records for analytics
- **Database** - PostgreSQL data
- **Logs** - Application logs

### Root Storage: `/` (System Drive - 58GB)
Only contains the Nginx web server and Quasar SPA build

---

## Quick Start

### 1. Initialize Storage Directories
```bash
# Create all necessary directories with proper permissions
chmod +x scripts/init-storage.sh
./scripts/init-storage.sh
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your configuration
nano .env
```

### 3. Start Services
```bash
docker-compose up -d
```

### 4. Verify Storage Mounts
```bash
docker exec my-saas ls -la /app/storage/
```

---

## Directory Structure on `/mnt/elitecloud`

```
/mnt/elitecloud/
├── saas-storage/
│   ├── brand_kits/
│   │   └── user_123/
│   │       ├── logo.png
│   │       ├── brand_guide.json
│   │       └── colors.json
│   ├── scheduled_posts/
│   │   └── user_123/
│   │       ├── post_456.json
│   │       └── post_789.json
│   ├── media/
│   │   └── user_123/
│   │       ├── generated_image_123.png
│   │       └── generated_video_456.mp4
│   ├── generated_history/
│   │   └── user_123/
│   │       └── batch_2025_10_23.json
│   └── archive/
│       └── published_2025_10_01/
│           └── post_456.json
│
├── saas-db/
│   └── (PostgreSQL data files)
│
└── saas-logs/
    └── (Application logs)
```

---

## Backup & Migration

### Backup Everything
```bash
# Stop containers
docker-compose down

# Backup storage (incremental)
rsync -av /mnt/elitecloud/saas-storage/ /backup/saas-storage/

# Backup database (full dump)
docker exec saas-db pg_dump -U saas_user saas_db > /backup/saas-db-$(date +%Y%m%d).sql

# Backup PostgreSQL data directory
rsync -av /mnt/elitecloud/saas-db/ /backup/saas-db-files/
```

### Restore on New Server
```bash
# 1. Set up new server with /mnt/elitecloud mounted
# 2. Copy storage back
rsync -av /backup/saas-storage/ /mnt/elitecloud/saas-storage/

# 3. Copy database files
rsync -av /backup/saas-db-files/ /mnt/elitecloud/saas-db/

# 4. Fix permissions
chmod -R 755 /mnt/elitecloud/saas-storage /mnt/elitecloud/saas-db

# 5. Start containers
docker-compose up -d
```

---

## Environment Variables

Key variables for storage configuration:

| Variable | Default | Purpose |
|----------|---------|---------|
| `STORAGE_PATH` | `/app/storage` | Base storage directory (mounted) |
| `BRAND_KITS_DIR` | `/app/storage/brand_kits` | Brand assets storage |
| `SCHEDULED_POSTS_DIR` | `/app/storage/scheduled_posts` | Scheduled content |
| `MEDIA_DIR` | `/app/storage/media` | Generated media |
| `DB_HOST` | `db` | PostgreSQL container name |
| `DB_PASSWORD` | `changeMe` | **Change this!** |

---

## Troubleshooting

### Check Storage Mounts
```bash
docker exec my-saas df -h /app/storage
```

### Verify Directory Permissions
```bash
ls -la /mnt/elitecloud/saas-storage/
```

### View Logs
```bash
docker logs my-saas
docker logs saas-db
```

### Clean Up Old Archives (Manual)
```bash
# Remove archives older than 30 days
find /mnt/elitecloud/saas-storage/archive -type f -mtime +30 -delete
```

---

## Performance Notes

- **Database** is on large drive = good for large datasets
- **Media** is on large drive = good for generated images/videos
- **Static web files** are in container = fast serving, no disk I/O
- **Logs** are on large drive = won't fill up system drive

This setup prioritizes **scalability** and **data durability** while keeping the system drive lean.
