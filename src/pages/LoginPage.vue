<template>
  <div class="login-page">
    <!-- Hero Banner -->
    <section class="login-hero">
      <div class="hero-content">
        <h1 class="hero-title">WELCOME BACK</h1>
        <p class="hero-subtitle">Sign in to access your creator dashboard</p>
      </div>
    </section>

    <!-- Login Form -->
    <section class="login-section">
      <div class="form-container">
        <div class="form-card">
          <h2>Sign In to PB+J</h2>

          <!-- Email Input -->
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              @blur="validateEmail"
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <!-- Password Input -->
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              @blur="validatePassword"
            />
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
          </div>

          <!-- General Error -->
          <div v-if="errors.general" class="general-error">
            {{ errors.general }}
          </div>

          <!-- Submit Button -->
          <button class="submit-btn" @click="handleLogin" :disabled="isLoading">
            {{ isLoading ? 'Signing in...' : 'SIGN IN' }}
          </button>

          <!-- Register Link -->
          <div class="form-footer">
            <p>Don't have an account? <router-link to="/register">Create one</router-link></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: '',
  general: ''
})

const validateEmail = () => {
  errors.email = ''
  if (!form.email) {
    errors.email = 'Email is required'
  } else if (!form.email.includes('@')) {
    errors.email = 'Please enter a valid email'
  }
}

const validatePassword = () => {
  errors.password = ''
  if (!form.password) {
    errors.password = 'Password is required'
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }
}

const handleLogin = async () => {
  // Clear previous general error
  errors.general = ''

  // Validate all fields
  validateEmail()
  validatePassword()

  if (errors.email || errors.password) {
    return
  }

  isLoading.value = true

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password
      })
    })

    const data = await response.json()

    if (!response.ok) {
      errors.general = data.message || 'Login failed. Please try again.'
      return
    }

    // Store token and user info
    localStorage.setItem('auth_token', data.data.token)
    localStorage.setItem('user_name', data.data.user.name)
    localStorage.setItem('user_id', data.data.user.id)

    router.push('/lobby')
  } catch (error) {
    errors.general = 'Connection error. Make sure backend is running at localhost:5000'
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped lang="scss">
$primary: #667eea;
$secondary: #764ba2;
$accent1: #ff6b6b;
$accent2: #feca57;
$accent3: #48dbfb;
$dark: #000;
$light: #fff;

.login-page {
  background: #f9f9f9;
  font-family: 'Courier New', monospace;
}

/* Hero Banner */
.login-hero {
  background: linear-gradient(135deg, $primary 0%, $secondary 100%);
  padding: 80px 20px;
  text-align: center;
  border-bottom: 6px solid $accent1;
  position: relative;
  overflow: hidden;

  &::before {
    content: '🔐🔐🔐🔐🔐🔐🔐🔐🔐🔐🔐🔐🔐🔐';
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

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  color: $light;
  text-shadow: 5px 5px 0 rgba($dark, 0.4);
  margin-bottom: 12px;
  letter-spacing: 2px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: rgba($light, 0.95);
  margin: 0;
  font-style: italic;
}

/* Login Form Section */
.login-section {
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
}

.form-container {
  width: 100%;
  max-width: 500px;
}

.form-card {
  background: $light;
  border: 4px solid $dark;
  padding: 40px;
  box-shadow: 8px 8px 0 rgba($dark, 0.2);

  h2 {
    font-size: 24px;
    font-weight: bold;
    color: $dark;
    margin: 0 0 30px 0;
    text-align: center;
    letter-spacing: 1px;
    text-shadow: 2px 2px 0 rgba($accent1, 0.3);
  }
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  label {
    font-size: 12px;
    font-weight: bold;
    color: $dark;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  input {
    border: 3px solid $dark;
    padding: 12px;
    font-size: 14px;
    font-family: 'Courier New', monospace;
    background: $light;
    color: $dark;
    transition: all 0.2s;
    box-shadow: 2px 2px 0 rgba($dark, 0.1);

    &:focus {
      outline: none;
      box-shadow: 4px 4px 0 $accent3;
      transform: translate(-2px, -2px);
    }

    &::placeholder {
      color: #999;
    }
  }
}

.error-message {
  font-size: 11px;
  color: $accent1;
  margin-top: 4px;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.general-error {
  background: #ffe0e0;
  border: 3px solid $accent1;
  color: $dark;
  padding: 12px;
  margin-bottom: 20px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  box-shadow: 3px 3px 0 rgba($accent1, 0.3);
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, $primary, $secondary);
  color: $light;
  border: 3px solid $dark;
  padding: 14px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s;
  box-shadow: 4px 4px 0 rgba($dark, 0.2);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, $secondary, $primary);
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 rgba($dark, 0.2);
  }

  &:active:not(:disabled) {
    transform: translate(0);
    box-shadow: 2px 2px 0 rgba($dark, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.form-footer {
  text-align: center;
  margin-top: 20px;
  font-size: 12px;

  p {
    margin: 0;
    color: #666;
  }

  a {
    color: $primary;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
      color: $secondary;
    }
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 2rem;
  }

  .form-card {
    padding: 24px;
    border: 3px solid $dark;
    box-shadow: 4px 4px 0 rgba($dark, 0.2);
  }
}
</style>
