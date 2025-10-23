<template>
  <div class="creator-lobby">
    <!-- Animated Banner -->
    <div class="lobby-banner">
      ⚡ YOU'RE IN! ⚡ LET'S CREATE SOMETHING AMAZING ⚡ YOUR VOICE. YOUR CONTENT. ⚡
    </div>

    <!-- Welcome Hero -->
    <section class="welcome-hero">
      <div class="welcome-content">
        <div class="welcome-emoji">🎨</div>
        <h1 class="welcome-title">LET'S CREATE MAGIC</h1>
        <p class="welcome-subtitle">Your authentic voice, amplified ethically</p>
        <button class="cta-huge">START CREATING NOW →</button>
      </div>
    </section>

    <!-- Main Action Cards Grid -->
    <section class="cards-section">
      <div class="action-card primary-card">
        <div class="card-emoji">✨</div>
        <h2>GENERATE CONTENT</h2>
        <p>AI-powered ideas that match YOUR voice</p>
        <button class="card-btn primary">Begin →</button>
      </div>

      <div class="action-card">
        <div class="card-emoji">📅</div>
        <h2>SCHEDULE POSTS</h2>
        <p>Auto-publish to all your platforms</p>
        <button class="card-btn">Manage →</button>
      </div>

      <div class="action-card">
        <div class="card-emoji">🎯</div>
        <h2>BRAND KIT</h2>
        <p>Manage colors, fonts, tone of voice</p>
        <button class="card-btn">Setup →</button>
      </div>

      <div class="action-card">
        <div class="card-emoji">📊</div>
        <h2>ANALYTICS</h2>
        <p>Track reach, engagement, growth</p>
        <button class="card-btn">View →</button>
      </div>
    </section>

    <!-- Latest Drafts Section -->
    <section class="drafts-section">
      <div class="section-header">
        <h2>YOUR LATEST DRAFTS</h2>
        <span class="draft-count">3</span>
      </div>
      <div class="drafts-grid">
        <div class="draft-card">
          <div class="draft-emoji">📝</div>
          <div class="draft-details">
            <h3>Q4 Product Launch</h3>
            <p>LinkedIn • Oct 22</p>
          </div>
          <button class="draft-btn">→</button>
        </div>
        <div class="draft-card">
          <div class="draft-emoji">🎥</div>
          <div class="draft-details">
            <h3>Behind-the-Scenes</h3>
            <p>TikTok • Oct 20</p>
          </div>
          <button class="draft-btn">→</button>
        </div>
        <div class="draft-card">
          <div class="draft-emoji">💬</div>
          <div class="draft-details">
            <h3>Industry Insights</h3>
            <p>Twitter • Oct 18</p>
          </div>
          <button class="draft-btn">→</button>
        </div>
      </div>
      <button class="view-all-btn">VIEW ALL DRAFTS →</button>
    </section>

    <!-- Stats Bar -->
    <section class="stats-bar">
      <div class="stat-item">
        <div class="stat-big">12</div>
        <div class="stat-small">DRAFTS</div>
      </div>
      <div class="stat-item">
        <div class="stat-big">8</div>
        <div class="stat-small">PUBLISHED</div>
      </div>
      <div class="stat-item">
        <div class="stat-big">2.4K</div>
        <div class="stat-small">REACH</div>
      </div>
      <div class="stat-item">
        <div class="stat-big">342</div>
        <div class="stat-small">ENGAGED</div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Dashboard logic here
</script>

<style scoped lang="scss">
$primary: #667eea;
$secondary: #764ba2;
$accent1: #ff6b6b;
$accent2: #feca57;
$accent3: #48dbfb;
$dark: #000;
$light: #fff;

.creator-lobby {
  background: #f9f9f9;
  font-family: 'Courier New', monospace;
  padding-bottom: 40px;
}

// ═══════════════════════════════════════════════════════════════════
// BANNER
// ═══════════════════════════════════════════════════════════════════

.lobby-banner {
  background: linear-gradient(90deg, $accent1 0%, $accent2 25%, $accent3 50%, #ff9ff3 75%, $accent1 100%);
  padding: 10px 0;
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  color: $dark;
  letter-spacing: 2px;
  overflow: hidden;
  white-space: nowrap;
  animation: scrollBanner 20s linear infinite;

  @keyframes scrollBanner {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
}

// ═══════════════════════════════════════════════════════════════════
// WELCOME HERO
// ═══════════════════════════════════════════════════════════════════

.welcome-hero {
  background: linear-gradient(135deg, $primary 0%, $secondary 100%);
  padding: 80px 20px;
  text-align: center;
  border-bottom: 6px solid $accent1;
  position: relative;
  overflow: hidden;

  &::before {
    content: '🎨✨🎨✨🎨✨🎨✨🎨✨🎨✨🎨✨';
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    font-size: 28px;
    opacity: 0.15;
    animation: float 20s infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
}

.welcome-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.welcome-emoji {
  font-size: 72px;
  margin-bottom: 20px;
  animation: bounce 2s ease-in-out infinite;

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
}

.welcome-title {
  font-size: 3.2rem;
  font-weight: bold;
  color: $light;
  text-shadow: 5px 5px 0 rgba($dark, 0.4), 8px 8px 0 rgba($dark, 0.2);
  margin: 0 0 12px 0;
  line-height: 1.2;
}

.welcome-subtitle {
  font-size: 16px;
  color: rgba($light, 0.9);
  margin: 0 0 24px 0;
  font-style: italic;
}

.cta-huge {
  background: linear-gradient(135deg, $accent2, $accent1);
  border: 3px solid $dark;
  padding: 16px 40px;
  font-size: 18px;
  font-weight: bold;
  color: $dark;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 6px 6px 0 rgba($dark, 0.3);
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 9px 9px 0 rgba($dark, 0.3);
  }

  &:active {
    transform: translate(0);
    box-shadow: 3px 3px 0 rgba($dark, 0.3);
  }
}

// ═══════════════════════════════════════════════════════════════════
// ACTION CARDS
// ═══════════════════════════════════════════════════════════════════

.cards-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 30px 16px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 20px 12px;
  }
}

