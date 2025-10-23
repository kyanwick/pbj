# AI Coding Agent Instructions

## Project Overview

**Saas** is a content creation AI hub built with **Quasar 2** (Vue 3 + Vite) as an SPA (Single Page Application). The project is containerized with Docker and uses a hash-based router for deployment flexibility. Its main goal is to give a user a personal brand hub that uses AI ethically to ease content creation. It will be using various AI models and APIs to assist users in generating content, managing their brand assets, and streamlining their workflow. The backend will mostly be developed with a no code aproach using n8n workflows and integrations.

### Core Stack
- **Frontend Framework**: Quasar v2.16.0 (Vue 3.5.22, Vue Router 4.0.0)
- **Build Tool**: Vite (via `@quasar/app-vite`)
- **Linting**: ESLint 9.14.0 (flat config) + eslint-plugin-vue
- **Formatting**: Prettier (semi: false, singleQuote: true, printWidth: 100)
- **Containerization**: Docker (multi-stage build) + docker-compose
- **Node**: v20+ (supports v20-28)

---

## Architecture & Key Patterns

### Directory Structure
```
src/
├── App.vue              # Root component (router-view only)
├── router/
│   ├── index.js         # Router instantiation with Quasar wrapper
│   └── routes.js        # Route definitions (lazy-loaded layouts/pages)
├── layouts/
│   └── MainLayout.vue   # Primary layout with q-layout, header, drawer
├── pages/
│   ├── IndexPage.vue    # Home page
│   └── ErrorNotFound.vue # 404 fallback
├── components/          # Reusable UI components (e.g., EssentialLink.vue)
├── css/
│   ├── app.scss         # Global styles (imported in quasar.config.js)
│   └── quasar.variables.scss
└── assets/              # Static images/SVGs
```

### Component Organization
- **Page components** (in `pages/`) use lazy-loading via `import()` to reduce bundle size
- **Layouts** wrap pages with persistent UI (header, sidebar, etc.)
  - `MainLayout.vue` — Public pages (landing, features, pricing, docs)
  - `AuthLayout.vue` — Authenticated pages (dashboard, creator tools, settings)
- **Reusable components** stored in `components/` directory
- All pages use Vue 3 `<script setup>` syntax (preferred pattern)

### Routing Convention
- Routes defined in `src/router/routes.js` as array of objects
- Router mode set to **hash** (`vueRouterMode: 'hash'` in quasar.config.js) for SPA deployment
- Catch-all route `/:catchAll(.*)*` for 404 handling (must be last)
- Layouts are wrapper components; pages are children routes

---

## Developer Workflows

### Installation & Development
```bash
npm install              # Install dependencies (triggers `quasar prepare`)
npm run dev              # Start dev server (auto-opens browser)
npm run build            # Production build → dist/spa/
npm run lint             # Check code (ESLint + Quasar plugin)
npm run format           # Auto-format with Prettier
```

### Code Quality Standards
- **ESLint Config**: `eslint.config.js` uses flat config (new ESLint 9.0 format)
- **Plugin Setup**: Vue ESLint parser + Quasar plugin + Prettier skip formatting
- **Vite Plugin Checker**: Real-time eslint validation during `npm run dev`
- **Prettier Rules**: No semicolons, single quotes, 100-char line width

### Docker Workflow & Storage Architecture
- **Build Stage**: Node 20 Alpine, installs deps, runs `npm run build`
- **Production Stage**: Nginx Alpine, serves `dist/spa/` on port 80
- **Compose**: Exposes port 77 locally, container named `my-saas`
- **Storage Strategy**: Dual-tier architecture:
  - **System drive** (`/`): Only Nginx + Quasar SPA build (lightweight)
  - **Large drive** (`/mnt/elitecloud`): All persistent data via Docker volumes
- **Volumes Mounted**:
  - `/mnt/elitecloud/saas-storage:/app/storage` - Brand kits, scheduled posts, media, archives
  - `/mnt/elitecloud/saas-db:/var/lib/postgresql/data` - PostgreSQL database
  - `/mnt/elitecloud/saas-logs:/app/logs` - Application logs
