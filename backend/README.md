# PB+J Backend Project Structure

```
backend/
├── config/
│   └── database.js              # PostgreSQL connection pool
├── middleware/
│   └── auth.js                  # JWT token generation & verification
├── routes/
│   ├── auth.js                  # Login & register endpoints
│   └── profiles.js              # Creator profile CRUD endpoints
├── scripts/
│   ├── migrate.js               # Database schema setup
│   └── seed.js                  # Test data seeding
├── server.js                    # Express app & routes
├── package.json                 # Dependencies
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── SETUP.md                     # Setup instructions
└── README.md                    # This file
```

## Key Files

### server.js
Main Express application with route handlers and middleware setup.

### config/database.js
PostgreSQL connection pool using `pg` library. Manages database connections.

### middleware/auth.js
JWT token handling:
- `generateToken(userId)` - Create JWT token
- `verifyToken(token)` - Validate JWT token
- `authenticateUser` - Express middleware to protect routes

### routes/auth.js
Authentication endpoints:
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate existing user

### routes/profiles.js
Creator profile endpoints (all require authentication):
- `POST /api/creator-profile` - Create/update profile
- `GET /api/creator-profile` - Retrieve user's profile
- `PUT /api/creator-profile` - Update existing profile

### scripts/migrate.js
Runs on startup to create database tables and indexes.

### scripts/seed.js
Populates test data for development.

## Database Schema

### users
```sql
- id (UUID, primary key)
- name (VARCHAR)
- email (VARCHAR, unique)
- password (VARCHAR, hashed)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### creator_profiles
```sql
- id (UUID, primary key)
- user_id (UUID, foreign key → users.id, unique)
- name, what_you_do, categories (text fields)
- brand_sound, content_formats (JSONB arrays)
- scriptStyle, inspiration (text fields)
- disagreements, turnoffs, faqs, myths, avoid_topics (text fields)
- created_at, updated_at, submitted_at (TIMESTAMP)
```

## Environment Variables

```
NODE_ENV              # development | production
PORT                  # API port (default: 5000)
DATABASE_URL          # PostgreSQL connection string
JWT_SECRET            # Secret key for signing tokens
FRONTEND_URL          # CORS allowed origin
```