.action-card {
  background: $light;
  border: 4px solid $dark;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 4px 4px 0 rgba($dark, 0.2);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 8px 8px 0 rgba($dark, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, $accent1, $accent2, $accent3);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover::before {
    opacity: 0.1;
  }

  &.primary-card {
    border-color: $accent1;
    background: linear-gradient(135deg, rgba($accent2, 0.1), rgba($accent1, 0.05));
  }
}

.card-emoji {
  font-size: 48px;
  margin-bottom: 12px;
  display: block;
}

.action-card h2 {
  font-size: 18px;
  font-weight: bold;
  color: $dark;
  margin: 0 0 8px 0;
  letter-spacing: 1px;
}

.action-card p {
  font-size: 13px;
  color: #666;
  margin: 0 0 16px 0;
  line-height: 1.4;
}

.card-btn {
  background: $primary;
  border: 2px solid $dark;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: bold;
  color: $light;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  transition: all 0.2s ease;
  box-shadow: 3px 3px 0 rgba($dark, 0.2);

  &:hover {
    background: $secondary;
    transform: translate(-2px, -2px);
  }

  &.primary {
    background: linear-gradient(135deg, $accent2, $accent1);
    color: $dark;
    box-shadow: 3px 3px 0 rgba($dark, 0.3);
  }
}

// ═══════════════════════════════════════════════════════════════════
// DRAFTS SECTION
// ═══════════════════════════════════════════════════════════════════

.drafts-section {
  background: $light;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 20px auto;
  border: 4px solid $dark;
  box-shadow: 6px 6px 0 rgba($dark, 0.2);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    font-size: 24px;
    font-weight: bold;
    color: $dark;
    margin: 0;
    letter-spacing: 1px;
  }

  .draft-count {
    background: linear-gradient(135deg, $accent3, $primary);
    color: $light;
    padding: 6px 14px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 14px;
  }
}

.drafts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.draft-card {
  background: #f9f9f9;
  border: 3px solid $dark;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 3px 3px 0 rgba($dark, 0.15);

  &:hover {
    background: $accent2;
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 rgba($dark, 0.15);
  }
}

.draft-emoji {
  font-size: 32px;
  flex-shrink: 0;
}

.draft-details {
  flex: 1;
  min-width: 0;
}

.draft-details h3 {
  font-size: 13px;
  font-weight: bold;
  color: $dark;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.draft-details p {
  font-size: 11px;
  color: #888;
  margin: 0;
}

.draft-btn {
  background: $primary;
  border: 2px solid $dark;
  width: 36px;
  height: 36px;
  border-radius: 0;
  font-size: 16px;
  font-weight: bold;
  color: $light;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;
  box-shadow: 2px 2px 0 rgba($dark, 0.2);

  &:hover {
    background: $accent1;
    transform: translate(-1px, -1px);
  }
}

.view-all-btn {
  display: block;
  width: 100%;
  background: $dark;
  color: $light;
  border: 3px solid $dark;
  padding: 12px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
  transition: all 0.2s ease;
  box-shadow: 4px 4px 0 rgba($dark, 0.3);

  &:hover {
    background: $primary;
    color: $light;
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 rgba($dark, 0.3);
  }
}

// ═══════════════════════════════════════════════════════════════════
// STATS BAR
// ═══════════════════════════════════════════════════════════════════

.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 20px;
  max-width: 1200px;
  margin: 20px auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.stat-item {
  background: linear-gradient(135deg, $primary, $secondary);
  border: 3px solid $dark;
  padding: 20px;
  text-align: center;
  box-shadow: 4px 4px 0 rgba($dark, 0.2);
  transition: all 0.2s ease;

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 7px 7px 0 rgba($dark, 0.2);
  }
}

.stat-big {
  font-size: 36px;
  font-weight: bold;
  color: $light;
  text-shadow: 3px 3px 0 rgba($dark, 0.3);
  margin: 0;
}

.stat-small {
  font-size: 11px;
  color: rgba($light, 0.9);
  margin-top: 6px;
  letter-spacing: 1px;
  font-weight: bold;
}
</style>