- **Setup**: Run `./scripts/init-storage.sh` before first `docker-compose up`
- **See**: `DOCKER_STORAGE.md` for backup & migration details

---

## Project-Specific Conventions

### Vue 3 Setup
- **Script Setup**: All components use `<script setup>` (no Options API)
- **Quasar Wrappers**: Router uses `defineRouter()` wrapper for Quasar integration
- **Ref Management**: Use `ref()` for reactive state (see MainLayout.vue example)
- **No Imports Needed**: Quasar components auto-imported (via app-vite plugin)

### Styling Patterns
- Global styles in `src/css/app.scss` (included via quasar.config.js)
- Quasar variables customizable in `src/css/quasar.variables.scss`
- Utility classes from Quasar (e.g., `flex flex-center` for centering)
- No CSS-in-JS; use SCSS modules for component-scoped styles if needed

### Quasar Integration Points
- **Icon Set**: Material Icons (configured in framework.config)
- **Icon Font**: Roboto font + Material Icons loaded via extras
- **Boot Files**: `src/boot/` for app initialization (currently empty, expandable)
- **Build Targets**: Browser (ES2022+), Node 20; targets modern browsers

---

## Critical Files & When to Edit

| File | Purpose | When to Change |
|------|---------|-----------------|
| `src/router/routes.js` | All routes defined here | Adding new pages/layouts |
| `src/layouts/MainLayout.vue` | Primary landing page shell | Modify header, nav (public pages) |
| `src/layouts/AuthLayout.vue` | Authenticated user shell | Modify header, sidebar (logged-in pages) |
| `src/pages/CreatorLobby.vue` | Main dashboard after login | Customize dashboard sections, cards, stats |
| `quasar.config.js` | Build & framework config | Change port, add plugins, modify build targets |
| `src/css/app.scss` | Global styles | Add app-wide CSS |
| `.eslint.config.js` | Linting rules | Update rule severity, add plugins |
| `.prettierrc.json` | Formatting rules | Adjust code style |
| `Dockerfile` | Container build | Update Node version, nginx config |

---

## Deployment & DevOps

### Local Development
```bash
npm run dev
```
- Starts dev server on **http://localhost:9001**
- Hot-reload enabled (auto-refresh on file changes)
- Uses Node v20.18.0+ (enforced)

### Production Deployment (Automatic via GitHub Actions)
**Trigger**: Commit + push to `master` branch
```bash
git add .
git commit -m "your changes"
git push pbj-saas master  # or: git push origin master
```

**What Happens Automatically**:
1. ✅ GitHub Actions workflow triggered (`.github/workflows/deploy.yml`)
2. 🔐 SSH into server using deploy key (`DEPLOY_KEY` secret)
3. 📥 Pull latest code from GitHub (`git reset --hard origin/master`)
4. 🚀 Run deployment script (`./scripts/deploy.sh`)
5. 📦 Rebuild Docker image (builds frontend during Docker build)
6. 🔄 Restart containers (`docker-compose up -d`)
7. 🌐 Update **https://pb.kyanoberas.com** (live in ~30 seconds)

**View Deployment Progress**:
- Go to GitHub repo → **Actions** tab
- Click latest workflow run to see logs
- Each step shows build output, Docker rebuild status, container startup

### Manual Production Deployment
If needed to deploy manually:
```bash
cd /home/kyanwick/saas/saas
./scripts/deploy.sh
```
This runs the same steps as GitHub Actions.

### Environment Setup (First-Time Only)
1. **GitHub Secrets** (repo → Settings → Secrets and variables → Actions):
   - `DEPLOY_HOST`: Server hostname/IP
   - `DEPLOY_USER`: SSH username (`kyanwick`)
   - `DEPLOY_KEY`: SSH private key (ed25519 format)

2. **Server Setup** (already done):
   - SSH key added to `~/.ssh/authorized_keys`
   - Sudoers configured for passwordless docker/deploy commands
   - Storage directories created on `/mnt/elitecloud/`

---

## Authenticated Dashboard (Creator Lobby)

