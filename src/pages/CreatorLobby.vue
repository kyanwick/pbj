<template>
  <div class="creator-lobby">
    <!-- Welcome Section -->
    <section class="welcome-section">
      <h1 class="welcome-title">Welcome back, Creator</h1>
      <p class="welcome-subtitle">Your authentic voice, amplified ethically</p>
    </section>

    <!-- Main Grid -->
    <div class="lobby-grid">
      <!-- Left Column: Start Creating (Primary CTA) -->
      <section class="grid-item start-creating">
        <div class="card-content">
          <div class="icon-large">🎨</div>
          <h2>Start Creating</h2>
          <p>Generate authentic content that matches your brand voice</p>
          <button class="btn-action-primary">
            Begin →
          </button>
        </div>
        <div class="card-accent top-left"></div>
        <div class="card-accent bottom-right"></div>
      </section>

      <!-- Right Column: Two Stacked Cards -->
      <div class="grid-right">
        <!-- Your Latest Drafts -->
        <section class="grid-item latest-drafts">
          <div class="card-header">
            <h3>Your Latest Drafts</h3>
            <span class="badge">3</span>
          </div>
          <div class="drafts-list">
            <div class="draft-item">
              <div class="draft-icon">📝</div>
              <div class="draft-info">
                <div class="draft-title">Q4 Product Launch Announcement</div>
                <div class="draft-meta">LinkedIn • Oct 22</div>
              </div>
              <button class="btn-icon">→</button>
            </div>
            <div class="draft-item">
              <div class="draft-icon">🎥</div>
              <div class="draft-info">
                <div class="draft-title">Behind-the-Scenes Content Series</div>
                <div class="draft-meta">TikTok • Oct 20</div>
              </div>
              <button class="btn-icon">→</button>
            </div>
            <div class="draft-item">
              <div class="draft-icon">💬</div>
              <div class="draft-info">
                <div class="draft-title">Industry Insights Thread</div>
                <div class="draft-meta">Twitter • Oct 18</div>
              </div>
              <button class="btn-icon">→</button>
            </div>
          </div>
          <button class="btn-secondary">View All Drafts</button>
        </section>

        <!-- Community Updates -->
        <section class="grid-item community-updates">
          <div class="card-header">
            <h3>Community Pulse</h3>
            <span class="icon-new">✨</span>
          </div>
          <div class="updates-placeholder">
            <div class="placeholder-icon">🌍</div>
            <p>See what creators are sharing</p>
            <p class="placeholder-subtext">Coming soon</p>
          </div>
        </section>
      </div>
    </div>

    <!-- Quick Stats -->
    <section class="quick-stats">
      <div class="stat-box">
        <div class="stat-value">12</div>
        <div class="stat-label">Drafts</div>
      </div>
      <div class="stat-box">
        <div class="stat-value">8</div>
        <div class="stat-label">Published</div>
      </div>
      <div class="stat-box">
        <div class="stat-value">2.4K</div>
        <div class="stat-label">Reach</div>
      </div>
      <div class="stat-box">
        <div class="stat-value">342</div>
        <div class="stat-label">Engaged</div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Dashboard logic here
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
$font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

