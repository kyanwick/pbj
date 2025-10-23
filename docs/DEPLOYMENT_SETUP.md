# GitHub Actions Deployment Setup

## Step 1: Generate SSH Key (One-time setup)

Run this locally:

```bash
ssh-keygen -t ed25519 -f deploy_key -C "github-actions-deploy" -N ""
```

This creates two files:
- `deploy_key` (private key)
- `deploy_key.pub` (public key)

## Step 2: Add Public Key to Your Server

On your production server, add the public key:

```bash
# On your server:
mkdir -p ~/.ssh
cat >> ~/.ssh/authorized_keys << 'EOF'
[PASTE CONTENTS OF deploy_key.pub HERE]
EOF

chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

## Step 3: Add GitHub Secrets

In your GitHub repo settings → Secrets and variables → Actions:

**Add these three secrets:**

1. **DEPLOY_HOST**
   - Value: Your server's IP or domain (e.g., `pb.kyanoberas.com`)

2. **DEPLOY_USER**
   - Value: Your server username (e.g., `kyanwick`)

3. **DEPLOY_KEY**
   - Value: Contents of `deploy_key` (private key - the one WITHOUT .pub extension)

## Step 4: Test the Deployment

Push to master branch and GitHub Actions will run:

```bash
git push origin master
```

Monitor the deployment at: `https://github.com/kyanwick/pbj/actions`

## Troubleshooting

### "ssh: no key found"
→ DEPLOY_KEY secret is missing or empty in GitHub

### "i/o timeout"
→ DEPLOY_HOST is wrong or server isn't accessible on port 22

### "permission denied (publickey)"
→ Public key not added to `~/.ssh/authorized_keys` on server

## Keep Keys Secure

⚠️ **IMPORTANT**: Never commit `deploy_key` to git! Add to `.gitignore`:

```
deploy_key
deploy_key.pub
```

Already done: `.gitignore` includes this by default
