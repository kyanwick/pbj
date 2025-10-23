<template>
  <div class="profile-form-container">
    <!-- Header -->
    <div class="form-header">
      <h1>LET'S GET TO KNOW YOU</h1>
      <p class="welcome-text">
        Welcome! This is where we capture what makes you, <em>you</em>. Answer
        honestly and casually—no need to sound polished. The more real you are
        here, the better your content ideas will feel. This takes about 10
        minutes.
      </p>
    </div>

    <!-- Progress Bar -->
    <div class="progress-section">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <p class="progress-text">{{ completedFields }} / {{ totalFields }} fields completed</p>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="profile-form">
      <!-- Section 1: Who You Are -->
      <section class="form-section">
        <h2>1. WHO YOU ARE</h2>

        <!-- Name -->
        <div class="form-group">
          <label for="name">What's your name?</label>
          <p class="help-text">First name is fine, or whatever you go by online</p>
          <input
            v-model="form.name"
            type="text"
            id="name"
            placeholder="Your name"
            required
            class="form-input"
          />
          <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
        </div>

        <!-- What You Do -->
        <div class="form-group">
          <label for="whatYouDo">What do you do?</label>
          <p class="help-text">
            In one sentence, what's your thing? (e.g., "I'm a fitness coach who
            helps busy moms get strong without spending hours at the gym")
          </p>
          <textarea
            v-model="form.whatYouDo"
            id="whatYouDo"
            placeholder="Your thing in one sentence..."
            rows="3"
            required
            class="form-textarea"
          ></textarea>
          <span v-if="errors.whatYouDo" class="error-text">{{ errors.whatYouDo }}</span>
        </div>

        <!-- Categories -->
        <div class="form-group">
          <label for="categories">What are your main categories or sub-niches?</label>
          <p class="help-text">
            List 3-7 topics you talk about most (e.g., strength training, meal
            prep, mindset, time management)
          </p>
          <textarea
            v-model="form.categories"
            id="categories"
            placeholder="• Topic 1&#10;• Topic 2&#10;• Topic 3"
            rows="4"
            required
            class="form-textarea"
          ></textarea>
          <span v-if="errors.categories" class="error-text">{{ errors.categories }}</span>
        </div>
      </section>

      <!-- Section 2: Your Voice -->
      <section class="form-section">
        <h2>2. YOUR VOICE</h2>

        <!-- Brand Sound -->
        <div class="form-group">
          <label>How should your brand sound?</label>
          <p class="help-text">Pick the 3 that feel most like you</p>
          <div class="checkbox-group">
            <label v-for="option in brandSoundOptions" :key="option" class="checkbox-label">
              <input
                type="checkbox"
                :value="option"
                v-model="form.brandSound"
                @change="validateBrandSound"
                class="checkbox-input"
              />
              <span>{{ option }}</span>
            </label>
          </div>
          <span v-if="errors.brandSound" class="error-text">{{ errors.brandSound }}</span>
        </div>

        <!-- Script Style -->
        <div class="form-group">
          <label>What's your script style preference?</label>
          <p class="help-text">How do you like to create content?</p>
          <div class="radio-group">
            <label v-for="option in scriptStyleOptions" :key="option" class="radio-label">
              <input
                type="radio"
                :value="option"
                v-model="form.scriptStyle"
                required
                class="radio-input"
              />
              <span class="radio-text">
                <strong>{{ option }}</strong>
                <span class="radio-description">
                  {{ getScriptDescription(option) }}
                </span>
              </span>
            </label>
          </div>
          <span v-if="errors.scriptStyle" class="error-text">{{ errors.scriptStyle }}</span>
        </div>

        <!-- Content Formats -->
        <div class="form-group">
          <label>What content formats do you vibe with?</label>
          <p class="help-text">Select all that you're comfortable recording</p>
          <div class="checkbox-group">
            <label v-for="format in contentFormatOptions" :key="format" class="checkbox-label">
              <input
                type="checkbox"
                :value="format"
                v-model="form.contentFormats"
                class="checkbox-input"
              />
              <span>{{ format }}</span>
            </label>
          </div>
          <span v-if="errors.contentFormats" class="error-text">{{ errors.contentFormats }}</span>
        </div>

        <!-- Content Inspiration -->
        <div class="form-group">
          <label for="inspiration">Who inspires your content style?</label>
          <p class="help-text">
            Name 1-3 brands or creators whose content makes you think: "THAT'S
            what I want mine to feel like"
          </p>
          <textarea
            v-model="form.inspiration"
            id="inspiration"
            placeholder="Creator name or brand..."
            rows="3"
            class="form-textarea"
          ></textarea>
        </div>
      </section>

      <!-- Section 3: Your Edge -->
      <section class="form-section">
        <h2>3. YOUR EDGE</h2>
        <p class="section-description">
          This is where you stand out. Be honest and opinionated here—it's what
          makes your content magnetic.
        </p>

        <!-- Industry Disagreements -->
        <div class="form-group">
          <label for="disagreements">
            What do people in your industry say that you disagree with?
          </label>
          <p class="help-text">
            Things that make you think "that's not the full story" or "that's
            just wrong"
          </p>
          <textarea
            v-model="form.disagreements"
            id="disagreements"
            placeholder="Your disagreements with industry norms..."
            rows="4"
            class="form-textarea"
          ></textarea>
        </div>

        <!-- Creator Turn-offs -->
        <div class="form-group">
          <label for="turnoffs">
            What do other creators in your space do that turns you off?
          </label>
          <p class="help-text">
            The stuff that makes you think "this is exactly why I DON'T want to
            make content like that"
          </p>
          <textarea
            v-model="form.turnoffs"
            id="turnoffs"
            placeholder="Creator behaviors or tactics you want to avoid..."
            rows="4"
            class="form-textarea"
          ></textarea>
        </div>
      </section>

      <!-- Section 4: Your Topics -->
      <section class="form-section">
        <h2>4. YOUR TOPICS</h2>

        <!-- Common FAQs -->
        <div class="form-group">
          <label for="faqs">What questions do you get asked ALL the time?</label>
          <p class="help-text">
            The FAQs that show up in DMs, comments, or conversations
          </p>
          <textarea
            v-model="form.faqs"
            id="faqs"
            placeholder="• Question 1?&#10;• Question 2?&#10;• Question 3?"
            rows="4"
            class="form-textarea"
          ></textarea>
        </div>

        <!-- Industry Myths -->
        <div class="form-group">
          <label for="myths">What myths or misconceptions exist in your industry?</label>
          <p class="help-text">
            Lies, outdated advice, or things people believe that just aren't
            true
          </p>
          <textarea
            v-model="form.myths"
            id="myths"
            placeholder="• Myth 1&#10;• Myth 2&#10;• Myth 3"
            rows="4"
            class="form-textarea"
          ></textarea>
        </div>

        <!-- Topics to Avoid -->
        <div class="form-group">
          <label for="avoidTopics">Are there any topics you want to AVOID?</label>
          <p class="help-text">
            Anything off-limits or not aligned with your brand?
          </p>
          <textarea
            v-model="form.avoidTopics"
            id="avoidTopics"
            placeholder="Topics to avoid..."
            rows="3"
            class="form-textarea"
          ></textarea>
        </div>
      </section>

      <!-- Submit Button -->
      <div class="form-actions">
        <button type="submit" class="btn-submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Saving...' : 'Save Profile' }}
        </button>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSubmitting = ref(false)
