import { query } from '../config/database.js'

const createTablesSQL = `
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creator profiles table
CREATE TABLE IF NOT EXISTS creator_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  
  -- Who You Are
  name VARCHAR(100) NOT NULL,
  what_you_do TEXT NOT NULL,
  categories TEXT NOT NULL,
  
  -- Your Voice
  brand_sound JSONB NOT NULL,
  script_style VARCHAR(50) NOT NULL,
  content_formats JSONB NOT NULL,
  inspiration TEXT,
  
  -- Your Edge
  disagreements TEXT,
  turnoffs TEXT,
  
  -- Your Topics
  faqs TEXT,
  myths TEXT,
  avoid_topics TEXT,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  submitted_at TIMESTAMP NOT NULL,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_creator_profiles_user_id ON creator_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_creator_profiles_created_at ON creator_profiles(created_at);
CREATE INDEX IF NOT EXISTS idx_creator_profiles_submitted_at ON creator_profiles(submitted_at);

-- Extension for UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
`

export const runMigrations = async () => {
  try {
    console.log('🔄 Running database migrations...')
    
    const statements = createTablesSQL.split(';').filter(s => s.trim())
    
    for (const statement of statements) {
      if (statement.trim()) {
        await query(statement)
      }
    }
    
    console.log('✅ Migrations completed successfully')
    return true
  } catch (error) {
    console.error('❌ Migration error:', error.message)
    return false
  }
}

// Run migrations if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations()
}
