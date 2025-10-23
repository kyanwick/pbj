# Scripts Reference

Quick reference for all available scripts in the project.

## 🚀 Development

### `./dev.sh`
Start everything locally for development.

```bash
cd <project-directory>
./dev.sh
```

**What it does:**
- Starts PostgreSQL database in Docker
- Starts backend Node.js server on localhost:5000
- Starts frontend Quasar dev server on localhost:9001
- Shows URLs and test credentials

**Keyboard:**
- `Ctrl+C` - Stop all services

---

## 🔄 Database

### `./migrate.sh`
Run database migrations when you change the schema.

```bash
./migrate.sh
```

**What it does:**
- Checks if backend is running
- Executes all migrations from `backend/scripts/migrate.js`
- Shows status and next steps

**When to use:**
- After editing `backend/scripts/migrate.js`
- When adding new tables or columns
- When updating database structure

**See also:** [docs/DATABASE_MIGRATIONS.md](./docs/DATABASE_MIGRATIONS.md)

---

## 🌐 Production

### `./deploy.sh`
Deploy to production (builds and restarts containers).

```bash
cd <project-directory>
./deploy.sh
```

**What it does:**
- Ensures storage directories exist
- Checks environment configuration
- Stops existing containers
- Rebuilds Docker image (includes frontend build)
- Starts new containers
- Verifies deployment

**Requirements:**
- Must be on the production server
- `.env` file must be configured
- Requires `sudo` (runs docker commands)

**After deployment:**
- App available at https://pb.kyanoberas.com
- Check logs: `docker-compose logs -f web`
- Rollback: `docker-compose restart`

---

## 📋 Summary

| Script | Purpose | When to Use |
|--------|---------|-----------|
| `./dev.sh` | Local development | Every time you want to code |
| `./migrate.sh` | Run migrations | After changing database schema |
| `./deploy.sh` | Production deployment | When ready to deploy changes |

---

## 🎯 Typical Workflow

### Local Development
```bash
./dev.sh                    # Start everything
# Make code changes, see hot reload
Ctrl+C                      # Stop when done
```

### Database Changes
```bash
# Edit backend/scripts/migrate.js
./migrate.sh               # Apply changes
# Restart backend if needed
```

### Deploy to Production
```bash
git push                   # Commit and push changes
ssh your-server           # SSH to production server
cd ~/saas
git pull                   # Pull latest changes
./deploy.sh               # Deploy!
```

---

**Last updated:** October 23, 2025