const successMessage = ref('')

const brandSoundOptions = [
  'Playful (fun, lighthearted, witty)',
  'Authoritative (confident, expert, trusted)',
  'Relatable (real, down-to-earth, "one of us")',
  'Educational (clear, teaching-focused, informative)',
  'Aspirational (inspiring, motivational, visionary)'
]

const scriptStyleOptions = ['Templated', 'Guided', 'Hybrid']

const contentFormatOptions = [
  'Voiceover (audio over footage, clips, or slides)',
  'Talking head (straight-to-camera, classic style)',
  'Explainers (breaking down a topic, using props or visuals)',
  'Reacting (responding to videos, trends, or comments)',
  'Multitasking (talking while doing something—cooking, working, etc.)',
  'Different angles/shots (moving around, dynamic camera work)',
  'Talking back & forth (dialogue format, skit-style, or with someone else)'
]

const form = ref({
  name: '',
  whatYouDo: '',
  categories: '',
  brandSound: [],
  scriptStyle: '',
  contentFormats: [],
  inspiration: '',
  disagreements: '',
  turnoffs: '',
  faqs: '',
  myths: '',
  avoidTopics: ''
})

const errors = ref({
  name: '',
  whatYouDo: '',
  categories: '',
  brandSound: '',
  scriptStyle: '',
  contentFormats: ''
})

