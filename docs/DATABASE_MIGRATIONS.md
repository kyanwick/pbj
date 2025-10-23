# Database Schema Changes & Migrations

How to modify the database schema and run migrations.

## Quick Migration

After making changes to your database schema in `backend/scripts/migrate.js`:

```bash
cd /home/kyanwick/saas
./migrate.sh
```

This will:
1. Check if backend is running
2. Run all migrations
3. Display the status

## Manual Migration (if needed)

If the script doesn't work or you want to migrate specific changes:

```bash
cd /home/kyanwick/saas/backend
node scripts/migrate.js
```

## Workflow: Making Schema Changes

### Step 1: Update the Migration File
Edit `/home/kyanwick/saas/backend/scripts/migrate.js`:

```javascript
export const runMigrations = async () => {
  try {
    console.log('🔄 Running database migrations...')
    
    // Example: Add a new table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS new_table (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)
    
    // Example: Add a column to existing table
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN phone VARCHAR(20)
      CONSTRAINT phone_unique UNIQUE;
    `)
    
    console.log('✅ Migrations completed successfully')
  } catch (err) {
    console.error('❌ Migration error:', err)
    throw err
  }
}
```

### Step 2: Run the Migration
```bash
./migrate.sh
```

### Step 3: Verify Changes
```bash
# Connect to database
docker exec -it pbj-postgres psql -U pbj_user -d pbj_db

# View tables
\dt

# View table schema
\d table_name

# Exit
\q
```

## Common Schema Operations

### Add a New Table
```javascript
await pool.query(`
  CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )
`)
```

### Add a Column
```javascript
await pool.query(`
  ALTER TABLE users 
  ADD COLUMN bio TEXT
`)
```

### Drop a Column
```javascript
await pool.query(`
  ALTER TABLE users 
  DROP COLUMN phone
`)
```

### Add an Index (for performance)
```javascript
await pool.query(`
  CREATE INDEX IF NOT EXISTS idx_posts_user_id 
  ON posts(user_id)
`)
```

### Add a Unique Constraint
```javascript
await pool.query(`
  ALTER TABLE users 
  ADD CONSTRAINT email_unique UNIQUE(email)
`)
```

## Safe Migration Practices

✅ **Do:**
- Always use `IF NOT EXISTS` or `IF EXISTS` to make migrations idempotent
- Test migrations locally first
- Keep migration changes small and focused
- Document what each migration does

❌ **Don't:**
- Use `DROP TABLE` without a backup
- Run migrations that might lose data without testing
- Modify the migration script while it's running
- Forget to update seed data if schema changes

## Troubleshooting

**Migration failed with "relation does not exist"?**
- Check if the table you're referencing exists
- Make sure you created it in an earlier migration
- Run migrations in the correct order

**"Column already exists" error?**
- Use `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`
- Or check if the column was already added in a previous migration

**Want to reset everything?**
```bash
# WARNING: This deletes all data!
docker compose down -v
rm -rf /mnt/elitecloud/pbj-db/*
docker compose up -d db
cd backend && npm start  # Re-runs migrations automatically
```

## Current Database Schema

### users table
```sql
id UUID PRIMARY KEY
name VARCHAR(255) NOT NULL
email VARCHAR(255) NOT NULL UNIQUE
password VARCHAR(255) NOT NULL
created_at TIMESTAMP
updated_at TIMESTAMP
```

### creator_profiles table
```sql
user_id UUID PRIMARY KEY (FK → users.id)
bio TEXT
niche VARCHAR(255)
target_audience VARCHAR(255)
content_types VARCHAR(255)
posting_frequency VARCHAR(255)
created_at TIMESTAMP
updated_at TIMESTAMP
```

---

**Last updated:** October 23, 2025
