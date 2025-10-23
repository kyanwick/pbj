<template>
  <div class="pbj-page">
    <!-- Top Banner -->
    <div class="top-banner">
      ⭐ SPECIAL OFFER: EARLY ACCESS NOW AVAILABLE ⭐ LIMITED SPOTS ⭐ JOIN TODAY ⭐
    </div>

    <!-- Notification Bar -->
    <div class="notification-bar">
      🔥 NEW: AI Content Assistant v2.0 Released! | 🎉 500+ Creators Already Using PB+J | 💡 Check Out Latest Features
    </div>

    <!-- Main Hero -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-title">
          CONTENT CREATION<br />WITHOUT LOSING<br />YOUR VOICE
        </div>
        <div class="hero-emoji">🥜 + 🍇 = PERFECT BLEND</div>
        <div class="hero-description">
          Personal Brand Hub powered by ethical AI. Generate, schedule, and publish content while staying true to your authentic voice.
        </div>
        <div class="cta-button">START FREE TODAY →</div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="features-section">
      <div class="section-title">🚀 FEATURES</div>
      <div class="features-grid">
        <div class="feature-box">
          <div class="feature-icon">✍️</div>
          <div class="feature-title">AI WRITER</div>
          <div class="feature-desc">Generate content ideas in seconds</div>
        </div>
        <div class="feature-box">
          <div class="feature-icon">📅</div>
          <div class="feature-title">SCHEDULER</div>
          <div class="feature-desc">Post to multiple platforms at once</div>
        </div>
        <div class="feature-box">
          <div class="feature-icon">🎨</div>
          <div class="feature-title">BRAND KIT</div>
          <div class="feature-desc">Manage your visual identity</div>
        </div>
        <div class="feature-box">
          <div class="feature-icon">📊</div>
          <div class="feature-title">ANALYTICS</div>
          <div class="feature-desc">Track performance & engagement</div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stat-box">
        <div class="stat-number">500+</div>
        <div class="stat-label">Creators Onboard</div>
      </div>
      <div class="stat-box">
        <div class="stat-number">50K+</div>
        <div class="stat-label">Posts Published</div>
      </div>
      <div class="stat-box">
        <div class="stat-number">99.9%</div>
        <div class="stat-label">Uptime Guarantee</div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="pricing-section">
      <div class="section-title">💰 PRICING</div>
      <div class="pricing-grid">
        <div class="pricing-box">
          <div class="plan-name">FREE</div>
          <div class="plan-price">$0</div>
          <div class="plan-description">Perfect for getting started</div>
          <ul class="plan-features">
            <li>✓ 5 posts/month</li>
            <li>✓ Basic AI features</li>
            <li>✓ 1 social account</li>
          </ul>
          <button class="plan-button">GET STARTED</button>
        </div>
        <div class="pricing-box featured">
          <div class="plan-name">⭐ PRO</div>
          <div class="plan-price">$29<span>/mo</span></div>
          <div class="plan-description">For growing creators</div>
          <ul class="plan-features">
            <li>✓ Unlimited posts</li>
            <li>✓ Advanced AI tools</li>
            <li>✓ 5 social accounts</li>
            <li>✓ Analytics</li>
          </ul>
          <button class="plan-button">START TRIAL</button>
        </div>
        <div class="pricing-box">
          <div class="plan-name">AGENCY</div>
          <div class="plan-price">$99<span>/mo</span></div>
          <div class="plan-description">For managing teams</div>
          <ul class="plan-features">
            <li>✓ Everything in Pro</li>
            <li>✓ Team collaboration</li>
            <li>✓ Custom workflows</li>
            <li>✓ Priority support</li>
          </ul>
          <button class="plan-button">CONTACT US</button>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="final-cta">
      <div class="cta-text">READY TO LEVEL UP YOUR CONTENT?</div>
      <button class="cta-big-button">JOIN THE REVOLUTION →</button>
    </section>
  </div>
</template>

<script setup lang="ts">
// Component logic
</script>

<style scoped lang="scss">
$primary: #667eea;
$secondary: #764ba2;
$accent1: #ff6b6b;
$accent2: #feca57;
$accent3: #48dbfb;
$dark: #000;
$light: #fff;

.pbj-page {
  background: #f9f9f9;
  font-family: 'Courier New', monospace;
}