const totalFields = ref(10)

const completedFields = computed(() => {
  let completed = 0
  if (form.value.name) completed++
  if (form.value.whatYouDo) completed++
  if (form.value.categories) completed++
  if (form.value.brandSound.length > 0) completed++
  if (form.value.scriptStyle) completed++
  if (form.value.contentFormats.length > 0) completed++
  if (form.value.inspiration) completed++
  if (form.value.disagreements) completed++
  if (form.value.turnoffs) completed++
  if (form.value.faqs || form.value.myths) completed++
  return completed
})

const progressPercent = computed(() => {
  return Math.round((completedFields.value / totalFields.value) * 100)
})

const validateBrandSound = () => {
  if (form.value.brandSound.length > 3) {
    form.value.brandSound.pop()
    errors.value.brandSound = 'Maximum 3 selections allowed'
    setTimeout(() => {
      errors.value.brandSound = ''
    }, 3000)
  }
}

const getScriptDescription = (option) => {
  const descriptions = {
    Templated: 'Give me exact lines to read word-for-word',
    Guided: "Give me flexible prompts, I'll say it my way",
    Hybrid: 'A mix of both, depending on the content'
  }
  return descriptions[option] || ''
}

const validateForm = () => {
  let isValid = true
  errors.value = {}

  if (!form.value.name.trim()) {
    errors.value.name = 'Name is required'
    isValid = false
  }

  if (!form.value.whatYouDo.trim()) {
    errors.value.whatYouDo = 'Please tell us what you do'
    isValid = false
  }

  if (!form.value.categories.trim()) {
    errors.value.categories = 'Please list your categories'
    isValid = false
  }

  if (form.value.brandSound.length === 0) {
    errors.value.brandSound = 'Please select at least one brand sound'
    isValid = false
  }

  if (form.value.brandSound.length > 3) {
    errors.value.brandSound = 'Maximum 3 selections allowed'
    isValid = false
  }

  if (!form.value.scriptStyle) {
    errors.value.scriptStyle = 'Please select a script style preference'
    isValid = false
  }

  if (form.value.contentFormats.length === 0) {
    errors.value.contentFormats = 'Please select at least one content format'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  isSubmitting.value = true

  try {
    // Get auth token from localStorage
    const authToken = localStorage.getItem('auth_token')

    if (!authToken) {
      throw new Error('Not authenticated. Please log in first.')
    }

    // Prepare payload for backend
    const payload = {
      name: form.value.name,
      whatYouDo: form.value.whatYouDo,
      categories: form.value.categories,
      brandSound: form.value.brandSound,
      scriptStyle: form.value.scriptStyle,
      contentFormats: form.value.contentFormats,
      inspiration: form.value.inspiration,
      disagreements: form.value.disagreements,
      turnoffs: form.value.turnoffs,
      faqs: form.value.faqs,
      myths: form.value.myths,
      avoidTopics: form.value.avoidTopics,
      timestamp: new Date().toISOString()
    }

    // Send to backend API endpoint
    const response = await fetch('/api/creator-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to save profile')
    }

    // Save to localStorage as backup
    localStorage.setItem('creator_profile', JSON.stringify(form.value))
    localStorage.setItem('profile_completed', 'true')

    successMessage.value = '🎉 Profile saved! Ready to start creating?'

    setTimeout(() => {
        router.push('/lobby')
      }, 2000)
    } catch (err) {
      errors.value.submit = err.message || 'Failed to save profile. Please try again.'
      if (process.env.NODE_ENV !== 'production') {
        console.error('Profile submission error:', err)
      }
    } finally {
      isSubmitting.value = false
    }
}
</script>

