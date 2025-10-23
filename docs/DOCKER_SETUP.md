# 🐳 Docker Setup - Run Everything with One Command

Complete PB+J stack with Docker Compose: Frontend + Backend + PostgreSQL

## Prerequisites

- Docker installed: https://docs.docker.com/get-docker/
- Docker Compose installed (comes with Docker Desktop)
- `docker --version` should show v20+
- `docker-compose --version` should show v2+

---

## Quick Start

### 1. Create .env file

```bash
cd /home/kyanwick/saas
cp .env.example .env
```

Edit `.env` (optional - defaults are fine):
```
NODE_ENV=production
DB_PASSWORD=password123
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:9001
```

### 2. Start Everything

```bash
cd /home/kyanwick/saas
docker-compose up
```

This will:
- Build and start PostgreSQL database
- Build and start Node.js backend API
- Build and start Vue.js frontend
- Run database migrations
- Seed test data
- All containers restart automatically

### 3. Access Services

- **Frontend**: http://localhost:9001
- **Backend API**: http://localhost:5000
- **Database**: localhost:5432 (for pgAdmin or psql)

### 4. Test

**Register**: http://localhost:9001/#/register
**Login**: demo@example.com / password
**Profile**: Fill creator profile form

---

## Services

### PostgreSQL Database
- Container: `pbj-postgres`
- Port: 5432
- User: pbj_user
- Database: pbj_db
- Storage: `/mnt/elitecloud/pbj-db` (persistent)
- Health check: Enabled (waits for DB before starting backend)

### Backend API
- Container: `pbj-backend`
- Port: 5000
- Depends on: PostgreSQL
- Auto-runs: Migrations + Seed data
- Storage: `/app/node_modules` (volume for speed)

### Frontend Web
- Container: `pbj-frontend`
- Port: 9001
- Depends on: Backend
- Storage: `/mnt/elitecloud/pbj-storage` (persistent)

---

## Docker Commands

### Start All Services
```bash
docker-compose up
```

### Start in Background
```bash
docker-compose up -d
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f db
docker-compose logs -f web
```

### Stop All Services
```bash
docker-compose down
```

### Rebuild Services
```bash
docker-compose down
docker-compose build
docker-compose up
```

### Remove Everything (including volumes)
```bash
docker-compose down -v
```

### Check Service Status
```bash
docker-compose ps
```

### Execute Command in Container
```bash
# Backend shell
docker exec -it pbj-backend sh

# Run migrations manually
docker exec pbj-backend npm run migrate

# Database psql
docker exec -it pbj-postgres psql -U pbj_user -d pbj_db
```

---

## Database Access

### From Your Machine

**Using psql**:
```bash
psql -h localhost -U pbj_user -d pbj_db
# Password: password123
```

**Using Docker**:
```bash
docker exec -it pbj-postgres psql -U pbj_user -d pbj_db
```

**Using pgAdmin** (optional):
```bash
# Add to docker-compose.yml and run docker-compose up again
```

### Backup Database
```bash
docker exec pbj-postgres pg_dump -U pbj_user pbj_db > backup.sql
```

### Restore Database
```bash
docker exec -i pbj-postgres psql -U pbj_user pbj_db < backup.sql
```

---

## Environment Variables

### Frontend (.env in docker-compose)
```
NODE_ENV=production|development
STORAGE_PATH=/app/storage
```

### Backend (.env in docker-compose)
```
NODE_ENV=production|development
PORT=5000
DB_HOST=db
DB_PORT=5432
DB_NAME=pbj_db
DB_USER=pbj_user
DB_PASSWORD=password123
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:9001
```

### Database (.env in docker-compose)
```
DB_PASSWORD=password123
```

---

## Volumes & Storage

### Persistent Storage
```
/mnt/elitecloud/pbj-db/         # Database files
/mnt/elitecloud/pbj-storage/    # Frontend storage
/mnt/elitecloud/pbj-logs/       # Application logs
```

These directories survive `docker-compose down`

### Volume Cleanup

If you need to reset everything:
```bash
# Stop containers
docker-compose down

# Remove volumes
docker volume prune

# Or specific volume
docker volume rm pbj-db

# Rebuild
docker-compose up
```

---

## Troubleshooting

### "Cannot connect to PostgreSQL"
```bash
# Check if DB container is running and healthy
docker-compose ps

# Check database logs
docker-compose logs db

# Restart just the database
docker-compose restart db
```

### "Backend won't start"
```bash
# Check backend logs
docker-compose logs backend

# Make sure database is healthy first
docker-compose logs db | grep "ready"

# Rebuild
docker-compose build backend
docker-compose up
```

### "Port already in use"
```bash
# Find what's using port 5000
lsof -i :5000

# Kill process or change port in docker-compose.yml
```

### "Permission denied" on /mnt/elitecloud
```bash
# Create directories if they don't exist
sudo mkdir -p /mnt/elitecloud/pbj-db
sudo mkdir -p /mnt/elitecloud/pbj-storage
sudo mkdir -p /mnt/elitecloud/pbj-logs

# Fix permissions
sudo chown -R 999:999 /mnt/elitecloud/pbj-db
sudo chmod -R 755 /mnt/elitecloud/pbj-*
```

### "Frontend can't reach backend"
```bash
# Check FRONTEND_URL in .env
# Should be: http://localhost:9001

# Check backend is responding
curl http://localhost:5000/health

# Check container network
docker network inspect pbj_default
```

---

## Development vs Production

### Development Mode
```bash
# .env
NODE_ENV=development
```
- Detailed logs
- Source maps
- No minification
- Faster rebuilds

### Production Mode
```bash
# .env
NODE_ENV=production
```
- Optimized builds
- Minified code
- Production logs only
- Performance optimized

---

## Advanced Configuration

### Scale Backend (Multiple Instances)
```yaml
backend:
  deploy:
    replicas: 3  # Run 3 instances
```

### Use External Database
Comment out `db` service and set:
```
DB_HOST=your-external-db.com
DB_USER=external_user
DB_PASSWORD=external_password
```

### Custom Network
```yaml
networks:
  pbj-network:
    driver: bridge

services:
  db:
    networks:
      - pbj-network
  backend:
    networks:
      - pbj-network
```

---

## Monitoring

### Container Stats
```bash
docker stats
```

### Container Inspection
```bash
docker inspect pbj-backend
```

### Network Inspection
```bash
docker network inspect pbj_default
```

---

## Maintenance

### Regular Backups
```bash
# Daily backup
0 2 * * * docker exec pbj-postgres pg_dump -U pbj_user pbj_db > /backups/pbj_$(date +\%Y\%m\%d).sql
```

### Log Rotation
```bash
# Keep only last 100MB of logs
docker-compose logs --tail=0 > /dev/null
```

### Cleanup Old Images
```bash
docker image prune -a
```

---

## Next Steps

1. ✅ Set up .env file
2. ✅ Run `docker-compose up`
3. ✅ Test at http://localhost:9001
4. ✅ Test register/login/profile
5. ✅ Check database: `docker exec -it pbj-postgres psql -U pbj_user -d pbj_db`

Everything is containerized and ready to deploy! 🚀
