<template>
  <div class="min-h-screen bg-canvas flex flex-col font-mono">
    <!-- Top Header -->
    <AppHeader :show-logout="false" />

    <!-- Centered Login Card -->
    <div class="flex-1 flex items-center justify-center p-6">
      <div class="w-full max-w-[430px] bg-white border border-[#CCCCCC] p-8 space-y-6">
        <h1 class="text-xl font-bold text-center text-black tracking-tight">
          Log in to VetHire
        </h1>

        <!-- Form Fields -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email Input -->
          <div>
            <label class="block text-xs text-black mb-1.5">Email</label>
            <input
              type="email"
              v-model="email"
              placeholder="you@email.com"
              class="w-full bg-white border border-[#CCCCCC] focus:border-[#2B6CB0] focus:ring-1 focus:ring-[#2B6CB0] outline-none px-3 py-2 text-sm text-black"
              required
            />
          </div>

          <!-- Password Input -->
          <div>
            <label class="block text-xs text-black mb-1.5">Password</label>
            <input
              type="password"
              v-model="password"
              placeholder="Enter your password"
              class="w-full bg-white border border-[#CCCCCC] focus:border-[#2B6CB0] focus:ring-1 focus:ring-[#2B6CB0] outline-none px-3 py-2 text-sm text-black"
              required
            />
          </div>

          <!-- Remember me checkbox -->
          <div class="flex items-center justify-center pt-1">
            <label class="flex items-center gap-2 cursor-pointer text-xs text-black select-none">
              <input
                type="checkbox"
                v-model="rememberMe"
                class="w-3.5 h-3.5 accent-[#237A3B] border border-black rounded-none"
              />
              <span>Remember me</span>
            </label>
          </div>

          <!-- Log in Action Button (Gray if empty, Green when filled) -->
          <button
            type="submit"
            :disabled="!isFormValid || isLoading"
            class="w-full py-2.5 text-sm font-medium text-white transition-colors cursor-pointer text-center"
            :class="isFormValid ? 'bg-[#237A3B] hover:bg-[#1B6530]' : 'bg-[#A8ACA9] cursor-not-allowed'"
          >
            {{ isLoading ? 'Logging in...' : 'Log in' }}
          </button>
        </form>

        <!-- Footer Links -->
        <div class="flex items-center justify-between text-xs text-[#2B78E4] pt-2">
          <a href="#" @click.prevent="forgotPasswordPrompt" class="hover:underline">
            Forgot password?
          </a>
          <a href="#" @click.prevent="createAccountPrompt" class="hover:underline">
            New here? Create an account
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Log in to VetHire'
})

const email = ref('jane.doe@email.com')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const router = useRouter()

const isFormValid = computed(() => {
  return email.value.trim().length > 0 && password.value.trim().length > 0
})

const handleLogin = async () => {
  isLoading.value = true
  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    if (res?.token) {
      localStorage.setItem('authToken', res.token)
    }
    router.push('/')
  } catch (err) {
    // Prototype mode: proceed directly to Home as Jane Doe
    router.push('/')
  } finally {
    isLoading.value = false
  }
}

const forgotPasswordPrompt = () => {
  alert('Password reset link sent to ' + (email.value || 'your email'))
}

const createAccountPrompt = () => {
  alert('Account creation is open for the upcoming cohort.')
}
</script>
