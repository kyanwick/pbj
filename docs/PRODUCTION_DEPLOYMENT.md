# Production Deployment Guide for PBJ

## Prerequisites

- Ubuntu 20.04+ server
- Docker & Docker Compose installed
- Domain: pb.kyanoberas.com pointing to server IP
- SSL certificate from Let's Encrypt (or certificate provider)
- `/mnt/elitecloud/` directory with proper permissions

---

## Step 1: Generate Secure Secrets

```bash
# Generate secure database password (32 bytes)
DB_PASSWORD=$(openssl rand -base64 32)
echo "DB_PASSWORD=$DB_PASSWORD"

# Generate secure JWT secret
JWT_SECRET=$(openssl rand -base64 32)
echo "JWT_SECRET=$JWT_SECRET"
```

Keep these values safe! You'll use them in the next step.

---

## Step 2: Configure Environment Variables

Edit `.env.production` with your secrets:

```bash
cd /home/kyanwick/saas/saas
nano .env.production
```

Replace these placeholders:
```
DB_PASSWORD=<paste_database_password_here>
JWT_SECRET=<paste_jwt_secret_here>
```

---

## Step 3: Set Up SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx -y

# Generate certificate
sudo certbot certonly --standalone \
  -d pb.kyanoberas.com \
  --non-interactive --agree-tos --email your-email@example.com

# Verify certificate was created
ls -la /etc/letsencrypt/live/pb.kyanoberas.com/
```

---

## Step 4: Set Up Storage Directories

```bash
# Create storage directories
sudo mkdir -p /mnt/elitecloud/pbj-db \
  /mnt/elitecloud/pbj-storage/brand_kits \
  /mnt/elitecloud/pbj-storage/scheduled_posts \
  /mnt/elitecloud/pbj-storage/media \
  /mnt/elitecloud/pbj-storage/generated_history \
  /mnt/elitecloud/pbj-storage/archive \
  /mnt/elitecloud/pbj-logs

# Set proper permissions
sudo chmod 755 /mnt/elitecloud/pbj-db
sudo chmod 755 /mnt/elitecloud/pbj-storage
sudo chmod 755 /mnt/elitecloud/pbj-logs

# Verify
ls -la /mnt/elitecloud/
```

---

## Step 5: Configure Nginx Reverse Proxy

```bash
# Copy Nginx configuration to system
sudo cp /home/kyanwick/saas/saas/nginx.conf /etc/nginx/sites-available/pbj

# Enable site
sudo ln -s /etc/nginx/sites-available/pbj /etc/nginx/sites-enabled/pbj

# Disable default site (if needed)
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Start Nginx
sudo systemctl restart nginx

# Enable on boot
sudo systemctl enable nginx
```

---

## Step 6: Build and Start Docker Services

```bash
cd /home/kyanwick/saas/saas

# Build Docker image (first time only)
docker-compose -f docker-compose.yml build

# Start services in background
docker-compose -f docker-compose.yml up -d

# Verify all services are running
docker-compose ps

# Check logs
docker-compose logs -f backend
docker-compose logs -f db
docker-compose logs -f web
```

---

## Step 7: Verify Deployment

```bash
# Check if services are healthy
docker-compose ps

# Test backend API
curl http://localhost:5000/health

# Check database connectivity
docker exec -it pbj-postgres psql -U pbj_user -d pbj_db -c "\dt"

# Test HTTPS connection
curl -I https://pb.kyanoberas.com

# Test registration endpoint
curl -X POST https://pb.kyanoberas.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

---

## Step 8: Set Up Automated Backups

Create backup script `/opt/pbj-backup.sh`:

```bash
#!/bin/bash

BACKUP_DIR="/mnt/elitecloud/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
docker exec pbj-postgres pg_dump -U pbj_user pbj_db | gzip > $BACKUP_DIR/db_$TIMESTAMP.sql.gz

# Backup storage
tar -czf $BACKUP_DIR/storage_$TIMESTAMP.tar.gz /mnt/elitecloud/pbj-storage/

# Keep only last 30 days of backups
find $BACKUP_DIR -type f -mtime +30 -delete

echo "Backup completed: $TIMESTAMP"
```

