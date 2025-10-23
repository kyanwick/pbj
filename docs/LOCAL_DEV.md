# Local Development Quick Start

## 🚀 Quick Start (Recommended)

Just run this one command to start everything:

```bash
cd <project-directory>
./dev.sh
```

This will:
1. ✅ Start PostgreSQL database in Docker
2. ✅ Start your backend on http://localhost:5000
3. ✅ Start your frontend on http://localhost:9001
4. ✅ Display test credentials and URLs

Then open http://localhost:9001 in your browser!

---

## Or: Manual Setup (if you prefer more control)

### One-time setup

```bash
# Clone/navigate to project
cd <project-directory>

# Backend: create .env.local for local dev
cat > backend/.env.local << 'EOF'
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pbj_db
DB_USER=pbj_user
DB_PASSWORD=pbj_secure_password_2024
FRONTEND_URL=http://localhost:9001
JWT_SECRET=local_dev_secret_12345
NODE_ENV=development
PORT=5000
EOF

echo "✅ Created backend/.env.local"

# Frontend: install deps
npm install

# Backend: install deps
cd backend
npm install

echo "✅ Setup complete! Ready to start developing."
```

**Note:** The `.env.local` file tells your local backend how to connect to Postgres running in Docker. It uses `localhost` instead of `db` (the container name used in production).

## Every time you want to code locally

### Terminal 1: Start Postgres (in Docker)
```bash
cd <project-directory>
docker compose up -d db
# Wait ~5 sec for it to be ready
# Verify: docker ps | grep postgres should show healthy
```

### Terminal 2: Start backend (locally on your machine)

**First time only:**
```bash
cd <project-directory>/backend
node scripts/migrate.js    # Create database tables
node scripts/seed.js       # Insert demo user (optional, skip if you want to register your own)
npm start
```

**After that, just:**
```bash
cd <project-directory>/backend
npm start
# or with auto-reload on code changes:
npx nodemon server.js
```

⚠️ **Important:** This runs on your LOCAL machine, not in Docker. Backend listens on `http://localhost:5000`

### Terminal 3: Start frontend dev server (locally on your machine)
```bash
cd <project-directory>
npm run dev
# Open http://localhost:9001 when ready
# It automatically proxies /api/* to http://localhost:5000
```

## Test credentials
- Email: demo@example.com
- Password: password

## Quick commands

Check backend health:
```bash
curl http://localhost:5000/api/health
```

**Only run these if you change the database schema or want fresh test data:**

Reset database (wipes all data and reseeds):
```bash
# ⚠️ THIS DELETES ALL DATA IN THE DATABASE
docker compose down -v
rm -rf /mnt/elitecloud/pbj-db/*
docker compose up -d db
docker exec pbj-backend node scripts/migrate.js
docker exec pbj-backend node scripts/seed.js
```

View backend logs:
```bash
# If running with npm start, logs print to console
# Or in another terminal:
docker logs pbj-postgres -f
```

## What frontend uses locally
- Frontend dev server runs on http://localhost:9001
- Quasar has a **dev proxy** configured in `quasar.config.js` that forwards `/api/*` requests to http://localhost:5000
- So your app code already works with `/api/auth/login`, `/api/health`, etc.
- **No need to manually set API URLs** - just use relative `/api` paths

## When you're done
```bash
# Stop all containers
docker compose down

# (or keep them running for next session)
```

## Common issues

**Frontend loading forever / hanging?**
- Make sure backend is running: `curl http://localhost:5000/api/health`
- If that fails, start backend in Terminal 2: `cd <project-directory>/backend && npm start`
- The frontend waits for the backend to respond before loading

**Migration error: "password authentication failed for user pbj_user"?**
- Ensure `.env.local` exists in the `backend/` folder with the correct password
- Check that `DB_HOST=localhost` (NOT `db` which is only for Docker containers)
- Verify PostgreSQL is running: `docker compose up -d db`
- Wait 5 seconds after starting db before running migrations
- Password should be: `pbj_secure_password_2024`

**Can't connect to backend?**
- Check backend is running locally: `curl http://localhost:5000/api/health`
- If not listening, make sure you ran `npm start` in Terminal 2 (not just Docker)
- Check DB is running: `docker ps | grep postgres`

**Port already in use?**
- 5432 (Postgres): `lsof -i :5432`
- 5000 (backend): `lsof -i :5000`
- 9001 (frontend): `lsof -i :9001`

**Database auth failed?**
- Ensure .env.local password matches .env in the project root
- Current password: `pbj_secure_password_2024`

**CSS/assets not loading in dev?**
- Clear browser cache or hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
- Check quasar.config.js for any proxy config issues