**Route**: `/lobby`

**What Users See**: After logging in and paying for membership, users land on the Creator Lobby — their main dashboard.

**Design Philosophy**: Minimalist-maximalist blend (playful, colorful, retro-web energy) balanced by simplicity and clarity. Goal: Users feel ready to create immediately.

### Architecture

**AuthLayout.vue** (Persistent wrapper):
- Sticky header with PB+J logo, "Create" CTA, profile dropdown
- Left sidebar with navigation: Dashboard, Create, Library, Schedule, Analytics
- Main content area (router-view)
- Responsive: Desktop sidebar → Mobile horizontal nav bar

**CreatorLobby.vue** (Page content):
- Welcome section (personalized greeting)
- Main grid: 
  - Left: Big "Start Creating" CTA card with floating emoji
  - Right top: "Your Latest Drafts" (3 mock drafts with platform tags)
  - Right bottom: "Community Pulse" (placeholder for future feature)
- Bottom: Quick stats (12 Drafts, 8 Published, 2.4K Reach, 342 Engaged)

### Visual Design

**Color Scheme**:
- Primary gradient: purple/indigo (667eea → 764ba2)
- Accent red (ff6b6b), Accent yellow (feca57), Accent cyan (48dbfb)
- Dark text (1a1a2e), Light bg (f5f7fa), Borders (e0e0e0)

**Key Elements**:
- Card-based layout with 2px borders, subtle shadows on hover
- Gradient accents on buttons, badges
- Animated floating emoji on primary CTA
- Responsive grid: 2-column desktop → 1-column mobile
- All buttons have hover states (elevation, color shift)

### Extending the Dashboard

**Add New Card**: In `CreatorLobby.vue`:
```vue
<section class="grid-item new-feature">
  <div class="card-header">
    <h3>Feature Name</h3>
  </div>
  <!-- Content here -->
</section>
```

**Add Navigation Item**: In `AuthLayout.vue`:
```vue
<router-link to="/new-route" class="nav-item">
  <span class="nav-icon">🎯</span>
  <span class="nav-label">New Item</span>
</router-link>
```

**Customize Stats**: Edit `.quick-stats` section in `CreatorLobby.vue` SCSS. Stats are fetched via API in future (hardcoded mock data for now).

---
1. Create `src/pages/MyPage.vue` with `<script setup>`
2. Import in `src/router/routes.js`:
   ```javascript
   {
     path: '/mypage',
     component: () => import('layouts/MainLayout.vue'),  // or AuthLayout for authenticated pages
     children: [{ path: '', component: () => import('pages/MyPage.vue') }]
   }
   ```
3. For public pages, use `MainLayout.vue` — for authenticated pages, use `AuthLayout.vue`
4. Link from layout: `<router-link to="/mypage">My Page</router-link>`

### Modifying Navigation
- Edit `linksList` in `MainLayout.vue` for drawer links
- Use Quasar components: `<q-item>`, `<q-item-label>`, `<q-btn>` (auto-imported)

### Environment-Aware Routing
- Dev: Opens browser automatically (`devServer.open: true`)
- Prod: Uses Nginx + hash routing for static hosting
- SSR Disabled: Uses `createWebHashHistory` for SPA mode

---

## Integration Points & External Dependencies

### Quasar Framework
- Provides UI components (q-layout, q-page, q-drawer, q-toolbar, etc.)
- Handles responsive design & mobile optimizations
- Icon fonts via Material Icons
- No additional icon libraries bundled

### Vue Router
- Handles all navigation; supports nested routes
- Hash mode ensures SPA works on static hosting (no server rewrites needed)

---

## Data Persistence Architecture

### Storage Tiers
**System Drive (`/`)**: Lightweight
- Nginx executable
- Quasar SPA build (`dist/spa/`)
- Node modules (Docker build stage, not in production)

