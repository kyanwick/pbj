import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import profileRoutes from './routes/profiles.js'
import { authenticateUser } from './middleware/auth.js'
import { runMigrations } from './scripts/migrate.js'
import { seedDatabase } from './scripts/seed.js'

dotenv.config({ path: '.env.local' })

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:9001',
  credentials: true
}))
app.use(express.json())

// Request logger to debug routing via proxy
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`)
  next()
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Auth routes (public)
app.post('/api/auth/register', authRoutes.register)
app.post('/api/auth/login', authRoutes.login)

// Creator profile routes (protected)
app.post('/api/creator-profile', authenticateUser, profileRoutes.createProfile)
app.get('/api/creator-profile', authenticateUser, profileRoutes.getProfile)
app.put('/api/creator-profile', authenticateUser, profileRoutes.updateProfile)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({ message: 'Internal server error' })
})

// Run migrations and start server
async function startServer() {
  try {
    console.log('🔄 Running database migrations...')
    await runMigrations()
    console.log('✅ Migrations completed')

    console.log('🌱 Seeding database...')
    await seedDatabase()
    console.log('✅ Database seeded')
  } catch (error) {
    console.error('❌ Migration/seed error:', error)
  }

  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`)
    console.log(`📱 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:9001'}`)
  })
}

startServer()
