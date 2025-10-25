# API Security & n8n Webhook Protection

## 🔐 Overview

This document outlines security measures for protecting your n8n webhooks and API endpoints when making your codebase public.

## ⚠️ Critical: Never Commit Secrets

**NEVER commit these to git:**
- `.env` or `.env.local` files
- Actual n8n webhook URLs
- API keys or tokens
- JWT secrets
- Database passwords
- OAuth client secrets

✅ **Safe to commit:**
- `.env.example` with placeholder values
- Documentation with generic examples
- Configuration templates

---

## n8n Webhook Security

### Problem
n8n webhooks are publicly accessible URLs. If someone finds your webhook URL, they can POST data to it.

### Solutions

#### 1. **Use Webhook Authentication** (Recommended)
Configure n8n webhooks with authentication:

```javascript
// In your n8n workflow:
// Add an "HTTP Request Authentication" node before processing
// Validate a secret header:

if (headers['x-webhook-secret'] !== process.env.WEBHOOK_SECRET) {
  return { status: 401, message: 'Unauthorized' }
}
```

In your frontend code:
```javascript
const response = await fetch(process.env.VITE_N8N_WEBHOOK_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Webhook-Secret': process.env.VITE_WEBHOOK_SECRET // Stored in .env.local
  },
  body: JSON.stringify(data)
})
```

#### 2. **Use Your Backend as a Proxy** (Most Secure)
Don't expose n8n URLs to the frontend at all:

```
Frontend → Your Backend API → n8n Webhook
```

**Benefits:**
- Frontend never knows the n8n URL
- Backend validates user authentication first
- Backend can rate-limit requests
- Backend can log all webhook calls

**Implementation:**
```javascript
// backend/routes/workflows.js
import { authenticateUser } from '../middleware/auth.js'

router.post('/api/trigger-workflow', authenticateUser, async (req, res) => {
  // User is authenticated at this point
  const n8nUrl = process.env.N8N_WEBHOOK_URL // Stored in backend .env.local
  
  try {
    const response = await fetch(n8nUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET
      },
      body: JSON.stringify({
        userId: req.user.id,
        ...req.body
      })
    })
    
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: 'Workflow trigger failed' })
  }
})
```

#### 3. **IP Whitelisting** (If Using VPS)
Configure n8n or your firewall to only accept webhook calls from your server's IP:

```bash
# On your n8n server (iptables example)
iptables -A INPUT -p tcp --dport 5678 -s YOUR_SERVER_IP -j ACCEPT
iptables -A INPUT -p tcp --dport 5678 -j DROP
```

Or use n8n's environment variables:
```bash
N8N_WEBHOOK_ALLOWED_IPS=your.server.ip,another.ip
```

#### 4. **Use Temporary Webhook Tokens**
Generate short-lived tokens for webhook access:

```javascript
// backend/services/webhookTokens.js
import jwt from 'jsonwebtoken'

export function generateWebhookToken(userId) {
  return jwt.sign(
    { userId, purpose: 'webhook' },
    process.env.WEBHOOK_TOKEN_SECRET,
    { expiresIn: '5m' } // Token expires in 5 minutes
  )
}

// In your workflow trigger endpoint:
app.post('/api/trigger-workflow', authenticateUser, async (req, res) => {
  const webhookToken = generateWebhookToken(req.user.id)
  
  const response = await fetch(process.env.N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'X-Webhook-Token': webhookToken
    },
    body: JSON.stringify(req.body)
  })
  
  res.json(await response.json())
})
```

Then in n8n, validate the token before processing.

---

## Environment Variable Management

### Local Development
```bash
# .env.local (NEVER commit this!)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/abc123def456
N8N_WEBHOOK_SECRET=your-super-secret-webhook-key
WEBHOOK_TOKEN_SECRET=another-secret-for-jwt-tokens
```

### Production
Store secrets in:
- Environment variables on your server
- Docker secrets
- Cloud provider secret managers (AWS Secrets Manager, Google Secret Manager, etc.)
- Encrypted vault (HashiCorp Vault)