.creator-lobby {
  font-family: $font-sans;
  max-width: 1000px;
  margin: 0 auto;

  // ═══════════════════════════════════════════════════════════════════
  // WELCOME SECTION
  // ═══════════════════════════════════════════════════════════════════

  .welcome-section {
    text-align: center;
    margin-bottom: 40px;

    @media (max-width: 768px) {
      margin-bottom: 30px;
    }

    .welcome-title {
      font-size: 36px;
      font-weight: 900;
      color: $color-dark;
      margin: 0 0 8px 0;
      background: linear-gradient(135deg, $color-primary, $color-secondary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;

      @media (max-width: 768px) {
        font-size: 26px;
      }
    }

    .welcome-subtitle {
      font-size: 15px;
      color: #999;
      margin: 0;
      font-style: italic;

      @media (max-width: 768px) {
        font-size: 13px;
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // GRID
  // ═══════════════════════════════════════════════════════════════════

  .lobby-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 24px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  // Grid Items
  .grid-item {
    background: white;
    border: 2px solid $color-border;
    border-radius: 12px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      border-color: $color-primary;
      box-shadow: 0 8px 24px rgba($color-primary, 0.15);
    }

    @media (max-width: 768px) {
      padding: 20px;
    }
  }

  // Card Accents
  .card-accent {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba($color-primary, 0.1), rgba($color-secondary, 0.1));
    pointer-events: none;

    &.top-left {
      top: -40px;
      left: -40px;
    }

    &.bottom-right {
      bottom: -40px;
      right: -40px;
      background: linear-gradient(135deg, rgba($color-accent-yellow, 0.1), rgba($color-accent-red, 0.1));
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // START CREATING
  // ═══════════════════════════════════════════════════════════════════

  .start-creating {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 350px;
    background: linear-gradient(135deg, rgba($color-primary, 0.03), rgba($color-secondary, 0.03));
    grid-row: span 2;

    @media (max-width: 768px) {
      grid-row: auto;
      min-height: 280px;
    }

    .card-content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .icon-large {
      font-size: 56px;
      animation: floatIcon 3s ease-in-out infinite;

      @keyframes floatIcon {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-8px);
        }
      }
    }

    h2 {
      font-size: 26px;
      font-weight: 800;
      color: $color-dark;
      margin: 0;

      @media (max-width: 768px) {
        font-size: 20px;
      }
    }

    p {
      font-size: 13px;
      color: #777;
      margin: 0;
      max-width: 260px;
      line-height: 1.4;
    }
  }

  .btn-action-primary {
    background: linear-gradient(135deg, $color-accent-yellow, $color-accent-red);
    color: white;
    border: none;
    padding: 11px 28px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    margin-top: 8px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba($color-accent-red, 0.3);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba($color-accent-red, 0.4);
    }

    &:active {
      transform: translateY(-1px);
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // RIGHT COLUMN
  // ═══════════════════════════════════════════════════════════════════

  .grid-right {
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (max-width: 768px) {
      gap: 20px;
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // LATEST DRAFTS
  // ═══════════════════════════════════════════════════════════════════

  .latest-drafts {
    display: flex;
    flex-direction: column;
    gap: 14px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;

      h3 {
        font-size: 17px;
        font-weight: 700;
        color: $color-dark;
        margin: 0;
      }

      .badge {
        background: linear-gradient(135deg, $color-accent-cyan, $color-primary);
        color: white;
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 600;
      }
    }

    .drafts-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .draft-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 11px;
      background: $color-light;
      border-radius: 8px;
      transition: all 0.2s ease;
      cursor: pointer;

      &:hover {
        background: #f0f2f5;
        transform: translateX(3px);
      }

      .draft-icon {
        font-size: 18px;
        flex-shrink: 0;
      }

      .draft-info {
        flex: 1;
        min-width: 0;
      }

      .draft-title {
        font-size: 12px;
        font-weight: 600;
        color: $color-dark;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .draft-meta {
        font-size: 10px;
        color: #aaa;
        margin-top: 2px;
      }

      .btn-icon {
        background: none;
        border: none;
        color: $color-primary;
        font-size: 14px;
        cursor: pointer;
        padding: 4px 6px;
        border-radius: 4px;
        transition: all 0.2s ease;

        &:hover {
          background: white;
          color: $color-secondary;
        }
      }
    }
  }

  .btn-secondary {
    background: white;
    border: 2px solid $color-primary;
    color: $color-primary;
    padding: 9px 18px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 6px;

    &:hover {
      background: linear-gradient(135deg, rgba($color-primary, 0.1), rgba($color-secondary, 0.1));
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // COMMUNITY UPDATES
  // ═══════════════════════════════════════════════════════════════════

  .community-updates {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-height: 200px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        font-size: 17px;
        font-weight: 700;
        color: $color-dark;
        margin: 0;
      }

      .icon-new {
        font-size: 15px;
      }
    }

    .updates-placeholder {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: 10px;
      padding: 20px;

      .placeholder-icon {
        font-size: 42px;
        opacity: 0.4;
      }

      p {
        font-size: 12px;
        color: #aaa;
        margin: 0;
      }

      .placeholder-subtext {
        font-size: 11px;
        color: #ddd;
        font-style: italic;
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // QUICK STATS
  // ═══════════════════════════════════════════════════════════════════

  .quick-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }

    .stat-box {
      background: white;
      border: 2px solid $color-border;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      transition: all 0.2s ease;

      &:hover {
        border-color: $color-primary;
        box-shadow: 0 4px 12px rgba($color-primary, 0.1);
        transform: translateY(-2px);
      }

      .stat-value {
        font-size: 22px;
        font-weight: 800;
        background: linear-gradient(135deg, $color-primary, $color-secondary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0;
      }

      .stat-label {
        font-size: 11px;
        color: #999;
        margin-top: 6px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }
  }
}
</style>