**Large Drive (`/mnt/elitecloud`)**: All Persistent Data (Docker volumes)
- **Brand Kits** (`/mnt/elitecloud/saas-storage/brand_kits/`) - Logos, colors, brand guides
- **Scheduled Posts** (`/mnt/elitecloud/saas-storage/scheduled_posts/`) - JSON files ready for publishing
- **Media** (`/mnt/elitecloud/saas-storage/media/`) - Generated images/videos
- **Generated History** (`/mnt/elitecloud/saas-storage/generated_history/`) - Batch records for analytics
- **Archive** (`/mnt/elitecloud/saas-storage/archive/`) - Published posts (moved after publishing)
- **PostgreSQL** (`/mnt/elitecloud/saas-db/`) - All relational user data
- **Logs** (`/mnt/elitecloud/saas-logs/`) - Application logs

### Data Flow
```
User Action
├── Temporary (Not Saved):
│   └── Generate content → Display in UI → User downloads/copies → Forgotten
│
└── Persistent (Saved):
    ├── Brand Kit Upload → Save to /storage/brand_kits/ + metadata to DB
    ├── Schedule Post → Save JSON to /storage/scheduled_posts/ + record in DB
    └── Archive → After publishing, move from scheduled to /storage/archive/
```

### Database Schema (PostgreSQL)
```sql
-- Core user data
users { id, email, password_hash, created_at }
brand_profiles { id, user_id, name, description }
brand_kits { id, user_id, name, storage_path, json_data, created_at }

-- Scheduled content (references storage files)
scheduled_posts {
  id, user_id, content_path, platform, scheduled_time,
  status (pending|published|failed), created_at, published_at
}

-- Analytics/history
generated_content_log {
  id, user_id, batch_id, prompt, platforms, created_at
}
```

### Storage File Format (JSON for Portability)
All persistent files stored as JSON (not binary):
```json
// /mnt/elitecloud/saas-storage/scheduled_posts/user_123/post_456.json
{
  "id": "post_456",
  "user_id": "user_123",
  "platform": "twitter",
  "content": "Brand announcement...",
  "media": [{ "path": "/storage/media/user_123/img.png", "alt_text": "..." }],
  "scheduled_time": "2025-10-25T14:30:00Z",
  "metadata": { "source": "n8n_workflow_123", "generated_at": "..." }
}
```

### n8n Integration Pattern
```
n8n Workflow → Stores files to /mnt/elitecloud/saas-storage/ 
            → Returns metadata + storage paths
Frontend     → Receives paths + metadata
            → Stores metadata reference in PostgreSQL
            → On publish, n8n reads from storage + publishes
```

---

## Integration Points & External Dependencies

### Quasar Framework
- Provides UI components (q-layout, q-page, q-drawer, q-toolbar, etc.)
- Handles responsive design & mobile optimizations
- Icon fonts via Material Icons
- No additional icon libraries bundled

### n8n Workflows
- Frontend calls REST endpoints to trigger workflows
- Workflows process AI tasks (generate content, create brand analysis)
- Results stored to `/mnt/elitecloud/saas-storage/` + metadata to DB
- Scheduled publishing via n8n scheduler (no frontend polling needed)

### PostgreSQL Database
- User data, brand profiles, scheduled posts metadata
- Accessible from n8n for reading/updating post status
- Connection string: `postgres://saas_user:password@db:5432/saas_db`

---

## Red Flags & Best Practices

⚠️ **Common Mistakes to Avoid**:
- Don't modify `process.env.VUE_ROUTER_MODE` in routes—change only in `quasar.config.js`
- Don't import Quasar components; they're auto-injected
- Don't use Options API; always use `<script setup>`
- Ensure new routes have catch-all route at the end of routes array
- **Don't save generated content to DB** - keep it ephemeral (return to UI, let user save)
- **Don't create files outside `/app/storage/`** - they'll be lost when container restarts
- **Don't modify `/mnt/elitecloud/` paths** in Docker volume mounts - use `DOCKER_STORAGE.md`
- Format & lint before committing: `npm run format && npm run lint`

✅ **Best Practices**:
- Keep components small and focused
- Use lazy-loading for routes to reduce bundle
- Follow Prettier rules exactly (enforced by vite-plugin-checker)
- Test Docker builds: `docker-compose up` before pushing
