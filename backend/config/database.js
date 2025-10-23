import pg from 'pg'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

// Only load .env.local if it exists
const envLocalPath = path.resolve('.env.local')
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath })
}

const { Pool } = pg

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'pbj_db',
  user: process.env.DB_USER || 'pbj_user',
  password: process.env.DB_PASSWORD || 'changeMe'
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
})

export const query = (text, params) => pool.query(text, params)
export const getClient = () => pool.connect()

export default pool
