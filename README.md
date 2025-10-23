# Saas (saas)

a content creation ai hub

## Quick Links

- 🚀 **[Deployment Quick Start](./DEPLOYMENT_QUICK_START.md)** - Get Docker running in 5 minutes
- 📦 **[Docker Storage Guide](./DOCKER_STORAGE.md)** - Storage architecture & backup strategies
- 🤖 **[AI Agent Instructions](./.github/copilot-instructions.md)** - For AI coding agents

## Development

### Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

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

### Production Deployment

```bash
./scripts/init-storage.sh    # Initialize storage directories
docker-compose up -d         # Start containerized services
```

See [Deployment Quick Start](./DEPLOYMENT_QUICK_START.md) for detailed instructions.

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
