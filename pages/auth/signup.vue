<template>
  <div class="min-h-screen bg-canvas flex flex-col font-mono">
    <AppHeader :show-logout="false" />

    <div class="flex-1 flex items-center justify-center p-6">
      <div class="w-full max-w-md bg-white border border-vh-gray-border p-8 space-y-6">
        <h1 class="text-xl font-bold text-center text-black tracking-tight">
          Create your VetHire account
        </h1>

        <form @submit.prevent="handleSignup" class="space-y-4" novalidate>
          <div>
            <label for="signup-name" class="block text-xs text-black mb-1.5">Name</label>
            <input
              id="signup-name"
              type="text"
              v-model="name"
              placeholder="Jane Doe"
              autocomplete="name"
              class="w-full bg-white border border-vh-gray-border focus:border-vh-blue-focus focus:ring-1 focus:ring-vh-blue-focus outline-none px-3 py-2 text-sm text-black"
              required
            />
          </div>

          <div>
            <label for="signup-email" class="block text-xs text-black mb-1.5">Email</label>
            <input
              id="signup-email"
              type="email"
              v-model="email"
              placeholder="you@email.com"
              autocomplete="email"
              class="w-full bg-white border border-vh-gray-border focus:border-vh-blue-focus focus:ring-1 focus:ring-vh-blue-focus outline-none px-3 py-2 text-sm text-black"
              required
            />
            <p v-if="email.length > 0 && !isEmailValid" class="mt-1 text-[11px] text-vh-red">
              Enter a valid email address.
            </p>
          </div>

          <div>
            <label for="signup-password" class="block text-xs text-black mb-1.5">Password</label>
            <input
              id="signup-password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="At least 8 characters"
              autocomplete="new-password"
              class="w-full bg-white border border-vh-gray-border focus:border-vh-blue-focus focus:ring-1 focus:ring-vh-blue-focus outline-none px-3 py-2 text-sm text-black"
              required
            />
            <div class="mt-1 flex items-center justify-between gap-2">
              <p v-if="password.length > 0 && !isPasswordValid" class="text-[11px] text-vh-red">
                Password must be at least 8 characters.
              </p>
              <span v-else></span>
              <button
                type="button"
                class="text-[11px] text-vh-blue hover:underline cursor-pointer shrink-0"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <p
            v-if="errorMessage"
            role="alert"
            class="border border-vh-red-border bg-vh-red-tint text-vh-red px-3 py-2 text-xs"
          >
            {{ errorMessage }}
          </p>

          <button
            type="submit"
            :disabled="!isFormValid || isLoading"
            class="w-full py-2.5 text-sm font-medium text-white transition-colors cursor-pointer text-center"
            :class="isFormValid && !isLoading ? 'bg-vh-green hover:bg-vh-green-hover' : 'bg-vh-gray cursor-not-allowed'"
          >
            {{ isLoading ? 'Creating account...' : 'Create account' }}
          </button>
        </form>

        <p class="text-center text-xs text-black">
          Already have an account?
          <NuxtLink to="/auth/login" class="text-vh-blue hover:underline">
            Log in
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const router = useRouter()

const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))
const isPasswordValid = computed(() => password.value.length >= 8)

const isFormValid = computed(() => {
  return name.value.trim().length > 0 && isEmailValid.value && isPasswordValid.value
})

const handleSignup = async () => {
  if (!isFormValid.value || isLoading.value) return

  errorMessage.value = ''
  isLoading.value = true

  try {
    await $fetch('/api/auth/signup', {
      method: 'POST',
      body: {
        name: name.value.trim(),
        email: email.value.trim(),
        password: password.value
      }
    })

    await router.push({ path: '/auth/login', query: { registered: '1' } })
  } catch (err) {
    errorMessage.value =
      err?.data?.statusMessage ||
      err?.data?.message ||
      'Could not create your account. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>
