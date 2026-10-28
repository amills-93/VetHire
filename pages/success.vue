<template>
  <div class="min-h-screen bg-canvas flex flex-col font-mono text-black">
    <AppHeader />

    <main class="flex-1 flex items-center justify-center p-6">
      <div class="w-full max-w-md bg-white border border-[#CCCCCC] p-8 text-center space-y-6">
        <div class="w-12 h-12 bg-[#EAF7EE] text-[#237A3B] border border-[#237A3B] mx-auto flex items-center justify-center text-xl font-bold">
          &check;
        </div>

        <div class="space-y-2">
          <h1 class="text-lg font-bold">
            Authenticated as Jane Doe
          </h1>
          <p class="text-xs text-neutral-600">
            Welcome to VetHire. Your session is active.
          </p>
        </div>

        <NuxtLink
          to="/"
          class="block w-full vh-btn-green py-2.5 text-xs font-bold"
        >
          Go to Home Dashboard &rarr;
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup>
useHead({
  title: 'VetHire - Welcome'
})
</script>
