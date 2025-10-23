# 🚀 SaaS Docker Deployment Guide

## Your Server Configuration

Your deployment leverages your existing server architecture:
- **System Drive**: 58GB (root filesystem, mostly used)
- **Large Storage Drive**: 916GB available at `/mnt/elitecloud` (14% used)

All persistent data will be stored on the large drive to prevent system disk bloat.

---

## Quick Setup (5 Minutes)

### Step 1: Initialize Storage Directories
```bash
cd <project-directory>/saas
chmod +x scripts/init-storage.sh
./scripts/init-storage.sh
```

Expected output:
```
✅ Storage directories created:
   Brand Kits: /mnt/elitecloud/saas-storage/brand_kits
   Scheduled Posts: /mnt/elitecloud/saas-storage/scheduled_posts
   Media: /mnt/elitecloud/saas-storage/media
   Generated History: /mnt/elitecloud/saas-storage/generated_history
   Archive: /mnt/elitecloud/saas-storage/archive
   Database: /mnt/elitecloud/saas-db
```

### Step 2: Configure Environment
```bash
cp .env.example .env
# Edit with your actual n8n instance URL, DB password, etc.
nano .env
```

### Step 3: Start Services
```bash
docker-compose up -d
```

### Step 4: Verify
```bash
# Check containers running
docker ps

# Verify storage mounts
docker exec my-saas ls -la /app/storage/

# Check database connection
docker exec saas-db pg_isready -U saas_user
```

---

## Storage Usage

### Current Drive Status
```bash
df -h /mnt/elitecloud
# Filesystem     Size  Used Avail Use% Mounted on
# /dev/sdb1      916G  120G  750G  14% /mnt/elitecloud
```

Available space: **750GB** ✅ (plenty for brand kits + generated content)

---

## Data Management

### Add Brand Kits Manually
```bash
cp my_logo.png /mnt/elitecloud/saas-storage/brand_kits/user_123/
```

### Monitor Storage Growth
```bash
# Check total storage usage
du -sh /mnt/elitecloud/saas-storage/

# Check largest subdirectories
du -sh /mnt/elitecloud/saas-storage/*/
```

### Archive Old Content
```bash
# Move published posts to archive (automated by n8n)
# Manual: mv /mnt/elitecloud/saas-storage/scheduled_posts/user_123/post_456.json \
#            /mnt/elitecloud/saas-storage/archive/
```

---

## Backup Strategy

### Weekly Backup (Recommended)
```bash
# Backup to another location on large drive
mkdir -p /mnt/elitecloud/backups
rsync -av --delete /mnt/elitecloud/saas-storage/ /mnt/elitecloud/backups/weekly/

# Backup database
docker exec saas-db pg_dump -U saas_user saas_db > \
  /mnt/elitecloud/backups/db_$(date +%Y%m%d).sql
```

### Full System Backup
```bash
# Stop containers
docker-compose down

# Create full backup tar
tar -czf /backup/saas_$(date +%Y%m%d_%H%M%S).tar.gz \
  /mnt/elitecloud/saas-storage \
  /mnt/elitecloud/saas-db
```

---

## Troubleshooting

### Check Container Logs
```bash
docker logs my-saas
docker logs saas-db
```

### Verify Volume Mounts
```bash
docker inspect my-saas | grep -A 10 '"Mounts"'
```

### Test Storage Permissions
```bash
# Can Docker write to storage?
docker exec my-saas touch /app/storage/test.txt && echo "✅ OK" || echo "❌ Failed"
docker exec my-saas rm /app/storage/test.txt
```

### Reset Everything
```bash
# Warning: This deletes all data!
docker-compose down -v
rm -rf /mnt/elitecloud/saas-storage/*
rm -rf /mnt/elitecloud/saas-db/*
./scripts/init-storage.sh
docker-compose up -d
```

---

## Files Modified for Storage Setup

- ✅ `docker-compose.yml` - Added volume mounts + PostgreSQL service
- ✅ `Dockerfile` - Added storage directory creation
- ✅ `.env.example` - Added storage path configuration
- ✅ `scripts/init-storage.sh` - Initialization script
- ✅ `DOCKER_STORAGE.md` - Detailed storage documentation
- ✅ `.github/copilot-instructions.md` - Updated with architecture details

---

## What Happens When

| Action | Storage | Duration |
|--------|---------|----------|
| User uploads brand kit | `/storage/brand_kits/` | Persistent ♾️ |
| Generate content | Memory → UI display | Temporary ⏱️ |
| Schedule post | `/storage/scheduled_posts/` | Until published |
| Publish post | Moved to `/storage/archive/` | Persistent ♾️ |
| n8n processes data | Uses files from `/storage/` | During execution |

---

## Next Steps

1. ✅ Run `./scripts/init-storage.sh`
2. ✅ Update `.env` with your configuration
3. ✅ Run `docker-compose up -d`
4. ✅ Set up n8n workflows to read/write from storage
5. ✅ Build API backend to handle file operations

---

## Questions?

Refer to:
- `DOCKER_STORAGE.md` for detailed architecture
- `.github/copilot-instructions.md` for code patterns
- `docker-compose.yml` for service configuration
