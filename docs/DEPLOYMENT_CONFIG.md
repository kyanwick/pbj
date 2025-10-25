# Deployment Configuration Guide

## Overview

This guide helps you configure the deployment settings for your own server. The repository contains example paths and domains that need to be customized for your deployment.

## Files to Customize

### 1. GitHub Actions Workflow (`.github/workflows/deploy.yml`)

**Current reference:**
```yaml
cd /home/kyanwick/saas/saas
```

**Change to your path:**
```yaml
cd /path/to/your/project
```

### 2. Deploy Scripts (`deploy.sh`, `scripts/deploy.sh`)

**Current reference:**
```bash
echo "📍 Live at: https://pb.kyanoberas.com"
```

**Change to your domain:**
```bash
echo "📍 Live at: https://your-domain.com"
```

### 3. GitHub Secrets Configuration

Set these in your repository settings → Secrets and variables → Actions:

| Secret | Description | Example |
|--------|-------------|---------|
| `DEPLOY_HOST` | Your server IP or domain | `123.45.67.89` or `your-server.com` |
| `DEPLOY_USER` | SSH username on your server | `youruser` |
| `DEPLOY_KEY` | SSH private key (ed25519) | Generate with `ssh-keygen -t ed25519` |

### 4. Environment Variables (`.env`)

Create `.env` on your server (not in git!) with:

```bash
# Copy .env.example and customize:
DB_PASSWORD=your_strong_database_password
JWT_SECRET=your_jwt_secret_32_chars_min
FRONTEND_URL=https://your-domain.com
N8N_WEBHOOK_URL=https://your-n8n-instance/webhook/id
N8N_WEBHOOK_SECRET=your_webhook_secret
```

### 5. Nginx Configuration

If you're using Nginx Proxy Manager or direct Nginx, update:

- Domain name: `your-domain.com`
- SSL certificate paths
- Proxy pass targets

## Quick Setup Checklist

- [ ] Fork/clone this repository
- [ ] Update `.github/workflows/deploy.yml` with your server path
- [ ] Set up GitHub Secrets (DEPLOY_HOST, DEPLOY_USER, DEPLOY_KEY)
- [ ] Create `.env` on your server (never commit!)
- [ ] Update domain references in deploy scripts (optional, for output messages)
- [ ] Configure your domain's DNS to point to your server
- [ ] Set up SSL certificate (Cloudflare, Let's Encrypt, etc.)
- [ ] Run initial deployment: `./scripts/deploy.sh`

## Security Notes

🔐 **Never commit to git:**
- `.env` or `.env.local` files
- SSH private keys
- Database passwords
- API keys or tokens
- Your actual server IP (use GitHub Secrets)

✅ **Safe to commit:**
- This configuration guide
- `.env.example` with placeholder values
- Documentation with generic examples

## Need Help?

Refer to:
- [DEPLOYMENT_QUICK_START.md](./DEPLOYMENT_QUICK_START.md) - Step-by-step deployment
- [API_SECURITY.md](./API_SECURITY.md) - Securing your APIs
- [PRODUCTION_SECURITY.md](./PRODUCTION_SECURITY.md) - Production security checklist
