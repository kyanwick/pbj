# PB+J Documentation

Complete guide to setting up, developing, and deploying the PB+J creator platform.

## 📚 Quick Navigation

### 🚀 Getting Started
- **[LOCAL_DEV.md](./LOCAL_DEV.md)** - How to run the project locally (start here!)
- **[QUICK_START.md](./QUICK_START.md)** - Quick overview of the project structure

### 🔧 Development
- **[BACKEND_IMPLEMENTATION.md](./BACKEND_IMPLEMENTATION.md)** - Backend API setup and configuration
- **[BACKEND_COMPLETE.md](./BACKEND_COMPLETE.md)** - Complete backend feature overview
- **[DATABASE_MIGRATIONS.md](./DATABASE_MIGRATIONS.md)** - How to modify the database schema
- **[PROFILE_FORM_SAMPLE_OUTPUT.md](./PROFILE_FORM_SAMPLE_OUTPUT.md)** - Creator profile form examples

### 🐳 Docker & Deployment
- **[DOCKER_SETUP.md](./DOCKER_SETUP.md)** - Docker configuration guide
- **[DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)** - Initial deployment setup
- **[PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)** - Production deployment steps

### 🔒 Security & Ops
- **[API_SECURITY.md](./API_SECURITY.md)** - 🔐 Protect n8n webhooks & API endpoints (READ THIS!)
- **[SECURITY_BEST_PRACTICES.md](./SECURITY_BEST_PRACTICES.md)** - Security checklist and best practices
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Pre-deployment verification
- **[GIT_GITHUB_SETUP.md](./GIT_GITHUB_SETUP.md)** - GitHub setup and git workflow

---

## ⚡ Quick Commands

### Local Development
```bash
cd <project-directory>
./dev.sh
```

### Test Login
- Email: `demo@example.com`
- Password: `password`

### Stop Services
```bash
Ctrl+C  # Stops the dev.sh script
docker compose down  # Stops database
```

---

## 📂 Project Structure
```
<project-directory>/
├── docs/                 # 📄 This documentation
├── backend/              # 🔧 Node.js/Express API
│   ├── config/
│   ├── middleware/
│   ├── routes/
│   ├── scripts/
│   └── server.js
├── saas/                 # 🎨 Vue/Quasar frontend
│   ├── src/
│   ├── public/
│   ├── quasar.config.js
│   └── docker-compose.yml
└── dev.sh               # 🚀 Local dev startup script
```

---

## 🔑 Key Technologies

**Frontend:**
- Quasar 2.18.5 (Vue 3)
- Vite
- SCSS

**Backend:**
- Node.js 20
- Express.js
- PostgreSQL 15

**Infrastructure:**
- Docker & Docker Compose
- Cloudflare (DNS/SSL)
- Nginx Proxy Manager

---

## 📞 Support

For issues or questions:
1. Check the relevant documentation file above
2. Review the "Common issues" section in [LOCAL_DEV.md](./LOCAL_DEV.md)
3. Check backend logs: `docker logs pbj-postgres -f`

---

**Last updated:** October 23, 2025