Make executable and add to crontab:

```bash
chmod +x /opt/pbj-backup.sh

# Run daily at 2 AM
0 2 * * * /opt/pbj-backup.sh >> /var/log/pbj-backup.log 2>&1
```

---

## Step 9: Set Up Monitoring & Alerts

```bash
# Monitor Docker logs
sudo journalctl -u docker -f

# Check disk space
df -h /mnt/elitecloud/

# Monitor resource usage
docker stats

# Set up email alerts (optional)
# - Monitor service restarts
# - Alert on high disk usage
# - Alert on database connection failures
```

---

## Step 10: SSL Certificate Auto-Renewal

```bash
# Test renewal
sudo certbot renew --dry-run

# Auto-renewal (runs twice daily)
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Verify
sudo systemctl status certbot.timer
```

---

## Security Checklist

- [x] Database password generated securely (32 bytes random)
- [x] JWT secret generated securely (32 bytes random)
- [x] Database only accessible on 127.0.0.1:5432 (local only)
- [x] Backend not directly exposed (reverse proxy only)
- [x] HTTPS/TLS enabled with modern ciphers
- [x] Security headers configured (HSTS, CSP, X-Frame-Options, etc.)
- [x] Rate limiting enabled (general + API endpoints)
- [x] CORS restricted to pb.kyanoberas.com only
- [x] Nginx reverse proxy in place
- [x] SSL certificate auto-renewal configured
- [x] Firewall rules configured (80, 443 only exposed)
- [x] Storage directories have proper permissions
- [x] Database backups automated daily
- [x] Environment variables in .env.production (not in git)
- [x] NODE_ENV set to production
- [x] Health checks configured for all services
- [x] Logs accessible and monitored

---

## Troubleshooting

### Containers won't start
```bash
# Check logs
docker-compose logs backend
docker-compose logs db

# Verify .env.production exists and has correct values
cat .env.production
```

### Database connection errors
```bash
# Check if database is healthy
docker-compose ps

# Test database connection
docker exec -it pbj-postgres psql -U pbj_user -d pbj_db
```

### SSL certificate issues
```bash
# Check certificate validity
sudo certbot certificates

# Renew certificate
sudo certbot renew --force-renewal
```

### Nginx errors
```bash
# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Check logs
sudo tail -f /var/log/nginx/pbj_error.log
```

---

## Rollback Procedure

If something goes wrong:

```bash
# Stop all services
docker-compose down

# Restore database from backup
zcat /mnt/elitecloud/backups/db_<TIMESTAMP>.sql.gz | \
  docker exec -i pbj-postgres psql -U pbj_user pbj_db

# Restore storage
tar -xzf /mnt/elitecloud/backups/storage_<TIMESTAMP>.tar.gz -C /

# Start services again
docker-compose up -d
```

---

## Maintenance Tasks

**Weekly:**
- Check disk space: `df -h /mnt/elitecloud/`
- Review error logs: `docker-compose logs --tail=100`
- Monitor database size: `docker exec pbj-postgres psql -U pbj_user pbj_db -c "SELECT pg_size_pretty(pg_database_size('pbj_db'));"`

**Monthly:**
- Update Docker images: `docker pull postgres:15-alpine node:20`
- Review security headers: `curl -I https://pb.kyanoberas.com`
- Test disaster recovery (restore from backup)

**Quarterly:**
- Security audit
- Performance review
- Update dependencies

---

## Support & Documentation

- Docker Compose: https://docs.docker.com/compose/
- Nginx: https://nginx.org/en/docs/
- PostgreSQL: https://www.postgresql.org/docs/
- Let's Encrypt: https://letsencrypt.org/docs/
- Express.js: https://expressjs.com/
- Quasar: https://quasar.dev/

