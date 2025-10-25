#!/bin/bash
#
# Pre-commit hook to prevent committing secrets
#
# Installation (optional):
#   cp scripts/pre-commit.sh .git/hooks/pre-commit
#   chmod +x .git/hooks/pre-commit
#
# To bypass this check (use carefully!):
#   git commit --no-verify

# ANSI color codes
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "🔍 Checking for potential secrets..."

# Check for files that should never be committed
FORBIDDEN_FILES=(
  ".env"
  ".env.local"
  ".env.production"
  "backend/.env"
  "backend/.env.local"
  "secrets.json"
  "credentials.json"
)

for file in "${FORBIDDEN_FILES[@]}"; do
  if git diff --cached --name-only | grep -q "^$file$"; then
    echo -e "${RED}❌ ERROR: Attempting to commit $file${NC}"
    echo "This file should never be committed to git!"
    echo "Remove it with: git reset HEAD $file"
    exit 1
  fi
done

# Check for common secret patterns in staged changes
SECRET_PATTERNS=(
  "api[_-]?key[[:space:]]*[:=][[:space:]]*['\"][a-zA-Z0-9+/]{20,}"
  "secret[_-]?key[[:space:]]*[:=][[:space:]]*['\"][a-zA-Z0-9+/]{20,}"
  "(password|passwd)[[:space:]]*[:=][[:space:]]*['\"][^'\"]{8,}"
  "jwt[_-]?secret[[:space:]]*[:=][[:space:]]*['\"][a-zA-Z0-9+/]{20,}"
  "(auth|bearer)[_-]?token[[:space:]]*[:=][[:space:]]*['\"][a-zA-Z0-9+/]{20,}"
  "postgresql://[^:]+:[^@]+@"
  "mysql://[^:]+:[^@]+@"
  "mongodb\+srv://[^:]+:[^@]+@"
  "https://hooks\.slack\.com/services/T[A-Z0-9]+/B[A-Z0-9]+/[a-zA-Z0-9]+"
  "xox[pboa]-[0-9]{12}-[0-9]{12}-[a-zA-Z0-9]+"
  "ghp_[a-zA-Z0-9]{36}"
  "github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59}"
  "sk-[a-zA-Z0-9]{48}"
  "r8_[a-zA-Z0-9]{40}"
  "-----BEGIN.*PRIVATE KEY-----"
)

WARNINGS=()

for pattern in "${SECRET_PATTERNS[@]}"; do
  if git diff --cached | grep -iE -- "$pattern" > /dev/null 2>&1; then
    WARNINGS+=("Pattern detected: ${pattern:0:50}...")
  fi
done

# Check for hardcoded production URLs/domains
if git diff --cached | grep -iE "(pb\.kyanoberas\.com|/home/kyanwick)" | grep -v "^[+-].*#.*customize\|^[+-].*NOTE:" > /dev/null; then
  WARNINGS+=("Production domain or server path detected (may be intentional)")
fi

# Report warnings
if [ ${#WARNINGS[@]} -gt 0 ]; then
  echo -e "${YELLOW}⚠️  WARNING: Potential secrets or sensitive data detected!${NC}"
  echo ""
  echo "The following patterns were found in your staged changes:"
  for warning in "${WARNINGS[@]}"; do
    echo "  • $warning"
  done
  echo ""
  echo "Please review your changes carefully:"
  echo "  git diff --cached"
  echo ""
  echo "If these are false positives or safe to commit:"
  echo "  git commit --no-verify"
  echo ""
  echo "To remove sensitive files from staging:"
  echo "  git reset HEAD <file>"
  echo ""
  
  # Uncomment to make warnings blocking (requires --no-verify to commit)
  # exit 1
  
  # Currently warnings don't block, just inform
  read -p "Continue with commit? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Commit aborted.${NC}"
    exit 1
  fi
fi

echo -e "${GREEN}✅ Pre-commit checks passed${NC}"
exit 0
