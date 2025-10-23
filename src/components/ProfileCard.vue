<template>
  <div class="profile-card">
    <div class="profile-header">
      <h3>Your Creator Profile</h3>
      <router-link to="/profile" class="btn-edit">✎ Edit Profile</router-link>
    </div>

    <div v-if="profile.name" class="profile-display">
      <div class="profile-section">
        <h4>About You</h4>
        <p class="name-display"><strong>{{ profile.name }}</strong></p>
        <p class="doing">{{ profile.whatYouDo }}</p>
        <p class="topics"><em>Topics:</em> {{ profile.categories }}</p>
      </div>

      <div class="profile-section">
        <h4>Your Voice</h4>
        <div class="tags">
          <span v-for="sound in profile.brandSound" :key="sound" class="tag">
            {{ sound.split(' ')[0] }}
          </span>
        </div>
        <p class="script-style">
          <small>Script Style: <strong>{{ profile.scriptStyle }}</strong></small>
        </p>
      </div>

      <div v-if="profile.contentFormats.length > 0" class="profile-section">
        <h4>Content Formats</h4>
        <ul class="formats-list">
          <li v-for="format in profile.contentFormats.slice(0, 3)" :key="format">
            {{ format.split(' ')[0] }}
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="profile-empty">
      <p>No profile yet. Complete your profile to get personalized content ideas!</p>
      <router-link to="/profile" class="btn-create">Create Your Profile</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const profile = ref({
  name: '',
  whatYouDo: '',
  categories: '',
  brandSound: [],
  scriptStyle: '',
  contentFormats: []
})

onMounted(() => {
  const saved = localStorage.getItem('creator_profile')
  if (saved) {
    profile.value = JSON.parse(saved)
  }
})
</script>

<style scoped lang="scss">
$primary: #667eea;
$secondary: #764ba2;
$accent-red: #ff6b6b;
$dark: #1a1a2e;
$light: #f5f7fa;
$font-mono: 'Courier New', monospace;

.profile-card {
  border: 3px solid $dark;
  border-radius: 8px;
  padding: 24px;
  background: white;
  box-shadow: 6px 6px 0 rgba($dark, 0.15);
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid $accent-red;

  h3 {
    font-family: $font-mono;
    font-size: 1.25rem;
    font-weight: 700;
    color: $dark;
    margin: 0;
    letter-spacing: 0.5px;
  }
}

.btn-edit {
  font-family: $font-mono;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 8px 16px;
  background: $primary;
  color: white;
  border: 2px solid $dark;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-block;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 rgba($dark, 0.2);
  }
}

.profile-display {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-section {
  h4 {
    font-family: $font-mono;
    font-size: 0.95rem;
    font-weight: 700;
    color: $dark;
    margin: 0 0 12px 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    margin: 0 0 8px 0;
    color: $dark;
    line-height: 1.5;
    font-size: 0.95rem;
  }

  .name-display {
    font-size: 1.1rem;
    font-weight: 700;
    background: linear-gradient(135deg, $primary, $secondary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .doing {
    color: #555;
    font-style: italic;
  }

  .topics {
    font-size: 0.9rem;
    color: #666;

    em {
      font-weight: 600;
    }
  }

  .script-style {
    margin-top: 12px;
    font-size: 0.9rem;
  }
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background: linear-gradient(135deg, rgba($primary, 0.3), rgba($secondary, 0.2));
  border: 2px solid $primary;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  color: $dark;
  font-family: $font-mono;
}

.formats-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  li {
    background: rgba($accent-red, 0.1);
    border-left: 3px solid $accent-red;
    padding: 6px 10px;
    font-size: 0.9rem;
    color: $dark;
  }
}

.profile-empty {
  text-align: center;
  padding: 24px;

  p {
    color: #666;
    margin-bottom: 16px;
  }
}

.btn-create {
  font-family: $font-mono;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 10px 20px;
  background: linear-gradient(135deg, $primary, $secondary);
  color: white;
  border: 2px solid $dark;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-block;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 rgba($dark, 0.2);
  }
}

@media (max-width: 768px) {
  .profile-card {
    padding: 16px;
  }

  .profile-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .formats-list {
    grid-template-columns: 1fr;
  }
}
</style>
