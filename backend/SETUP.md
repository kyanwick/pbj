# PB+J Backend Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
cd /home/kyanwick/saas/backend
npm install
```

### 2. Set Up PostgreSQL Database

#### Option A: Using Docker (Easiest)

```bash
docker run --name pbj-postgres \
  -e POSTGRES_USER=pbj_user \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=pbj_db \
  -p 5432:5432 \
  -d postgres:15
```

#### Option B: Install PostgreSQL Locally

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
createuser pbj_user
createdb -U pbj_user pbj_db
```

**Ubuntu/Debian:**
```bash
sudo apt install postgresql postgresql-contrib
sudo -u postgres createuser pbj_user
sudo -u postgres createdb -O pbj_user pbj_db
```

**Windows:**
- Download from: https://www.postgresql.org/download/windows/
- Create user and database during installation

### 3. Configure Environment

Copy `.env.example` to `.env.local` and update values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
DATABASE_URL=postgresql://pbj_user:your_password@localhost:5432/pbj_db
JWT_SECRET=your-super-secret-key-change-this
FRONTEND_URL=http://localhost:9001
```

### 4. Run Migrations

```bash
npm run migrate
```

This creates:
- `users` table
- `creator_profiles` table
- Indexes for performance

### 5. Seed Test Data (Optional)

```bash
npm run seed
```

Test credentials:
- Email: `demo@example.com`
- Password: `password`

### 6. Start Backend

```bash
npm run dev
```

Backend runs at `http://localhost:5000`

---

## API Endpoints

### Authentication (Public)

**Register User**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Sarah Chen",
  "email": "sarah@example.com",
  "password": "securepassword"
}

Response:
{
  "success": true,
  "data": {
    "user": { "id": "...", "name": "Sarah Chen", "email": "sarah@example.com" },
    "token": "eyJhbGc..."
  }
}
```

**Login User**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "demo@example.com",
  "password": "password"
}

Response:
{
  "success": true,
  "data": {
    "user": { "id": "...", "name": "Demo", "email": "demo@example.com" },
    "token": "eyJhbGc..."
  }
}
```

### Creator Profile (Protected - Requires Bearer Token)

**Create/Update Profile**
```bash
POST /api/creator-profile
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "name": "Sarah",
  "whatYouDo": "I help busy moms get strong",
  "categories": "• Fitness\n• Wellness",
  "brandSound": ["Playful", "Relatable"],
  "scriptStyle": "Hybrid",
  "contentFormats": ["Voiceover", "Talking head"],
  "inspiration": "Alex Hormozi",
  "disagreements": "Everyone says...",
  "turnoffs": "Overly polished...",
  "faqs": "• How do I start?",
  "myths": "• Myth: You need...",
  "avoidTopics": "Eating disorders"
}

Response:
{
  "success": true,
  "message": "Profile saved successfully",
  "data": { ... profile data ... }
}
```

**Get Profile**
```bash
GET /api/creator-profile
Authorization: Bearer eyJhbGc...

Response:
{
  "success": true,
  "data": { ... profile data ... }
}
```

**Update Profile**
```bash
PUT /api/creator-profile
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{ ... same fields as create ... }

Response:
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { ... updated profile ... }
}
```

---

## Frontend Integration

Update your frontend to use the backend endpoints:

### In CreatorProfileForm.vue

```javascript
// Replace the fetch call with:
const response = await fetch('http://localhost:5000/api/creator-profile', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  },
  body: JSON.stringify(payload)
})
```

### In LoginPage.vue

```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: form.value.email,
    password: form.value.password
  })
})

const data = await response.json()
localStorage.setItem('auth_token', data.data.token)
localStorage.setItem('user_name', data.data.user.name)
```

### In RegisterPage.vue

```javascript
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: form.value.name,
    email: form.value.email,
    password: form.value.password
  })
})

const data = await response.json()
localStorage.setItem('auth_token', data.data.token)
localStorage.setItem('user_name', data.data.user.name)
```

---

## Troubleshooting

### "Cannot connect to database"
- Check PostgreSQL is running: `psql -U pbj_user -d pbj_db`
- Verify DATABASE_URL in `.env.local`

### "JWT token invalid"
- Make sure JWT_SECRET is the same in all places
- Check token hasn't expired (7 days default)

### CORS errors
- Update FRONTEND_URL in `.env.local` to match your frontend URL

### Port already in use
- Change PORT in `.env.local` or kill process: `lsof -ti:5000 | xargs kill -9`

---

## Database Backup

```bash
# Backup
pg_dump -U pbj_user pbj_db > backup.sql

# Restore
psql -U pbj_user pbj_db < backup.sql
```

---

## Next Steps

1. ✅ Start backend server
2. ✅ Update frontend to use real API endpoints
3. ✅ Test login/register flow
4. ✅ Test profile form submission
5. 🚀 Deploy backend to production
