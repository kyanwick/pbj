<template>
  <div class="pbj-layout">
    <!-- Header -->
    <header class="pbj-header">
      <div class="header-container">
        <div class="logo-section">
          <div class="logo-text">PB+J</div>
          <div class="tagline">Personal Brand Hub</div>
        </div>
        <nav class="nav-links">
          <router-link to="/">HOME</router-link>
          <router-link to="/lobby">LOBBY</router-link>
          <router-link to="/features">FEATURES</router-link>
          <router-link to="/pricing">PRICING</router-link>
          <router-link to="/blog">BLOG</router-link>
          <router-link to="/docs">DOCS</router-link>
        </nav>
        <div class="header-cta">
          <button class="sign-in">SIGN IN</button>
          <button class="get-started">GET STARTED</button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="pbj-main">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="pbj-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>PRODUCT</h4>
          <ul>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>COMPANY</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>LEGAL</h4>
          <ul>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Security</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>SOCIAL</h4>
          <ul>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Discord</a></li>
            <li><a href="#">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 PB+J - Personal Brand Hub. All Rights Reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Layout component
</script>

<style scoped lang="scss">
$primary: #667eea;
$secondary: #764ba2;
$accent1: #ff6b6b;
$accent2: #feca57;
$accent3: #48dbfb;
$dark: #000;
$light: #fff;

.pbj-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f9f9f9;
}

/* Header */
.pbj-header {
  background: $dark;
  border-bottom: 4px solid $accent1;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 200px 1fr 300px;
  gap: 20px;
  align-items: center;
  padding: 12px 20px;
}

.logo-section {
  background: linear-gradient(135deg, $primary, $secondary);
  padding: 12px;
  border: 2px solid $light;
  box-shadow: 4px 4px 0 rgba($accent1, 0.6);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 rgba($accent1, 0.8);
  }
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: $light;
  text-shadow: 2px 2px 0 $dark;
  letter-spacing: 3px;
}

.tagline {
  font-size: 9px;
  color: $accent2;
  letter-spacing: 1px;
  margin-top: 3px;
  text-transform: uppercase;
}

.nav-links {
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;

  a {
    background: #222;
    color: $light;
    padding: 8px 12px;
    text-decoration: none;
    border: 2px solid #444;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.2s;

    &:hover {
      background: $accent1;
      border-color: $light;
      color: $light;
      transform: translateY(-2px);
    }

    &.router-link-active {
      background: $accent1;
      border-color: $light;
    }
  }
}

.header-cta {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.sign-in,
.get-started {
  padding: 8px 15px;
  border: 2px solid $light;
  font-weight: bold;
  cursor: pointer;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s;
}

.sign-in {
  background: transparent;
  color: $light;

  &:hover {
    background: #333;
  }
}

.get-started {
  background: $accent1;
  color: $light;
  border-color: $accent1;
  box-shadow: 3px 3px 0 $accent2;

  &:hover {
    background: $accent2;
    color: $dark;
    border-color: $dark;
    box-shadow: 4px 4px 0 $dark;
  }
}

/* Main Content */
.pbj-main {
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

/* Footer */
.pbj-footer {
  background: $dark;
  color: $light;
  border-top: 4px solid $accent1;
  padding: 40px 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto 30px;
}

.footer-section {
  h4 {
    background: $accent3;
    color: $dark;
    padding: 8px;
    margin: 0 0 15px 0;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 10px;

    a {
      color: $light;
      text-decoration: none;
      font-size: 12px;
      transition: all 0.2s;

      &:hover {
        color: $accent2;
        text-decoration: underline;
      }
    }
  }
}

.footer-bottom {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 20px;
  border-top: 2px dashed #333;
  text-align: center;
  font-size: 11px;
  color: #999;
}

/* Responsive */
@media (max-width: 1000px) {
  .header-container {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .nav-links {
    order: 3;
    grid-column: 1 / -1;
  }

  .header-cta {
    justify-content: center;
    order: 2;
  }
}

@media (max-width: 640px) {
  .logo-text {
    font-size: 1.2rem;
  }

  .nav-links a {
    font-size: 9px;
    padding: 6px 8px;
  }

  .sign-in,
  .get-started {
    font-size: 9px;
    padding: 6px 10px;
  }
}
</style>