**Never hardcode in docker-compose.yml!** Use:
```yaml
environment:
  N8N_WEBHOOK_URL: ${N8N_WEBHOOK_URL}
  N8N_WEBHOOK_SECRET: ${N8N_WEBHOOK_SECRET}
```

And load from `.env` file (which is gitignored).

---

## Rate Limiting

Prevent abuse by rate-limiting webhook calls:

```javascript
// backend/middleware/rateLimiter.js
import rateLimit from 'express-rate-limit'

export const webhookLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each user to 100 requests per window
  message: 'Too many requests, please try again later',
  keyGenerator: (req) => req.user.id // Rate limit per user
})

// Apply to webhook routes
app.post('/api/trigger-workflow', authenticateUser, webhookLimiter, handler)
```

---

## Monitoring & Logging

**Log all webhook calls:**
```javascript
app.post('/api/trigger-workflow', authenticateUser, async (req, res) => {
  console.log({
    timestamp: new Date().toISOString(),
    userId: req.user.id,
    action: 'webhook_trigger',
    workflow: req.body.workflowName
  })
  
  // ... trigger webhook
})
```

**Set up alerts for:**
- Unusual spike in webhook calls
- Failed authentication attempts
- Requests from unknown IPs (if whitelisting)

---

## Security Checklist

When making your code public:

- [ ] All `.env` files are in `.gitignore`
- [ ] No hardcoded webhook URLs in source code
- [ ] n8n webhooks require authentication (secret header)
- [ ] Frontend → Backend → n8n proxy pattern implemented
- [ ] Rate limiting configured
- [ ] Webhook calls are logged
- [ ] Environment variables documented in `.env.example` (with placeholders only)
- [ ] Production secrets stored securely (not in git or docker-compose.yml)
- [ ] Review git history: `git log --all --full-history --source -- "*.env"`
- [ ] Install pre-commit hook: `cp scripts/pre-commit.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit`

---

## Pre-Commit Hook

**This repository includes a pre-commit hook** in `scripts/pre-commit.sh` that helps prevent accidental secret commits.

**Installation:**
```bash
cp scripts/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

The hook will:
- ✅ Block commits of `.env` and other sensitive files
- ⚠️ Warn about potential API keys, secrets, or tokens in code
- 🔍 Detect common secret patterns (JWT secrets, database URLs, etc.)
- 💡 Provide guidance on how to fix issues

**To bypass (use carefully!):**
```bash
git commit --no-verify
```

### Manual Secret Detection

Prevent accidental commits of secrets without using the included hook:

```bash
# .git/hooks/pre-commit (make executable: chmod +x .git/hooks/pre-commit)
#!/bin/bash

# Check for common secret patterns
if git diff --cached --name-only | xargs grep -E "(api[_-]?key|secret|password|token|webhook.*http)" 2>/dev/null; then
  echo "⚠️  WARNING: Possible secrets detected!"
  echo "Review your changes before committing."
  echo "To bypass: git commit --no-verify"
  exit 1
fi
```

Or use tools like:
- [git-secrets](https://github.com/awslabs/git-secrets)
- [detect-secrets](https://github.com/Yelp/detect-secrets)
- [gitleaks](https://github.com/gitleaks/gitleaks)

---

## If You Already Committed Secrets

**Don't just delete them in a new commit!** They're still in git history.

### Option 1: BFG Repo-Cleaner (Easier)
```bash
# Install BFG
brew install bfg # or download from https://rtyley.github.io/bfg-repo-cleaner/

# Remove file from history
bfg --delete-files .env

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (DANGER: rewrites history)
git push --force
```

### Option 2: git filter-repo
```bash
# Install
pip install git-filter-repo

# Remove file
git filter-repo --path .env --invert-paths

# Force push
git push --force
```

**After cleaning:**
1. Rotate all exposed secrets immediately
2. Notify collaborators to re-clone the repo
3. Check for any forks that may have copies

---

## Resources

- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [n8n Security Documentation](https://docs.n8n.io/hosting/security/)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [Keeping your API credentials secure](https://cloud.google.com/docs/authentication/api-keys)
