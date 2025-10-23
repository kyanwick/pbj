# PB+J Creator Platform

A full-stack SaaS application for content creators to build profiles, generate ideas, and manage workflows.

## 🚀 Quick Start

```bash
cd /home/kyanwick/saas
./dev.sh
```

Open http://localhost:9001 and login with:
- Email: `demo@example.com`
- Password: `password`

## 📚 Documentation

See **[docs/README.md](./docs/README.md)** for complete documentation including:
- Local development setup
- Backend API guide
- Deployment instructions
- Security best practices
- Docker configuration

## 🛠️ Available Scripts

| Script | Purpose |
|--------|---------|
| `./dev.sh` | Start local dev (database + backend + frontend) |
| `./migrate.sh` | Run database migrations |
| `./deploy.sh` | Deploy to production |

**See [docs/SCRIPTS_REFERENCE.md](./docs/SCRIPTS_REFERENCE.md) for details on each script.**

## 🏗️ Project Structure

```
.
├── docs/                    # 📄 Full documentation
├── backend/                 # 🔧 Express API (Node.js)
├── saas/                    # 🎨 Quasar frontend (Vue 3)
├── dev.sh                   # 🚀 Local dev startup
├── docker-compose.yml       # 🐳 Database container
└── README.md               # This file
```

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Quasar 2.18, Vue 3, Vite |
| Backend | Node.js 20, Express.js |
| Database | PostgreSQL 15 |
| Infrastructure | Docker, Cloudflare, Nginx PM |

## 📖 Key Documentation

- **[Getting Started](./docs/LOCAL_DEV.md)** - Run locally
- **[Deployment](./docs/PRODUCTION_DEPLOYMENT.md)** - Deploy to production
- **[Security](./docs/SECURITY_BEST_PRACTICES.md)** - Security checklist
- **[Backend API](./docs/BACKEND_IMPLEMENTATION.md)** - API reference

## 🎯 Current Features

- ✅ User registration & login (JWT-based)
- ✅ Creator profile form
- ✅ Database migrations & seeding
- ✅ Production deployment with Nginx Proxy Manager
- ✅ Cloudflare SSL/DNS integration

## 🔮 Planned Features

- Content idea generator
- n8n workflow integration
- Email notifications
- Advanced profile features

---

**Status:** Ready for local development and production deployment  
**Last updated:** October 23, 2025
