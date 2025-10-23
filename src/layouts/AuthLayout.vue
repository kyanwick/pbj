<template>
  <div class="authenticated-layout">
    <!-- Persistent Header -->
    <header class="auth-header">
      <div class="header-container">
        <router-link to="/lobby" class="logo-link">
          <div class="logo">PB+J</div>
        </router-link>
        <div class="tagline">Creator Hub</div>
        <div class="header-spacer"></div>
        <button class="btn-create-header">
          <span class="icon">✨</span>
          Create
        </button>
        <div class="profile-section">
          <button class="profile-btn" @click="showProfileMenu = !showProfileMenu">
            <div class="avatar">{{ userInitial }}</div>
          </button>
          <div v-if="showProfileMenu" class="profile-menu">
            <router-link to="/settings" class="menu-item">⚙️ Settings</router-link>
            <router-link to="/help" class="menu-item">❓ Help</router-link>
            <a href="#" class="menu-item" @click.prevent="logout">🚪 Logout</a>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Layout -->
    <div class="auth-layout">
      <!-- Sidebar -->
      <aside class="auth-sidebar">
        <nav class="sidebar-nav">
          <router-link to="/lobby" class="nav-item" :class="{ active: $route.path === '/lobby' }">
            <span class="nav-icon">✨</span>
            <span class="nav-label">Dashboard</span>
          </router-link>
          <router-link to="/create" class="nav-item" :class="{ active: $route.path === '/create' }">
            <span class="nav-icon">✏️</span>
            <span class="nav-label">Create</span>
          </router-link>
          <router-link to="/library" class="nav-item" :class="{ active: $route.path === '/library' }">
            <span class="nav-icon">📚</span>
            <span class="nav-label">Library</span>
          </router-link>
          <router-link to="/schedule" class="nav-item" :class="{ active: $route.path === '/schedule' }">
            <span class="nav-icon">📅</span>
            <span class="nav-label">Schedule</span>
          </router-link>
          <router-link to="/analytics" class="nav-item" :class="{ active: $route.path === '/analytics' }">
            <span class="nav-icon">📊</span>
            <span class="nav-label">Analytics</span>
          </router-link>
        </nav>
      </aside>

      <!-- Content Area -->
      <main class="auth-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showProfileMenu = ref(false)
const userInitial = ref('K') // Will be dynamic from user data

const logout = () => {
  // TODO: Clear auth token
  router.push('/')
}
</script>

<style scoped lang="scss">
// Design Tokens
$color-primary: #667eea;
$color-secondary: #764ba2;
$color-accent-red: #ff6b6b;
$color-accent-yellow: #feca57;
$color-accent-cyan: #48dbfb;
$color-dark: #1a1a2e;
$color-light: #f5f7fa;
$color-border: #e0e0e0;
$font-mono: 'Courier New', monospace;

.authenticated-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 100%);
}

// ═══════════════════════════════════════════════════════════════════
// HEADER
// ═══════════════════════════════════════════════════════════════════

.auth-header {
  background: white;
  border-bottom: 2px solid $color-border;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .header-container {
    max-width: 100%;
    margin: 0 auto;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .logo-link {
    text-decoration: none;
  }

  .logo {
    font-family: $font-mono;
    font-size: 20px;
    font-weight: 900;
    background: linear-gradient(135deg, $color-primary, $color-secondary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 2px;
  }

  .tagline {
    font-size: 11px;
    color: #999;
    font-style: italic;
    white-space: nowrap;
  }

  .header-spacer {
    flex: 1;
  }

  .btn-create-header {
    background: linear-gradient(135deg, $color-primary, $color-secondary);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba($color-primary, 0.2);

    .icon {
      font-size: 14px;
    }

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba($color-primary, 0.3);
    }
  }

  .profile-section {
    position: relative;
  }

  .profile-btn {
    background: none;
    border: 2px solid $color-border;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    transition: all 0.2s ease;

    &:hover {
      border-color: $color-primary;
    }

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, $color-accent-yellow, $color-accent-red);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: white;
      font-size: 14px;
    }
  }

  .profile-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 2px solid $color-border;
    border-radius: 8px;
    margin-top: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 101;
    min-width: 160px;
    overflow: hidden;

    .menu-item {
      display: block;
      padding: 10px 16px;
      text-decoration: none;
      color: $color-dark;
      font-size: 13px;
      border-bottom: 1px solid $color-light;
      transition: background 0.2s ease;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: $color-light;
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// LAYOUT
// ═══════════════════════════════════════════════════════════════════

.auth-layout {
  display: grid;
  grid-template-columns: 180px 1fr;
  flex: 1;
  gap: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
}

// ═══════════════════════════════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════════════════════════════

.auth-sidebar {
  background: white;
  border-right: 2px solid $color-border;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 2px solid $color-border;
    padding: 12px;
    display: flex;
    flex-direction: row;
    gap: 4px;
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: $color-border;
      border-radius: 2px;
    }
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 4px;

    @media (max-width: 768px) {
      flex-direction: row;
      gap: 8px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 8px;
      text-decoration: none;
      color: #666;
      font-size: 13px;
      font-weight: 600;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;

      @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        gap: 6px;
        padding: 10px 8px;
        border-left: none;
        border-bottom: 2px solid transparent;
        white-space: nowrap;
        flex-shrink: 0;
      }

      &:hover {
        background: $color-light;
        color: $color-primary;
        border-left-color: $color-primary;
        transform: translateX(4px);

        @media (max-width: 768px) {
          border-left: none;
          border-bottom-color: $color-primary;
          transform: translateY(-2px);
        }
      }

      &.active {
        background: linear-gradient(135deg, rgba($color-primary, 0.1), rgba($color-secondary, 0.1));
        color: $color-primary;
        border-left-color: $color-primary;

        @media (max-width: 768px) {
          border-left: none;
          border-bottom-color: $color-primary;
        }
      }

      .nav-icon {
        font-size: 16px;
        flex-shrink: 0;
      }

      .nav-label {
        @media (max-width: 768px) {
          font-size: 11px;
        }
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// CONTENT
// ═══════════════════════════════════════════════════════════════════

.auth-content {
  padding: 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 20px;
  }
}
</style>
