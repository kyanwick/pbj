# Production Security Configuration

This document describes the security measures implemented to protect sensitive information in production.

## Overview

The application is configured to automatically hide sensitive information when running in production mode (`NODE_ENV=production`). This includes:

- Removing error stack traces from API responses
- Disabling console logging
- Disabling Vue DevTools
- Removing debug statements from compiled code
- Protecting environment variables

---

## Environment Variables

### Protected Files

The following files contain sensitive information and are **excluded from git**:

- `.env` - Development environment variables
- `.env.production` - Production environment variables  
- `.env.local*` - Local overrides

### Required Configuration

When deploying, create a `.env.production` file with these variables:

```bash
# Database Configuration
DB_NAME=pbj_db
DB_USER=pbj_user
DB_PASSWORD=<generate-secure-password>
DB_HOST=db

# JWT Authentication
# Generate with: openssl rand -base64 32
JWT_SECRET=<generate-secure-secret>
JWT_EXPIRY=7d

# Application Environment
NODE_ENV=production

# Frontend Configuration
FRONTEND_URL=https://pb.kyanoberas.com

# API Configuration
VITE_API_BASE_URL=/api
API_RATE_LIMIT=100

# CORS Settings
CORS_ORIGIN=https://pb.kyanoberas.com
```

### Generating Secure Secrets

```bash
# Generate DB password (32 characters)
openssl rand -base64 32

# Generate JWT secret (32 bytes)
openssl rand -base64 32
```

---

## Backend Security

### Error Handling

The backend automatically hides error details in production:

**Development Mode:**
```json
{
  "message": "Registration failed: duplicate key value violates unique constraint"
}
```

**Production Mode:**
```json
{
  "message": "Registration failed"
}
```

### Request Logging

Request logging is disabled in production to prevent exposing:
- API endpoints being accessed
- User activity patterns
- Potential attack vectors

**Development:** All requests logged as `[REQ] GET /api/users`
**Production:** Request logging disabled

### Console Statements

Backend console statements remain in code for server-side logging but are only output in development mode for migration/seed operations.

---

## Frontend Security

### Console Removal

All console statements are automatically removed from production builds:

```javascript
// Source code:
console.log('User data:', userData)
console.error('Error:', error)

// Production build:
// (statements completely removed)
```

### Vue DevTools

Vue DevTools are automatically disabled in production builds:

**Development:** DevTools enabled for debugging
**Production:** DevTools disabled (configured in `quasar.config.js`)

### Error Display

Frontend error handling shows generic messages in production:

```javascript
// Development
if (process.env.NODE_ENV !== 'production') {
  console.error('Login error:', error)
}

// Production - no console output
```

---

## Build Configuration

### Quasar Config (`quasar.config.js`)

```javascript
export default defineConfig((ctx) => {
  return {
    build: {
      vueDevtools: ctx.dev, // Only in development
      minify: ctx.prod,     // Minify in production
      extendViteConf (viteConf) {
        if (ctx.prod) {
          // Remove console statements in production
          viteConf.esbuild = {
            drop: ['console', 'debugger']
          }
        }
      }
    }
  }
})
```

### ESLint Rules

ESLint enforces no-debugger in production:

```javascript
rules: {
  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
}
```

---

## Verification

### Check Environment Variables Not Tracked

```bash
# Should only show .env.example
git ls-files | grep "\.env"

# .env and .env.production should NOT appear
```

### Verify Console Removal

```bash
# Build production
npm run build

# Check for console statements (should find none)
grep -r "console\." dist/spa/assets/*.js
```

### Test Production Build

```bash
# Build with production mode
NODE_ENV=production npm run build

# Check output - should see minification
# dist/spa/assets/*.js files should be minified
```

---

## Security Checklist

Before deploying to production, verify:

- [ ] `.env` and `.env.production` are in `.gitignore`
- [ ] No `.env` files are tracked in git
- [ ] Production secrets are unique and secure
- [ ] `NODE_ENV=production` is set in deployment
- [ ] Production build succeeds without errors
- [ ] Console statements removed from build
- [ ] Vue DevTools disabled in production
- [ ] Error messages don't expose internal details
- [ ] Request logging disabled in production

---

## Incident Response

### If Secrets Are Exposed

1. **Immediately rotate all secrets:**
   ```bash
   # Generate new secrets
   openssl rand -base64 32 > new-db-password.txt
   openssl rand -base64 32 > new-jwt-secret.txt
   ```

2. **Update `.env.production` with new values**

3. **Restart all services:**
   ```bash
   docker-compose down
   docker-compose up -d
   ```

4. **Force all users to re-authenticate**

5. **Review access logs for unauthorized access**

### If Database Credentials Compromised

1. Stop the application
2. Change database password
3. Update `.env.production`
4. Restart database and application
5. Audit database for unauthorized changes

---

## Monitoring

### Regular Checks

**Weekly:**
- Review application logs for error patterns
- Check that production builds are minified
- Verify no sensitive data in logs

**Monthly:**
- Audit `.gitignore` effectiveness
- Review environment variable security
- Test error handling in production

**Quarterly:**
- Rotate JWT secrets
- Update database passwords
- Security audit of logs and error handling

---

## References

- [OWASP Top 10](https://owasp.org/Top10/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Vue.js Production Deployment](https://vuejs.org/guide/best-practices/production-deployment.html)
- [Quasar Framework Security](https://quasar.dev/quasar-cli-vite/developing-spa/build-commands)
