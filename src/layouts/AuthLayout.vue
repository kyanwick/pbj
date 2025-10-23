<template>
  <div class="authenticated-layout">
    <!-- Persistent Header -->
    <header class="auth-header">
      <div class="header-container">
        <div class="logo-section">
          <router-link to="/lobby" class="logo-link">
            <div class="logo">PB+J</div>
          </router-link>
          <div class="tagline">Creator Hub</div>
        </div>

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
  background: #f9f9f9;
}

// ═══════════════════════════════════════════════════════════════════
// HEADER - BOLD RETRO STYLE (MATCHING INDEXPAGE)
// ═══════════════════════════════════════════════════════════════════

.auth-header {
  background: linear-gradient(135deg, $color-primary 0%, $color-secondary 100%);
  border-bottom: 5px solid $color-accent-red;
  position: static;
  z-index: 100;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.2);

  .header-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
  }

  .logo-link {
    text-decoration: none;
  }

  .logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: $color-light;
  text-shadow: 2px 2px 0 $color-dark;
  letter-spacing: 3px;
  }

  .tagline {
   font-size: 9px;
   color: $color-accent-yellow;
   letter-spacing: 1px;
   margin-top: 3px;
   text-transform: uppercase;
  }

  .logo-section {
  background: linear-gradient(135deg, $primary, $secondary);
  padding: 12px;
  border: 2px solid $color-light;
  box-shadow: 4px 4px 0 rgba($color-accent-yellow, 0.6);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 2px 0 rgba($color-accent-yellow, 0.8);
  }
}

  .header-spacer {
    flex: 1;
  }

  .btn-create-header {
    background: $color-accent-red;
    color: $color-light;
    border: 3px solid $color-light;
    padding: 10px 20px;
    font-weight: bold;
    font-size: 13px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);
    font-family: $font-mono;
    letter-spacing: 1px;
    text-transform: uppercase;

    .icon {
      font-size: 16px;
    }

    &:hover {
      background: $color-accent-yellow;
      color: $color-dark;
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3);
    }

    &:active {
      transform: translate(0);
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
    }
  }

  .profile-section {
    position: relative;
  }

  .profile-btn {
    background: $color-light;
    border: 3px solid $color-light;
    cursor: pointer;
    padding: 2px;
    border-radius: 0;
    transition: all 0.2s ease;
    box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);

    &:hover {
      transform: translate(-1px, -1px);
      box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.2);
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 0;
      background: linear-gradient(135deg, $color-accent-yellow, $color-accent-red);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      color: $color-dark;
      font-size: 16px;
      border: 2px solid $color-dark;
      box-sizing: border-box;
    }
  }

  .profile-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: $color-light;
    border: 3px solid $color-dark;
    border-radius: 0;
    margin-top: 8px;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
    z-index: 101;
    min-width: 160px;
    overflow: hidden;

    .menu-item {
      display: block;
      padding: 12px 16px;
      text-decoration: none;
      color: $color-dark;
      font-size: 13px;
      border-bottom: 2px solid $color-dark;
      transition: background 0.2s ease;
      font-family: $font-mono;
      font-weight: bold;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: $color-accent-yellow;
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
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
}

// ═══════════════════════════════════════════════════════════════════
// SIDEBAR - BOLD RETRO STYLE
// ═══════════════════════════════════════════════════════════════════

.auth-sidebar {
  background: $color-light;
  border-right: 4px solid $color-dark;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 4px 0 0 rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 4px solid $color-dark;
    padding: 12px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    overflow-x: auto;
    box-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: $color-dark;
      border-radius: 0;
    }
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media (max-width: 768px) {
      flex-direction: row;
      gap: 8px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 0;
      text-decoration: none;
      color: $color-dark;
      font-size: 13px;
      font-weight: bold;
      transition: all 0.2s ease;
      border: 2px solid $color-dark;
      background: $color-light;
      font-family: $font-mono;
      letter-spacing: 1px;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);

      @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        gap: 6px;
        padding: 10px 12px;
        white-space: nowrap;
        flex-shrink: 0;
      }

      &:hover {
        background: $color-accent-yellow;
        border-color: $color-dark;
        transform: translate(-2px, -2px);
        box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);

        @media (max-width: 768px) {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);
        }
      }

      &.active {
        background: $color-accent-red;
        color: $color-light;
        border-color: $color-dark;
        font-weight: 900;
        box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);

        @media (max-width: 768px) {
          box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
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
  padding: 30px 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px 12px;
  }

  > * {
    width: 100%;
    max-width: 1200px;
  }
}
</style>