<style scoped lang="scss">
$primary: #667eea;
$secondary: #764ba2;
$accent-red: #ff6b6b;
$accent-yellow: #feca57;
$accent-cyan: #48dbfb;
$dark: #1a1a2e;
$light: #f5f7fa;
$border: #e0e0e0;
$font-mono: 'Courier New', monospace;

.profile-form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 24px;
  background: $light;
  min-height: 100vh;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-family: $font-mono;
    font-size: 2.5rem;
    font-weight: 900;
    letter-spacing: 2px;
    background: linear-gradient(135deg, $primary, $secondary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 16px 0;
    text-shadow: 3px 3px 0 rgba($accent-red, 0.3);
  }

  .welcome-text {
    font-size: 1rem;
    color: $dark;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;

    em {
      font-style: italic;
      color: $accent-red;
      font-weight: 600;
    }
  }
}

.progress-section {
  margin-bottom: 40px;

  .progress-bar {
    height: 8px;
    background: $border;
    border: 2px solid $dark;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 4px 4px 0 rgba($dark, 0.1);

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, $primary, $secondary);
      transition: width 0.3s ease;
    }
  }

  .progress-text {
    font-size: 0.875rem;
    color: $dark;
    margin-top: 8px;
    font-family: $font-mono;
    font-weight: 600;
  }
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.form-section {
  h2 {
    font-family: $font-mono;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 1px;
    color: $dark;
    margin: 0 0 24px 0;
    padding-bottom: 12px;
    border-bottom: 3px solid $accent-red;
  }

  .section-description {
    font-size: 0.95rem;
    color: $dark;
    line-height: 1.6;
    margin-bottom: 24px;
    font-style: italic;
  }
}

.form-group {
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;

  label {
    font-family: $font-mono;
    font-size: 1rem;
    font-weight: 700;
    color: $dark;
    margin-bottom: 8px;
    letter-spacing: 0.5px;
  }

  .help-text {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 12px;
    line-height: 1.5;
    font-style: italic;
  }
}

.form-input,
.form-textarea {
  font-family: inherit;
  font-size: 1rem;
  padding: 12px 16px;
  border: 3px solid $dark;
  border-radius: 4px;
  background: white;
  color: $dark;
  transition: all 0.2s;
  box-shadow: 4px 4px 0 rgba($dark, 0.1);

  &:focus {
    outline: none;
    border-color: $primary;
    box-shadow: 4px 4px 0 rgba($primary, 0.3);
    transform: translate(-2px, -2px);
  }

  &::placeholder {
    color: #bbb;
  }
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.checkbox-group,
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkbox-label,
.radio-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: rgba($primary, 0.05);
  }
}

.checkbox-input,
.radio-input {
  margin-top: 4px;
  cursor: pointer;
  accent-color: $primary;
}

.checkbox-label span,
.radio-label span {
  font-size: 0.95rem;
  color: $dark;
  line-height: 1.4;
}

.radio-text {
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    font-weight: 700;
  }

  .radio-description {
    font-size: 0.85rem;
    color: #666;
    font-style: italic;
  }
}

.error-text {
  font-size: 0.85rem;
  color: $accent-red;
  margin-top: 6px;
  font-family: $font-mono;
  font-weight: 600;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 12px;
}

.btn-submit {
  font-family: $font-mono;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 1px;
  padding: 16px 32px;
  background: linear-gradient(135deg, $accent-red, $accent-yellow);
  color: white;
  border: 3px solid $dark;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 6px 6px 0 rgba($dark, 0.2);
  text-transform: uppercase;

  &:hover:not(:disabled) {
    transform: translate(-3px, -3px);
    box-shadow: 9px 9px 0 rgba($dark, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.success-message {
  margin-top: 24px;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba($accent-cyan, 0.2), rgba($primary, 0.2));
  border: 3px solid $accent-cyan;
  border-radius: 4px;
  font-family: $font-mono;
  font-weight: 600;
  color: $dark;
  text-align: center;
  box-shadow: 4px 4px 0 rgba($accent-cyan, 0.2);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .profile-form-container {
    padding: 40px 16px;
  }

  .form-header h1 {
    font-size: 1.75rem;
  }

  .form-section h2 {
    font-size: 1.25rem;
  }

  .checkbox-group,
  .radio-group {
    gap: 10px;
  }
}
</style>
