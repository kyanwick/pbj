import bcryptjs from 'bcryptjs'
import { query } from '../config/database.js'
import { generateToken } from '../middleware/auth.js'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Check if user exists
    const userExists = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10)

    // Create user
    const result = await query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    )

    const user = result.rows[0]
    const token = generateToken(user.id)

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        token
      }
    })
  } catch (error) {
    console.error('Register error:', error)
    const message = process.env.NODE_ENV === 'production' 
      ? 'Registration failed' 
      : `Registration failed: ${error.message}`
    res.status(500).json({ message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' })
    }

    // Find user
    const result = await query(
      'SELECT id, name, email, password FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const user = result.rows[0]

    // Compare password
    const passwordMatch = await bcryptjs.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Generate token
    const token = generateToken(user.id)

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        token
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    const message = process.env.NODE_ENV === 'production' 
      ? 'Login failed' 
      : `Login failed: ${error.message}`
    res.status(500).json({ message })
  }
}

export default { register, login }
