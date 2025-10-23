<template>
  <div class="creator-lobby">
    <!-- Animated Banner -->
    <div class="lobby-banner">
      ⭐ YOU'RE IN! ⭐ LET'S CREATE SOMETHING AMAZING ⭐ YOUR VOICE. YOUR CONTENT. ⭐
    </div>

    <!-- Profile Prompt or Card Section -->
    <div class="container">
      <section v-if="!hasCompletedProfile" class="profile-prompt">
        <div class="prompt-card">
          <h3>✨ Before You Start Creating...</h3>
          <p>We'd love to know more about your brand and voice. It takes about 10 minutes and helps us generate ideas that sound like YOU.</p>
          <router-link to="/profile" class="btn-prompt">Tell Us About Yourself</router-link>
          <p class="skip-text">You can always do this later from your settings</p>
        </div>
      </section>

      <section v-else class="profile-section">
        <ProfileCard />
      </section>
    </div>

    <!-- Welcome Hero -->
    <section class="welcome-hero">
      <div class="hero-title">LET'S CREATE<br />SOMETHING AMAZING</div>
      <div class="hero-subtitle">🎨 YOUR AUTHENTIC VOICE ✨</div>
      <div class="hero-description">
        You've unlocked your creator dashboard. Now let's build content that sounds unmistakably YOU. 
        PB+J AI is here to assist, never to replace your voice. Let's go.
      </div>
      <button class="cta-big">★ START CREATING NOW ★</button>
    </section>

    <!-- Main Action Grid -->
    <div class="container">
      <div class="action-grid">
        <div class="action-card">
          <div class="card-number">1</div>
          <div class="card-title">✨ GENERATE IDEAS</div>
          <div class="card-text">AI-powered ideas that match YOUR voice</div>
          <button class="card-btn">Begin →</button>
        </div>

        <div class="action-card">
          <div class="card-number">2</div>
          <div class="card-title">📅 SCHEDULE POSTS</div>
          <div class="card-text">Auto-publish to all platforms at once</div>
          <button class="card-btn">Manage →</button>
        </div>

        <div class="action-card">
          <div class="card-number">3</div>
          <div class="card-title">🎯 BRAND KIT</div>
          <div class="card-text">Manage your colors, fonts, tone</div>
          <button class="card-btn">Setup →</button>
        </div>

        <div class="action-card">
          <div class="card-number">4</div>
          <div class="card-title">📊 ANALYTICS</div>
          <div class="card-text">Track reach, engagement, growth</div>
          <button class="card-btn">View →</button>
        </div>
      </div>

      <!-- Latest Drafts Section -->
      <div class="drafts-container">
        <h2 class="section-title">YOUR LATEST DRAFTS</h2>
        <div class="drafts-grid">
          <div class="draft-card">
            <div class="draft-number">1</div>
            <div class="draft-emoji">📝</div>
            <div class="draft-info">
              <h3>Q4 Product Launch</h3>
              <p>LinkedIn • Oct 22</p>
            </div>
            <button class="draft-btn">→</button>
          </div>
          <div class="draft-card">
            <div class="draft-number">2</div>
            <div class="draft-emoji">🎥</div>
            <div class="draft-info">
              <h3>Behind-the-Scenes</h3>
              <p>TikTok • Oct 20</p>
            </div>
            <button class="draft-btn">→</button>
          </div>
          <div class="draft-card">
            <div class="draft-number">3</div>
            <div class="draft-emoji">💬</div>
            <div class="draft-info">
              <h3>Industry Insights</h3>
              <p>Twitter • Oct 18</p>
            </div>
            <button class="draft-btn">→</button>
          </div>
        </div>
        <button class="view-all">VIEW ALL DRAFTS →</button>
      </div>

      <!-- Stats Section -->
      <div class="stats-section">
        <div class="stat-box">
          <div class="stat-number">12</div>
          <div class="stat-label">DRAFTS</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">8</div>
          <div class="stat-label">PUBLISHED</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">2.4K</div>
          <div class="stat-label">REACH</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">342</div>
          <div class="stat-label">ENGAGED</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProfileCard from '../components/ProfileCard.vue'

const hasCompletedProfile = ref(false)

onMounted(() => {
  const completed = localStorage.getItem('profile_completed')
  hasCompletedProfile.value = completed === 'true'
})
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.creator-lobby {
  font-family: 'MS Gothic', 'Courier New', monospace;
  background: #fff;
  color: #000;
}

// ═══════════════════════════════════════════════════════════════════
// BANNER
// ═══════════════════════════════════════════════════════════════════

