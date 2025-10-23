# Backend API Endpoint Setup

This shows how to set up your backend to receive and store the creator profile data.

## Node.js/Express Example

```javascript
// routes/api/creator-profile.js
import express from 'express'
import { authenticateUser } from '../middleware/auth.js'
import { db } from '../db/connection.js'

const router = express.Router()

// POST /api/creator-profile
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { 
      user_id, 
      user_name, 
      auth_token, 
      timestamp,
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

    // Validate required fields
    if (!user_id || !name || !whatYouDo || !categories) {
      return res.status(400).json({
        message: 'Missing required fields'
      })
    }

    // Validate user owns this profile
    if (req.user.id !== user_id) {
      return res.status(403).json({
        message: 'Unauthorized'
      })
    }

    // Insert or update profile in database
    const query = `
      INSERT INTO creator_profiles (
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
      RETURNING *
    `

    const values = [
      user_id,
      name,
      whatYouDo,
      categories,
      JSON.stringify(brandSound), // Store arrays as JSON
      scriptStyle,
      JSON.stringify(contentFormats),
      inspiration || null,
      disagreements || null,
      turnoffs || null,
      faqs || null,
      myths || null,
      avoidTopics || null,
      new Date(timestamp)
    ]

    const result = await db.query(query, values)

    res.status(201).json({
      success: true,
      message: 'Profile saved successfully',
      data: result.rows[0]
    })

  } catch (error) {
    console.error('Profile save error:', error)
    res.status(500).json({
      message: 'Failed to save profile',
      error: error.message
    })
  }
})

// GET /api/creator-profile (retrieve user's profile)
router.get('/', authenticateUser, async (req, res) => {
  try {
    const query = `
      SELECT * FROM creator_profiles 
      WHERE user_id = $1
    `
    
    const result = await db.query(query, [req.user.id])
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Profile not found'
      })
    }

    res.json({
      success: true,
      data: result.rows[0]
    })

  } catch (error) {
    console.error('Profile fetch error:', error)
    res.status(500).json({
      message: 'Failed to fetch profile'
    })
  }
})

export default router
```

## Python/FastAPI Example

```python
# routers/creator_profile.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from models import CreatorProfile, User
from database import get_db
from auth import get_current_user
from schemas import CreatorProfileSchema

router = APIRouter(prefix="/api/creator-profile", tags=["creator-profile"])

@router.post("/")
def create_creator_profile(
    profile_data: CreatorProfileSchema,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Save or update creator profile"""
    
    try:
        # Check if profile already exists
        existing = db.query(CreatorProfile).filter(
            CreatorProfile.user_id == current_user.id
        ).first()
        
        profile_dict = {
            "user_id": current_user.id,
            "name": profile_data.name,
            "what_you_do": profile_data.whatYouDo,
            "categories": profile_data.categories,
            "brand_sound": profile_data.brandSound,  # Stores as JSON
            "script_style": profile_data.scriptStyle,
            "content_formats": profile_data.contentFormats,
            "inspiration": profile_data.inspiration,
            "disagreements": profile_data.disagreements,
            "turnoffs": profile_data.turnoffs,
            "faqs": profile_data.faqs,
            "myths": profile_data.myths,
            "avoid_topics": profile_data.avoidTopics,
            "submitted_at": datetime.fromisoformat(profile_data.timestamp),
            "updated_at": datetime.now()
        }
        
        if existing:
            # Update existing
            for key, value in profile_dict.items():
                setattr(existing, key, value)
            db.commit()
            return {"success": True, "message": "Profile updated", "data": existing}
        else:
            # Create new
            new_profile = CreatorProfile(**profile_dict)
            db.add(new_profile)
            db.commit()
            db.refresh(new_profile)
            return {"success": True, "message": "Profile created", "data": new_profile}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/")
def get_creator_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's creator profile"""
    
    profile = db.query(CreatorProfile).filter(
        CreatorProfile.user_id == current_user.id
    ).first()
    
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    return {"success": True, "data": profile}
```

## Database Setup (PostgreSQL)

```sql
-- Create table
CREATE TABLE creator_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL UNIQUE,
  
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

-- Indexes for performance
CREATE INDEX idx_creator_profiles_user_id ON creator_profiles(user_id);
CREATE INDEX idx_creator_profiles_created_at ON creator_profiles(created_at);
CREATE INDEX idx_creator_profiles_submitted_at ON creator_profiles(submitted_at);
```

## n8n Webhook Integration (Alternative)

If you want to send to n8n instead of your own backend:

### In CreatorProfileForm.vue, change the endpoint:

```javascript
// Option A: Send to n8n webhook (no backend needed)
const response = await fetch(
  `${import.meta.env.VITE_N8N_WEBHOOK_URL}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }
)

// Option B: Send to your backend (backend forwarding to n8n)
const response = await fetch('/api/creator-profile', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  },
  body: JSON.stringify(payload)
})
```

### .env.local (if using n8n directly)

```
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/WEBHOOK-ID
```

---

## Recommended Architecture

```
Vue Form
  ↓
Backend API (/api/creator-profile)
  ├─ Save to Database
  ├─ Trigger n8n Webhook
  └─ Return Success
       ↓
    [Database] + [n8n Workflow]
```

This way you have:
- ✅ All data stored in your database (single source of truth)
- ✅ Tenant/user isolation (multi-tenant safe)
- ✅ Can reference profile data anytime
- ✅ n8n can trigger workflows based on new profiles
- ✅ Can add more workflows later without code changes
