# Creator Profile Form - Sample Output

This is the exact JSON structure sent to the database when a user completes their profile.

## Sample Payload

```json
{
  "user_id": "user_123",
  "user_name": "Sarah Chen",
  "auth_token": "mock_token_1698076800000",
  "timestamp": "2025-10-23T14:30:00.000Z",
  
  "name": "Sarah",
  "whatYouDo": "I'm a fitness coach who helps busy moms get strong without spending hours at the gym",
  "categories": "• Strength training\n• Meal prep\n• Time management\n• Mindset\n• Habit formation",
  
  "brandSound": [
    "Playful (fun, lighthearted, witty)",
    "Relatable (real, down-to-earth, \"one of us\")",
    "Educational (clear, teaching-focused, informative)"
  ],
  
  "scriptStyle": "Hybrid",
  
  "contentFormats": [
    "Voiceover (audio over footage, clips, or slides)",
    "Talking head (straight-to-camera, classic style)",
    "Explainers (breaking down a topic, using props or visuals)",
    "Multitasking (talking while doing something—cooking, working, etc.)"
  ],
  
  "inspiration": "Alex Hormozi, Brené Brown, Mel Robbins",
  
  "disagreements": "Everyone says you need to work out 5 days a week. That's unrealistic for most busy moms. I believe in quality over quantity - 3 focused 30-minute sessions beat 5 mediocre ones.",
  
  "turnoffs": "Overly polished fitness influencers who don't show the struggle. Toxic 'all-in' culture that makes people feel bad for having a life. Gatekeeping nutrition info.",
  
  "faqs": "• How do I start strength training with no equipment?\n• Can I get results with only 30 minutes a day?\n• What should I eat to build muscle?\n• How do I stay consistent when I'm exhausted?",
  
  "myths": "• Myth: You need to spend 2 hours at the gym to see results\n• Myth: Carbs are bad for you\n• Myth: You need a perfect diet to build muscle\n• Myth: Women get bulky if they lift weights",
  
  "avoidTopics": "Eating disorders, extreme dieting methods, dangerous supplement promotion"
}
```

## Field Reference Guide

| Field | Type | Max Length | Required | Notes |
|-------|------|-----------|----------|-------|
| `user_id` | String | 255 | Yes | Unique identifier for the user/tenant |
| `user_name` | String | 255 | Yes | User's display name from login |
| `auth_token` | String | 500 | Yes | Authentication token for validation |
| `timestamp` | ISO 8601 | - | Yes | When profile was submitted |
| `name` | String | 100 | Yes | First name or display name |
| `whatYouDo` | Text | 500 | Yes | One-sentence description of their niche |
| `categories` | Text | 1000 | Yes | Bullet-point list of topics (newline-separated) |
| `brandSound` | Array | 3 items max | Yes | 1-3 selected brand voice options |
| `scriptStyle` | String | - | Yes | One of: "Templated", "Guided", "Hybrid" |
| `contentFormats` | Array | - | Yes | 1+ content format selections |
| `inspiration` | Text | 500 | No | Names of inspiring creators/brands |
| `disagreements` | Text | 1500 | No | Industry disagreements (4-5 sentences) |
| `turnoffs` | Text | 1500 | No | Creator behaviors to avoid (4-5 sentences) |
| `faqs` | Text | 1500 | No | Bullet-point list of common questions |
| `myths` | Text | 1500 | No | Bullet-point list of industry myths |
| `avoidTopics` | Text | 500 | No | Topics to stay away from |

## Database Schema (Recommended)

```sql
CREATE TABLE creator_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL UNIQUE,
  
  -- Who You Are
  name VARCHAR(100) NOT NULL,
  what_you_do TEXT NOT NULL,
  categories TEXT NOT NULL,
  
  -- Your Voice
  brand_sound JSONB NOT NULL,  -- Array of strings
  script_style VARCHAR(50) NOT NULL,
  content_formats JSONB NOT NULL,  -- Array of strings
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

-- Index for fast lookups
CREATE INDEX idx_creator_profiles_user_id ON creator_profiles(user_id);
CREATE INDEX idx_creator_profiles_created_at ON creator_profiles(created_at);
```

## n8n Workflow Input Fields

When you create your n8n workflow, you'll receive this entire JSON object. Use these fields:

**For Content Generation:**
- `whatYouDo` - Your niche
- `categories` - Your topics
- `brandSound` - Tone/voice preferences
- `scriptStyle` - How you like to work
- `contentFormats` - What you can create

**For Personalization:**
- `inspiration` - Creator influences
- `disagreements` - Your unique take
- `faqs` - Common questions to answer
- `myths` - Myths to debunk
- `avoidTopics` - Stay away from these

**For User Management:**
- `user_id` - Identify the creator
- `name` - Personalization
- `timestamp` - When they set up
- `auth_token` - Validate request

## Example n8n Usage

In n8n, you can access fields like:
```
{{ $json.whatYouDo }}
{{ $json.brandSound[0] }}
{{ $json.categories }}
```

Use these to generate personalized content ideas, populate templates, or trigger downstream workflows.
