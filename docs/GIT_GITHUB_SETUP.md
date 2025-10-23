# Git & GitHub Setup

How to connect your local repository to GitHub and push/pull changes.

## Setup GitHub Remote

First time setup - connect your local repo to GitHub:

```bash
cd /home/kyanwick/saas

# Add GitHub as remote (replace USERNAME and REPO)
git remote add origin https://github.com/USERNAME/REPO.git

# Or if using SSH (recommended):
git remote add origin git@github.com:USERNAME/REPO.git

# Verify
git remote -v
```

## Set Default Branch

Configure your default branch (master or main):

```bash
# If master is your default:
git branch -M master

# Or if main is your default:
git branch -M main

# Set upstream
git push -u origin master
# or
git push -u origin main
```

## Typical Workflow

### 1. Make Changes Locally

```bash
# Make your code changes
nano backend/server.js
# or edit files in your editor

# Run locally to test
./dev.sh
```

### 2. Commit Changes

```bash
cd /home/kyanwick/saas

# Stage changes
git add .

# Or stage specific files
git add backend/server.js
git add docs/

# Commit with message
git commit -m "feat: add new API endpoint"
```

### 3. Push to GitHub

```bash
# Push to master/main
git push origin master
# or
git push origin main

# Or set upstream and push (first time):
git push -u origin master
```

### 4. Deploy to Production

After pushing to GitHub:

```bash
# SSH to production server
ssh user@your-server.com
cd ~/saas

# Pull latest changes
git pull origin master

# Deploy
./deploy.sh
```

## Common Git Commands

```bash
# View status
git status

# View recent commits
git log --oneline -10

# See what changed
git diff

# Undo uncommitted changes
git restore filename
git restore .  # all files

# Undo last commit (before push)
git reset --soft HEAD~1

# Create a new branch
git checkout -b feature/new-feature

# Switch branches
git checkout master

# View all branches
git branch -a
```

## Troubleshooting

**"fatal: 'origin' does not appear to be a git repository"?**
- You haven't added a remote yet
- Run: `git remote add origin https://github.com/USERNAME/REPO.git`

**"Permission denied (publickey)"?**
- Your SSH key isn't configured
- Use HTTPS instead: `git remote add origin https://...`
- Or set up SSH: [GitHub SSH Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

**"fatal: The current branch master has no upstream branch"?**
- First push: `git push -u origin master`
- Or set default: `git branch --set-upstream-to=origin/master master`

**Can't push but can pull?**
- Check if you have write permissions on the repository
- Verify SSH key or GitHub token

## Branch Strategy

### Recommended

```
master          # Production-ready code (deployed to pb.kyanoberas.com)
  ↑
  └─ develop   # Integration branch
       ↑
       ├─ feature/auth-improvements
       ├─ feature/new-forms
       └─ bugfix/login-issue
```

### Simple (Current)

```
master          # Main branch (all code)
  ├─ structure # Your current branch
  └─ generate-ideas-workflow
```

## Current Status

**Your Repository:**
- Location: `/home/kyanwick/saas`
- Current branch: `structure`
- Remote: Not yet configured

**Next Steps:**
1. `git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git`
2. Push current branch: `git push -u origin structure`
3. Or merge and push to master: `git checkout master && git merge structure && git push`

---

**Last updated:** October 23, 2025
