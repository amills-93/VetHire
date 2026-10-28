<template>
  <header class="w-full bg-white border-b border-[#CCCCCC] px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
    <!-- Brand Title -->
    <NuxtLink to="/" class="text-base font-bold tracking-wider text-black font-mono">
      VETHIRE
    </NuxtLink>

    <!-- Logout Action Button -->
    <NuxtLink
      v-if="showLogout"
      to="/auth/login"
      class="border border-[#CCCCCC] hover:border-black px-4 py-1 text-xs text-black font-mono transition-colors"
    >
      Log out
    </NuxtLink>
  </header>
</template>

<script setup>
defineProps({
  showLogout: {
    type: Boolean,
    default: true
  }
})
</script>
