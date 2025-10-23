# Production Deployment Checklist

## Pre-Deployment (Before going live)

### Security
- [ ] Generated secure DB password with `openssl rand -base64 32`
- [ ] Generated secure JWT secret with `openssl rand -base64 32`
- [ ] Updated `.env.production` with actual secrets (NOT defaults)
- [ ] `.env.production` is in `.gitignore` and NOT committed
- [ ] SSL certificate obtained from Let's Encrypt or provider
- [ ] Certificate installed at `/etc/letsencrypt/live/pb.kyanoberas.com/`
- [ ] Firewall configured to only allow 80, 443 (and 22 for SSH)
- [ ] Database port NOT exposed to internet (127.0.0.1:5432 only)
- [ ] Backend port NOT exposed to internet (docker network only)

### Infrastructure
- [ ] `/mnt/elitecloud/` directory created with proper permissions
- [ ] `/mnt/elitecloud/pbj-db/` created and owned by docker
- [ ] `/mnt/elitecloud/pbj-storage/` created with subdirectories
- [ ] `/mnt/elitecloud/pbj-logs/` created for log files
- [ ] Sufficient disk space available (minimum 10GB recommended)
- [ ] Docker & Docker Compose installed and working
- [ ] Nginx installed and configured
- [ ] SSL certificates auto-renewal configured

### Configuration Files
- [ ] `.env.production` configured with production values
- [ ] `docker-compose.yml` uses environment variables
- [ ] `nginx.conf` configured for pb.kyanoberas.com
- [ ] Database connection string correct
- [ ] API endpoints point to reverse proxy (`/api` not `localhost:5000`)
- [ ] CORS origin set to `https://pb.kyanoberas.com`

### Database
- [ ] PostgreSQL image tested locally
- [ ] Migrations run successfully
- [ ] Test data seeded (optional)
- [ ] Backup strategy documented
- [ ] Database backup directory created

### Backend
- [ ] `NODE_ENV` set to `production`
- [ ] JWT validation enabled
- [ ] Rate limiting configured
- [ ] Error logging configured
- [ ] Health check endpoint working (`/health`)
- [ ] Database connection string correct
- [ ] All environment variables defined

### Frontend
- [ ] Quasar build optimized: `npm run build`
- [ ] API base URL set to `/api` (relative to proxy)
- [ ] Environment variables for production set
- [ ] No console.log() or debug statements in production code
- [ ] Security headers configured in Nginx

### Testing
- [ ] All services start without errors: `docker-compose up -d`
- [ ] Health checks pass for all containers
- [ ] Database migrations run automatically on startup
- [ ] Frontend loads at https://pb.kyanoberas.com
- [ ] API endpoints accessible at /api/
- [ ] Backend health check: `curl https://pb.kyanoberas.com/health`
- [ ] SSL certificate valid and trusted
- [ ] Security headers present in responses
- [ ] Rate limiting working (test with multiple requests)

### User Testing
- [ ] Registration works: create new account
- [ ] Login works with correct credentials
- [ ] JWT token received and stored
- [ ] Profile form accessible and functional
- [ ] Profile data persists in database
- [ ] Logout works correctly
- [ ] Invalid login properly rejected
- [ ] Form validation working

### Monitoring
- [ ] Docker logs accessible and monitored
- [ ] Error alerts configured (if available)
- [ ] Disk space monitoring set up
- [ ] Database backup script tested
- [ ] Log rotation configured

---

## Deployment Steps

```bash
# 1. Generate secrets
DB_PASS=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)

# 2. Update .env.production
cd <project-directory>
nano .env.production
# Add the generated DB_PASSWORD and JWT_SECRET

# 3. Build and start services
docker-compose build
docker-compose up -d

# 4. Verify health
docker-compose ps
curl https://pb.kyanoberas.com/health

# 5. Test full user flow
# - Register new account
# - Login
# - Fill profile form
# - Verify data in database
```

---

## Post-Deployment

- [ ] Monitor logs for first 24 hours: `docker-compose logs -f backend`
- [ ] Verify backups are running daily
- [ ] Set up monitoring dashboard (if available)
- [ ] Document any custom configurations
- [ ] Train team on maintenance procedures
- [ ] Document rollback procedures
- [ ] Set up on-call alerts

---

## Ongoing Maintenance

### Daily
- Monitor application health
- Check error logs
- Verify services are running

### Weekly
- Review logs for errors
- Check disk usage: `df -h /mnt/elitecloud/`
- Verify backups completed

### Monthly
- Update Docker base images (if patches available)
- Review and optimize database queries
- Test disaster recovery (restore from backup)
- Security audit

### Quarterly
- Major version updates
- Security audit
- Performance analysis
- Capacity planning

---

## Rollback Plan

If critical issues occur:

```bash
# 1. Stop all services
docker-compose down

# 2. Restore database from backup
zcat /mnt/elitecloud/backups/db_YYYYMMDD_HHMMSS.sql.gz | \
  docker exec -i pbj-postgres psql -U pbj_user pbj_db

# 3. Restore application
# (or pull previous git commit)

# 4. Restart services
docker-compose up -d

# 5. Verify
docker-compose ps
curl https://pb.kyanoberas.com/health
```

---

## Emergency Contacts

- DevOps Lead: [Your Contact]
- Database Administrator: [Your Contact]
- Security Officer: [Your Contact]

