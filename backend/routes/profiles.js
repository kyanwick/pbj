import { query } from '../config/database.js'

export const createProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const {
      name,
      whatYouDo,
      categories,
      brandSound,
      scriptStyle,
      contentFormats,
      inspiration,
      disagreements,
      turnoffs,
      faqs,
      myths,
      avoidTopics,
      timestamp
    } = req.body

    // Validate required fields
    if (!name || !whatYouDo || !categories) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Insert or update profile
    const result = await query(
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
        submitted_at,
        created_at,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW())
      ON CONFLICT (user_id) DO UPDATE SET
        name = $2,
        what_you_do = $3,
        categories = $4,
        brand_sound = $5,
        script_style = $6,
        content_formats = $7,
        inspiration = $8,
        disagreements = $9,
        turnoffs = $10,
        faqs = $11,
        myths = $12,
        avoid_topics = $13,
        submitted_at = $14,
        updated_at = NOW()
      RETURNING *`,
      [
        userId,
        name,
        whatYouDo,
        categories,
        JSON.stringify(brandSound),
        scriptStyle,
        JSON.stringify(contentFormats),
        inspiration || null,
        disagreements || null,
        turnoffs || null,
        faqs || null,
        myths || null,
        avoidTopics || null,
        timestamp ? new Date(timestamp) : new Date()
      ]
    )

    const profile = result.rows[0]

    res.status(201).json({
      success: true,
      message: 'Profile saved successfully',
      data: {
        ...profile,
        brand_sound: JSON.parse(profile.brand_sound),
        content_formats: JSON.parse(profile.content_formats)
      }
    })
  } catch (error) {
    console.error('Create profile error:', error)
    const message = process.env.NODE_ENV === 'production' 
      ? 'Failed to save profile' 
      : `Failed to save profile: ${error.message}`
    res.status(500).json({ message })
  }
}

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id

    const result = await query(
      'SELECT * FROM creator_profiles WHERE user_id = $1',
      [userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    const profile = result.rows[0]

    res.json({
      success: true,
      data: {
        ...profile,
        brand_sound: JSON.parse(profile.brand_sound),
        content_formats: JSON.parse(profile.content_formats)
      }
    })
  } catch (error) {
    console.error('Get profile error:', error)
    const message = process.env.NODE_ENV === 'production' 
      ? 'Failed to fetch profile' 
      : `Failed to fetch profile: ${error.message}`
    res.status(500).json({ message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const {
      name,
      whatYouDo,
      categories,
      brandSound,
      scriptStyle,
      contentFormats,
      inspiration,
      disagreements,
      turnoffs,
      faqs,
      myths,
      avoidTopics
    } = req.body

    const result = await query(
      `UPDATE creator_profiles SET
        name = $2,
        what_you_do = $3,
        categories = $4,
        brand_sound = $5,
        script_style = $6,
        content_formats = $7,
        inspiration = $8,
        disagreements = $9,
        turnoffs = $10,
        faqs = $11,
        myths = $12,
        avoid_topics = $13,
        updated_at = NOW()
      WHERE user_id = $1
      RETURNING *`,
      [
        userId,
        name,
        whatYouDo,
        categories,
        JSON.stringify(brandSound),
        scriptStyle,
        JSON.stringify(contentFormats),
        inspiration || null,
        disagreements || null,
        turnoffs || null,
        faqs || null,
        myths || null,
        avoidTopics || null
      ]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    const profile = result.rows[0]

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        ...profile,
        brand_sound: JSON.parse(profile.brand_sound),
        content_formats: JSON.parse(profile.content_formats)
      }
    })
  } catch (error) {
    console.error('Update profile error:', error)
    const message = process.env.NODE_ENV === 'production' 
      ? 'Failed to update profile' 
      : `Failed to update profile: ${error.message}`
    res.status(500).json({ message })
  }
}

export default { createProfile, getProfile, updateProfile }
