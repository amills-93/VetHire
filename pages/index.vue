<template>
  <div class="min-h-screen bg-canvas flex flex-col font-mono text-black">
    <!-- Top White Header -->
    <AppHeader />

    <!-- Main Dashboard Container -->
    <main class="flex-1 max-w-5xl w-full mx-auto p-8 sm:p-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        <!-- Left Column: Actions & Greetings -->
        <div class="space-y-4">
          <h1 class="text-xl font-bold tracking-tight text-center sm:text-left mb-6">
            Welcome, Jane
          </h1>

          <!-- Action 1: Upload your Resume to get feedback! -->
          <NuxtLink
            to="/upload"
            class="block w-full bg-white border-2 border-[#1E7E34] hover:bg-[#F4F9F6] p-6 transition-colors group cursor-pointer"
          >
            <div class="flex items-center gap-5">
              <!-- Upload Icon Tray -->
              <div class="text-[#1E7E34] shrink-0">
                <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v12m0-12l-4 4m4-4l4 4" />
                </svg>
              </div>
              <div class="text-[#1E7E34] text-sm font-semibold leading-snug">
                Upload your Resume<br />to get feedback!
              </div>
            </div>
          </NuxtLink>

          <!-- Action 2: Review Feedback (Locked initially or unlocked if uploaded) -->
          <NuxtLink
            :to="hasUploaded ? '/review' : '#'"
            class="block w-full p-6 transition-colors"
            :class="hasUploaded
              ? 'bg-white border-2 border-[#1E7E34] hover:bg-[#F4F9F6] text-[#1E7E34]'
              : 'bg-[#FDF5F5] border border-[#E2A9AF] text-[#D9534F] cursor-not-allowed'"
            @click="handleReviewClick"
          >
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Review Feedback</span>
              <div
                v-if="!hasUploaded"
                class="border border-black px-2 py-1 text-[10px] text-black bg-white flex flex-col items-center leading-none"
              >
                <span>🔒</span>
                <span class="mt-0.5">Locked</span>
              </div>
              <span v-else class="text-xs text-[#1E7E34] font-bold">Available &rarr;</span>
            </div>
          </NuxtLink>

          <!-- Action 3: Compare to Job Listing (Locked initially or unlocked if reviewed) -->
          <NuxtLink
            :to="hasUploaded ? '/compare' : '#'"
            class="block w-full p-6 transition-colors"
            :class="hasUploaded
              ? 'bg-white border-2 border-[#1E7E34] hover:bg-[#F4F9F6] text-[#1E7E34]'
              : 'bg-[#F4F9F6] border border-[#A3CFBB] text-[#49886E] cursor-not-allowed'"
            @click="handleCompareClick"
          >
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Compare to Job Listing</span>
              <div
                v-if="!hasUploaded"
                class="border border-black px-2 py-1 text-[10px] text-black bg-white flex flex-col items-center leading-none"
              >
                <span>🔒</span>
                <span class="mt-0.5">Locked</span>
              </div>
              <span v-else class="text-xs text-[#1E7E34] font-bold">Available &rarr;</span>
            </div>
          </NuxtLink>

          <!-- Prototype Quick Toggle to test both states -->
          <div class="pt-4 flex items-center justify-between text-xs text-neutral-500">
            <span>Prototype state:</span>
            <button
              @click="hasUploaded = !hasUploaded"
              class="underline hover:text-black cursor-pointer"
            >
              {{ hasUploaded ? 'Switch to: No Resume Uploaded' : 'Switch to: Resume Uploaded' }}
            </button>
          </div>
        </div>

        <!-- Right Column: Metric Widgets -->
        <div class="space-y-6">
          <!-- Resume Score Card -->
          <div class="bg-white border border-[#CCCCCC] p-6 space-y-4">
            <h2 class="text-sm font-bold text-center text-black">
              Resume Score
            </h2>

            <!-- Colored 3-segment Gauge -->
            <ScoreGauge :score="hasUploaded ? 78 : 50" :show-score-label="hasUploaded" />

            <!-- Status message below gauge -->
            <div class="pt-4 text-center">
              <p v-if="!hasUploaded" class="text-sm text-[#1E6091] leading-relaxed">
                Upload your resume to find<br />out how it scores.
              </p>
              <div v-else class="space-y-1">
                <p class="text-sm text-[#237A3B] font-bold">
                  Score: 78 / 100
                </p>
                <p class="text-xs text-neutral-600">
                  Ready for civilian tech roles.
                </p>
              </div>
            </div>
          </div>

          <!-- Saved Jobs Card -->
          <div class="bg-white border border-[#CCCCCC] p-6 space-y-2 text-center">
            <h2 class="text-sm font-bold text-black">
              Saved Jobs
            </h2>
            <p v-if="!hasUploaded" class="text-xs text-neutral-500">
              Nothing here yet.
            </p>
            <div v-else class="text-left text-xs space-y-2 pt-1">
              <div class="border border-[#CCCCCC] p-2.5 flex items-center justify-between">
                <div>
                  <div class="font-bold">IT Operations Manager</div>
                  <div class="text-neutral-500">Northline Health &bull; 69% Match</div>
                </div>
                <NuxtLink to="/compare" class="text-[#2B78E4] hover:underline">View</NuxtLink>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
useHead({
  title: 'VetHire - Home'
})

const hasUploaded = ref(false)

onMounted(() => {
  if (localStorage.getItem('resume_uploaded') === 'true') {
    hasUploaded.value = true
  }
})

const handleReviewClick = (e) => {
  if (!hasUploaded.value) {
    e.preventDefault()
    alert('Please upload your military resume first to unlock review feedback.')
  }
}

const handleCompareClick = (e) => {
  if (!hasUploaded.value) {
    e.preventDefault()
    alert('Please upload and review your resume first to compare against job listings.')
  }
}
</script>
