# 🚀 PB+J Backend & Frontend - Quick Start Guide

Complete backend and frontend setup for creator profile form with authentication.

## What's Been Built

✅ **Backend (Node.js/Express)**
- Authentication system (register, login, JWT)
- Creator profile API (create, read, update)
- PostgreSQL database integration
- Password hashing with bcryptjs

✅ **Frontend (Vue 3/Quasar)**
- Login page connected to backend
- Register page connected to backend
- Creator profile form connected to backend
- Token management (localStorage)

✅ **Database (PostgreSQL)**
- Users table (email, password, timestamps)
- Creator profiles table (with JSONB fields)
- Automatic migrations
- Test data seeding

---

## Installation Steps

### 1. Install PostgreSQL

**Option A: Docker (Recommended)**
```bash
docker run --name pbj-postgres \
  -e POSTGRES_USER=pbj_user \
  -e POSTGRES_PASSWORD=password123 \
  -e POSTGRES_DB=pbj_db \
  -p 5432:5432 \
  -d postgres:15
```

**Option B: macOS (Homebrew)**
```bash
brew install postgresql@15
brew services start postgresql@15
createuser pbj_user -P  # Set password: password123
createdb -U pbj_user pbj_db
```

**Option C: Ubuntu/Debian**
```bash
sudo apt install postgresql postgresql-contrib
sudo -u postgres createuser pbj_user
sudo -u postgres psql -c "ALTER USER pbj_user WITH PASSWORD 'password123';"
sudo -u postgres createdb -O pbj_user pbj_db
```

### 2. Backend Setup

```bash
# Navigate to backend
cd /home/kyanwick/saas/backend

# Copy environment file
cp .env.example .env.local

# Edit .env.local (if needed)
# DATABASE_URL=postgresql://pbj_user:password123@localhost:5432/pbj_db

# Install dependencies
npm install

# Run migrations (creates tables)
npm run migrate

# Seed test data
npm run seed

# Start backend
npm run dev
```

✅ Backend running at `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend
cd /home/kyanwick/saas/saas

# Install dependencies (if not already done)
npm install

# Start frontend
npm run dev
```

✅ Frontend running at `http://localhost:9001`

---

## Testing the System

### Test 1: Register New User

1. Go to `http://localhost:9001/#/register`
2. Fill in the form:
   - Name: Your Name
   - Email: yourname@example.com
   - Password: securepass123
   - Confirm: securepass123
3. Click "CREATE ACCOUNT"
4. ✅ Should redirect to dashboard `/lobby`

### Test 2: Login with Existing User

1. Go to `http://localhost:9001/#/login`
2. Use credentials:
   - Email: `demo@example.com`
   - Password: `password`
3. Click "SIGN IN"
4. ✅ Should redirect to dashboard `/lobby`

### Test 3: Complete Creator Profile

1. On dashboard, click "Tell Us About Yourself"
2. Fill in all sections:
   - **Who You Are**: Name, description, categories
   - **Your Voice**: Brand sounds, script style, content formats
   - **Your Edge**: Disagreements, turn-offs
   - **Your Topics**: FAQs, myths, topics to avoid
3. Click "Save Profile"
4. ✅ Should show success message and display ProfileCard on next load

### Test 4: Verify Database

```bash
# Connect to database
psql -U pbj_user -d pbj_db

# Check users table
SELECT id, name, email, created_at FROM users;

# Check profiles table
SELECT user_id, name, script_style, created_at FROM creator_profiles;
```

---

## API Endpoints

### Authentication

**Register**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah",
    "email": "sarah@example.com",
    "password": "secure123"
  }'
```

**Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "password"
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid...",
      "name": "Demo",
      "email": "demo@example.com"
    },
    "token": "eyJhbGc..."
  }
}
```

### Creator Profile

**Create/Update Profile**
```bash
curl -X POST http://localhost:5000/api/creator-profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{
    "name": "Sarah",
    "whatYouDo": "I help busy moms get strong",
    "categories": "• Fitness\n• Wellness",
    "brandSound": ["Playful", "Relatable"],
    "scriptStyle": "Hybrid",
    "contentFormats": ["Voiceover", "Talking head"],
    "inspiration": "Alex Hormozi"
  }'
```

**Get Profile**
```bash
curl -X GET http://localhost:5000/api/creator-profile \
  -H "Authorization: Bearer eyJhbGc..."
```

---

## Environment Variables

### Backend (.env.local)

```
NODE_ENV=development
PORT=5000

DATABASE_URL=postgresql://pbj_user:password123@localhost:5432/pbj_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pbj_db
DB_USER=pbj_user
DB_PASSWORD=password123

JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRE=7d

FRONTEND_URL=http://localhost:9001

DEBUG=false
```

---

## Folder Structure

```
/home/kyanwick/saas/
├── backend/                          # Node.js backend
│   ├── config/database.js           # PostgreSQL connection
│   ├── middleware/auth.js           # JWT & authentication
│   ├── routes/auth.js               # Login/register endpoints
│   ├── routes/profiles.js           # Profile CRUD endpoints
│   ├── scripts/migrate.js           # Database setup
│   ├── scripts/seed.js              # Test data
│   ├── server.js                    # Express app
│   ├── package.json
│   ├── .env.example
│   ├── SETUP.md
│   └── README.md
│
└── saas/                             # Vue frontend
    ├── src/pages/LoginPage.vue      # Login (updated)
    ├── src/pages/RegisterPage.vue   # Register (updated)
    ├── src/pages/CreatorProfileForm.vue  # Profile form (updated)
    ├── src/components/ProfileCard.vue    # Profile display
    └── ...
```

---

## Troubleshooting

### "Cannot connect to PostgreSQL"
```bash
# Check if PostgreSQL is running
psql -U pbj_user -d pbj_db -c "SELECT 1;"

# If using Docker, verify container is running
docker ps | grep pbj-postgres
```

### "Backend not responding"
```bash
# Check if backend is running
curl http://localhost:5000/health

# Check console for errors
# Make sure Node.js version is correct
node --version  # Should be v20.x.x
```

### "CORS error"
- Make sure `FRONTEND_URL` in backend `.env.local` matches your frontend URL
- Default is `http://localhost:9001`

### "Token expired"
- Tokens expire after 7 days (configurable via `JWT_EXPIRE`)
- User needs to login again
- Change in `.env.local` if needed

### "Database migration failed"
```bash
# Reset and retry
cd /home/kyanwick/saas/backend
npm run migrate
npm run seed
```

---

## Next Steps

1. **Test Everything** - Go through all test scenarios above
2. **Build n8n Workflows** - Use the profile data in n8n
3. **Add Content Generator** - Create idea generation feature
4. **Deploy Backend** - Set up production database and server
5. **Add Email Notifications** - Welcome emails, confirmations

---

## File References

- Backend Setup: `/home/kyanwick/saas/backend/SETUP.md`
- Database Schema: `/home/kyanwick/saas/PROFILE_FORM_SAMPLE_OUTPUT.md`
- Implementation Details: `/home/kyanwick/saas/BACKEND_IMPLEMENTATION.md`
- Deployment: `/home/kyanwick/saas/DEPLOYMENT_SETUP.md`

---

## Support

If you run into issues:
1. Check the error message in terminal/console
2. Review the relevant README/SETUP file
3. Check environment variables (.env.local)
4. Verify PostgreSQL is running: `psql -U pbj_user -d pbj_db`
5. Check backend is running: `curl http://localhost:5000/health`

Good luck! 🚀