/* Top Banner */
.top-banner {
  background: linear-gradient(90deg, $accent1 0%, $accent2 25%, $accent3 50%, #ff9ff3 75%, $accent1 100%);
  padding: 8px 0;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  color: $dark;
  letter-spacing: 2px;
  overflow: hidden;
  white-space: nowrap;
}

/* Notification Bar */
.notification-bar {
  background: $accent2;
  padding: 12px;
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  border-bottom: 3px dashed $dark;
  color: $dark;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, $primary 0%, $secondary 100%);
  padding: 60px 20px;
  text-align: center;
  border-bottom: 6px solid $accent1;
  position: relative;
  overflow: hidden;

  &::before {
    content: '🥜🍇🥜🍇🥜🍇🥜🍇🥜🍇🥜🍇🥜🍇';
    position: absolute;
    top: 5px;
    left: 0;
    right: 0;
    font-size: 24px;
    opacity: 0.2;
    animation: float 20s infinite;
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: $light;
  text-shadow: 5px 5px 0 rgba($dark, 0.4), 8px 8px 0 rgba($dark, 0.2);
  margin-bottom: 20px;
  letter-spacing: 2px;
  line-height: 1.2;
}

.hero-emoji {
  background: $dark;
  color: $accent2;
  display: inline-block;
  padding: 12px 24px;
  border: 3px solid $light;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 20px;
  box-shadow: 5px 5px 0 rgba($dark, 0.5);
}

.hero-description {
  background: rgba($light, 0.95);
  color: $dark;
  padding: 20px;
  margin: 20px auto;
  max-width: 600px;
  border: 3px solid $dark;
  font-size: 15px;
  line-height: 1.6;
  font-weight: 500;
}

.cta-button {
  background: $accent1;
  color: $light;
  padding: 18px 40px;
  border: 4px solid $dark;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 6px 6px 0 $dark;
  transition: all 0.2s;
  display: inline-block;
  margin-top: 20px;

  &:hover {
    background: $accent2;
    color: $dark;
    transform: translate(-3px, -3px);
    box-shadow: 9px 9px 0 $dark;
  }
}

/* Features Section */
.features-section {
  padding: 40px 20px;
  background: #fff;
  border-bottom: 3px solid $dark;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
  background: linear-gradient(135deg, $primary, $secondary);
  color: $light;
  padding: 15px;
  border: 3px solid $dark;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 4px 4px 0 $dark;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-box {
  background: #fff;
  border: 3px solid $dark;
  padding: 25px;
  text-align: center;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.08);
    box-shadow: 8px 8px 0 $accent1;
    border-color: $accent1;
  }
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 12px;
}

.feature-title {
  font-size: 1.1rem;
  font-weight: bold;
  background: $accent3;
  color: $dark;
  padding: 8px;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.feature-desc {
  font-size: 13px;
  color: #666;
}

/* Stats Section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  padding: 20px;
  background: $dark;
}

.stat-box {
  background: linear-gradient(135deg, $accent1, $accent2);
  padding: 25px;
  text-align: center;
  border: 3px solid $light;
  color: $dark;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.stat-label {
  font-size: 12px;
  margin-top: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Pricing Section */
.pricing-section {
  padding: 40px 20px;
  background: #f0f0f0;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-box {
  background: $light;
  border: 3px solid $dark;
  padding: 25px;
  text-align: center;
  transition: all 0.3s;
  position: relative;

  &.featured {
    border: 5px solid $accent1;
    transform: scale(1.05);
    box-shadow: 8px 8px 0 $accent1;

    .plan-button {
      background: $accent1;
      border-color: $dark;
    }
  }

  &:hover {
    box-shadow: 8px 8px 0 rgba($dark, 0.3);
  }
}

.plan-name {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.plan-price {
  font-size: 2.5rem;
  font-weight: bold;
  color: $primary;
  margin-bottom: 8px;

  span {
    font-size: 0.8em;
    color: #666;
  }
}

.plan-description {
  font-size: 12px;
  color: #666;
  margin-bottom: 15px;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  text-align: left;
  font-size: 13px;

  li {
    padding: 8px 0;
    border-bottom: 1px dashed #ccc;

    &:last-child {
      border-bottom: none;
    }
  }
}

.plan-button {
  background: $accent3;
  color: $dark;
  padding: 12px 24px;
  border: 2px solid $dark;
  font-weight: bold;
  cursor: pointer;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s;
  width: 100%;

  &:hover {
    background: $accent2;
    box-shadow: 4px 4px 0 $dark;
  }
}

/* Final CTA */
.final-cta {
  background: linear-gradient(135deg, $secondary, $primary);
  padding: 50px 20px;
  text-align: center;
  border-top: 6px solid $accent1;
  border-bottom: 6px solid $accent1;
}

.cta-text {
  font-size: 2rem;
  color: $light;
  text-shadow: 3px 3px 0 rgba($dark, 0.3);
  margin-bottom: 25px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.cta-big-button {
  background: $accent1;
  color: $light;
  padding: 20px 50px;
  border: 4px solid $light;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 8px 8px 0 rgba($dark, 0.5);
  transition: all 0.2s;

  &:hover {
    background: $accent2;
    color: $dark;
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0 rgba($dark, 0.5);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .pricing-box.featured {
    transform: scale(1);
  }

  .cta-text {
    font-size: 1.3rem;
  }
}
</style>