.lobby-banner {
  background: linear-gradient(90deg, #ff6b6b 0%, #feca57 25%, #48dbfb 50%, #ff9ff3 75%, #ff6b6b 100%);
  padding: 5px 0;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  color: #000;
  letter-spacing: 2px;
  animation: rainbow 6s linear infinite;

  @keyframes rainbow {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
}

// ═══════════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════

.welcome-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 50px 20px;
  text-align: center;
  border-bottom: 5px solid #ff6b6b;
  position: relative;
  overflow: hidden;

  &::before {
    content: '🥜�🥜�🥜�🥜�🥜�🥜�🥜�';
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    font-size: 22px;
    opacity: 0.25;
  }
}

.hero-title {
  font-size: 2.8rem;
  color: #fff;
  text-shadow: 4px 4px 0 #000, 8px 8px 0 rgba(0, 0, 0, 0.3);
  margin-bottom: 12px;
  letter-spacing: 3px;
  font-weight: bold;
  position: relative;
  z-index: 1;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #feca57;
  background: #000;
  display: inline-block;
  padding: 10px 18px;
  border: 3px solid #fff;
  margin-bottom: 18px;
  font-weight: bold;
  position: relative;
  z-index: 1;
}

.hero-description {
  background: rgba(255, 255, 255, 0.95);
  color: #000;
  padding: 16px;
  margin: 18px auto;
  max-width: 700px;
  border: 3px solid #000;
  font-size: 14px;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

.cta-big {
  background: #ff6b6b;
  color: #fff;
  padding: 16px 32px;
  border: 4px solid #000;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: 'MS Gothic', 'Courier New', monospace;
  box-shadow: 6px 6px 0 #000;
  transition: all 0.2s;
  position: relative;
  z-index: 1;

  &:hover {
    background: #feca57;
    color: #000;
    transform: translate(-3px, -3px);
    box-shadow: 9px 9px 0 #000;
  }

  &:active {
    transform: translate(0);
  }
}

// ═══════════════════════════════════════════════════════════════════
// CONTAINER & LAYOUT
// ═══════════════════════════════════════════════════════════════════

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

// ═══════════════════════════════════════════════════════════════════
// ACTION GRID
// ═══════════════════════════════════════════════════════════════════

.action-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin: 20px 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.action-card {
  background: #fff;
  border: 3px solid #000;
  padding: 18px;
  position: relative;
  transition: all 0.3s;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05);
    box-shadow: 8px 8px 0 #ff6b6b;
  }
}

.card-number {
  position: absolute;
  top: -15px;
  left: -15px;
  background: #feca57;
  color: #000;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.card-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-text {
  font-size: 12px;
  line-height: 1.6;
  margin-bottom: 12px;
  color: #333;
}

.card-btn {
  background: #667eea;
  border: 2px solid #000;
  color: #fff;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  font-family: 'MS Gothic', 'Courier New', monospace;
  transition: all 0.2s;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);

  &:hover {
    background: #ff6b6b;
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.2);
  }
}

// ═══════════════════════════════════════════════════════════════════
// DRAFTS SECTION
// ═══════════════════════════════════════════════════════════════════

.drafts-container {
  background: #fff;
  border: 3px solid #000;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.2);
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.drafts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.draft-card {
  background: #f5f5f5;
  border: 3px solid #000;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    background: #48dbfb;
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
  }
}

.draft-number {
  position: absolute;
  top: -10px;
  left: -10px;
  background: #feca57;
  color: #000;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.draft-emoji {
  font-size: 28px;
  flex-shrink: 0;
}

.draft-info {
  flex: 1;
  min-width: 0;
}

.draft-info h3 {
  font-size: 12px;
  font-weight: bold;
  color: #000;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.draft-info p {
  font-size: 11px;
  color: #666;
  margin: 0;
}

.draft-btn {
  background: #667eea;
  border: 2px solid #000;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 0;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);

  &:hover {
    background: #ff6b6b;
    transform: translate(-1px, -1px);
  }
}

.view-all {
  display: block;
  width: 100%;
  background: #000;
  color: #fff;
  border: 3px solid #000;
  padding: 12px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  font-family: 'MS Gothic', 'Courier New', monospace;
  letter-spacing: 1px;
  transition: all 0.2s;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);

  &:hover {
    background: #667eea;
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3);
  }
}

// ═══════════════════════════════════════════════════════════════════
// STATS SECTION
// ═══════════════════════════════════════════════════════════════════

.stats-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 20px 0;
  background: #000;
  padding: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

// ═══════════════════════════════════════════════════════════════════
// PROFILE SECTION
// ═══════════════════════════════════════════════════════════════════

.profile-prompt {
  margin-bottom: 30px;
  animation: slideDown 0.5s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.prompt-card {
  border: 3px solid #ff6b6b;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(254, 202, 87, 0.1));
  padding: 24px;
  border-radius: 8px;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    font-family: 'Courier New', monospace;
    font-size: 1.25rem;
    font-weight: 700;
    color: #000;
    margin: 0 0 12px 0;
    letter-spacing: 1px;
  }

  p {
    color: #333;
    margin: 12px 0;
    line-height: 1.6;
    font-size: 0.95rem;
  }

  .skip-text {
    font-size: 0.85rem;
    color: #999;
    margin-top: 16px;
    font-style: italic;
  }
}

.btn-prompt {
  display: inline-block;
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border: 2px solid #000;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  margin: 16px 0;
  letter-spacing: 0.5px;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
  }
}

.profile-section {
  margin-bottom: 30px;
}

.stat-box {
  background: linear-gradient(135deg, #ff6b6b, #feca57);
  padding: 16px;
  text-align: center;
  border: 3px solid #fff;
  color: #000;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);
}

.stat-number {
  font-size: 2.2rem;
  font-weight: bold;
  text-shadow: 2px 2px 0 rgba(255, 255, 255, 0.5);
  margin: 0;
}

.stat-label {
  font-size: 11px;
  font-weight: bold;
  margin-top: 6px;
  letter-spacing: 1px;
}
</style>
