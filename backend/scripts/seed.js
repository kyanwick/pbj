import bcryptjs from 'bcryptjs'
import { query } from '../config/database.js'

export const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding database...')

    // Clear existing data
    await query('DELETE FROM creator_profiles')
    await query('DELETE FROM users')

    // Create test user
    const hashedPassword = await bcryptjs.hash('password', 10)
    
    const userResult = await query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      ['Demo User', 'demo@example.com', hashedPassword]
    )

    const userId = userResult.rows[0].id

    // Create test profile
    await query(
      `INSERT INTO creator_profiles (
        user_id,
        name,
        what_you_do,
        categories,
        brand_sound,
        script_style,
        content_formats,
        inspiration,
        disagreements,
        turnoffs,
        faqs,
        myths,
        avoid_topics,
        submitted_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())`,
      [
        userId,
        'Demo',
        'I help creators build their personal brand with authentic content',
        '• Content Creation\n• Personal Branding\n• Social Media\n• Authenticity\n• Creator Economy',
        JSON.stringify(['Playful', 'Relatable', 'Educational']),
        'Hybrid',
        JSON.stringify(['Voiceover', 'Talking head', 'Explainers']),
        'Gary Vee, Ali Abdaal, Mr Beast',
        'Everyone says you need to post every day. Quality > Quantity always.',
        'Fake personalities, overly edited content, constant self-promotion',
        '• How do I find my niche?\n• Can I use trending sounds?\n• How often should I post?',
        '• Viral videos guarantee success\n• You need expensive equipment\n• You must be on every platform',
        'Political controversy, explicit content'
      ]
    )

    console.log('✅ Seed data loaded successfully')
    console.log('📧 Test User: demo@example.com')
    console.log('🔑 Test Password: password')
  } catch (error) {
    console.error('❌ Seed error:', error)
    // Don't exit - seed errors shouldn't stop the server
  }
}

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
}
