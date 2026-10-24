<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo">VetHire</div>

      <!-- Step 1: Email -->
      <div v-if="currentStep === 1" class="step-1">
        <input
          type="email"
          placeholder="Enter your email"
          v-model="email"
          @keyup.enter="nextStep"
        >
        <div class="action-buttons">
          <button @click="nextStep">Login</button>
          <a href="#">Forgot password?</a>
        </div>
      </div>

      <!-- Step 2: Password -->
      <div v-if="currentStep === 2" class="step-2">
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          @keyup.enter="nextStep"
        >
        <button @click="togglePassword">{{ showPassword ? 'Hide' : 'Show' }}</button>
        <div class="action-buttons">
          <button @click="nextStep">Continue</button>
          <label><input type="checkbox"> Remember me</label>
        </div>
      </div>

      <!-- Step 3: Confirmation -->
      <div v-if="currentStep === 3" class="step-3">
        <div class="spinner"></div>
        <p>Authenticating...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      email: '',
      password: '',
      showPassword: false
    };
  },
  methods: {
    nextStep() {
      if (this.currentStep < 3) {
        this.currentStep++;
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1E1E2A;
}

.login-card {
  background-color: #2A2A3B;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  width: 320px;
}

.logo {
  text-align: center;
  margin-bottom: 24px;
  color: #3B82F6;
  font-weight: bold;
  font-size: 24px;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #4B4B6A;
  border-radius: 8px;
  background-color: #1E1E2A;
  color: #F4F4F5;
}

button {
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.1s ease;
}

button:hover {
  transform: scale(1.02);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}

.spinner {
  border: 4px solid #3B82F6;
  border-top: 4px solid transparent;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 0 auto 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>