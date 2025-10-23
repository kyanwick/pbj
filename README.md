# PB+J Creator Platform (Saas)

A full-stack SaaS application for content creators - an AI-powered content creation hub for building profiles, generating ideas, and managing workflows.

## 🚀 Quick Start

### Option 1: Local Development (Backend + Frontend)
```bash
cd /home/kyanwick/saas
./dev.sh
```

Open http://localhost:9001 and login with:
- Email: `demo@example.com`
- Password: `password`

### Option 2: Frontend Development Only
```bash
# Install dependencies
npm install

# Start in development mode (hot-code reloading)
quasar dev
```

### Option 3: Production Deployment
```bash
./scripts/init-storage.sh    # Initialize storage directories
docker-compose up -d         # Start containerized services
```

See [Deployment Quick Start](./docs/DEPLOYMENT_QUICK_START.md) for detailed deployment instructions.

## 📚 Documentation

See **[docs/README.md](./docs/README.md)** for complete documentation including:
- Local development setup
- Backend API guide
- Deployment instructions
- Security best practices
- Docker configuration

### Quick Documentation Links

- 🚀 **[Deployment Quick Start](./docs/DEPLOYMENT_QUICK_START.md)** - Get Docker running in 5 minutes
- 📦 **[Docker Storage Guide](./docs/DOCKER_STORAGE.md)** - Storage architecture & backup strategies
- 🤖 **[AI Agent Instructions](./.github/copilot-instructions.md)** - For AI coding agents
- **[Getting Started](./docs/LOCAL_DEV.md)** - Run locally
- **[Deployment](./docs/PRODUCTION_DEPLOYMENT.md)** - Deploy to production
- **[Security](./docs/SECURITY_BEST_PRACTICES.md)** - Security checklist
- **[Backend API](./docs/BACKEND_IMPLEMENTATION.md)** - API reference

## 🛠️ Available Scripts

| Script | Purpose |
|--------|---------|
| `./dev.sh` | Start local dev (database + backend + frontend) |
| `./migrate.sh` | Run database migrations |
| `./deploy.sh` | Deploy to production |
| `npm run lint` | Lint the files |
| `npm run format` | Format the files |
| `quasar build` | Build the app for production |

**See [docs/SCRIPTS_REFERENCE.md](./docs/SCRIPTS_REFERENCE.md) for details on each script.**

## 🏗️ Project Structure

```
.
├── docs/                    # 📄 Full documentation
├── backend/                 # 🔧 Express API (Node.js)
├── src/                     # 🎨 Quasar frontend (Vue 3)
├── scripts/                 # 🛠️ Deployment and utility scripts
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

## 🎯 Current Features

- ✅ User registration & login (JWT-based)
- ✅ Creator profile form with 4-section onboarding
- ✅ Database migrations & seeding
- ✅ Production deployment with Nginx Proxy Manager
- ✅ Cloudflare SSL/DNS integration
- ✅ Storage architecture for media and content
- ✅ Creator lobby and profile management

## 🔮 Planned Features

- Content idea generator
- n8n workflow integration
- Email notifications
- Advanced profile features

## Development

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

---

**Status:** Ready for local development and production deployment  
**Last updated:** October 23, 2025
