<template>
  <div class="min-h-screen bg-canvas flex flex-col font-mono text-black">
    <AppHeader />

    <main class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-between">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        <div class="space-y-6">
          <h1 class="text-xl font-bold tracking-tight">
            Compare to a Job Listing
          </h1>

          <div>
            <input
              type="text"
              v-model="jobUrl"
              placeholder="https://www.linkedin.com/jobs/view/..."
              class="w-full bg-white border-2 border-black p-3 text-xs font-mono outline-none focus:ring-1 focus:ring-black"
            />
            <button
              @click="submitJob"
              class="w-full mt-3 bg-vh-green hover:bg-vh-green-hover text-white py-2.5 text-sm font-medium transition-colors cursor-pointer"
            >
              Submit
            </button>
          </div>

          <div class="bg-white border border-vh-gray-border p-6 space-y-3 text-center">
            <h2 class="text-sm font-bold text-black">
              IT Operations Manager
            </h2>
            <p class="text-xs text-neutral-600">
              Northline Health &bull; Dallas, TX (Hybrid)
            </p>
            <p class="text-[11px] text-neutral-500">
              $105k – $130k &bull; Posted 3 days ago &bull; 46 applicants
            </p>
            <div class="flex items-center justify-center gap-2 pt-2">
              <span class="bg-vh-green-light text-vh-green text-[10px] px-2.5 py-0.5 font-medium">
                Actively hiring
              </span>
              <span class="bg-vh-blue-light text-vh-blue text-[10px] px-2.5 py-0.5 font-medium">
                Recruiter active this week
              </span>
            </div>
          </div>
        </div>

        <div class="bg-white border-2 border-black p-8 space-y-6">
          <div class="max-w-md mx-auto">
            <ScoreGauge :score="69" :show-score-label="false" />
          </div>

          <h2 class="text-xl font-bold text-center text-black">
            69% Match!
          </h2>

          <div class="border border-black p-5 space-y-5 text-xs">
            <h3 class="font-bold text-center text-sm text-black">
              Suggestions:
            </h3>

            <div class="space-y-2">
              <div class="text-[10px] text-neutral-500 uppercase tracking-wider text-center">
                ALREADY ON YOUR RESUME
              </div>
              <div class="flex flex-wrap justify-center gap-1.5">
                <span
                  v-for="keyword in alreadyOnResume"
                  :key="keyword"
                  class="border border-vh-green text-vh-green px-2 py-0.5 text-[11px] font-medium"
                >
                  &check; {{ keyword }}
                </span>
              </div>
            </div>

            <div class="space-y-2 pt-2">
              <div class="text-[10px] text-neutral-500 uppercase tracking-wider text-center">
                MISSING FROM YOUR RESUME
              </div>
              <div class="flex flex-wrap justify-center gap-1.5">
                <span
                  v-for="keyword in missingFromResume"
                  :key="keyword"
                  class="border border-vh-red text-vh-red px-2 py-0.5 text-[11px] font-medium"
                >
                  &cross; {{ keyword }}
                </span>
              </div>
            </div>

            <div class="space-y-2 pt-2 text-[11px] text-neutral-800 leading-relaxed">
              <p>&bull; Your TCNO/MTO compliance work is what civilians call "ITIL change management."</p>
              <p>&bull; Coordinating circuit orders with DISA counts as "vendor management."</p>
              <p>&bull; Managing the flight equipment budget is "budget planning." Add a rough number.</p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              @click="addKeywords"
              class="w-full sm:w-auto bg-vh-green hover:bg-vh-green-hover text-white px-5 py-2.5 text-xs font-bold transition-colors cursor-pointer text-center"
            >
              {{ addedKeywords ? 'Keywords added to resume!' : 'Add suggested keywords' }}
            </button>
            <button
              @click="saveJob"
              class="w-full sm:w-auto bg-white border border-vh-green hover:bg-vh-green-light text-vh-green px-5 py-2.5 text-xs font-bold transition-colors cursor-pointer text-center"
            >
              {{ saved ? 'Job Saved &check;' : 'Save job' }}
            </button>
          </div>
        </div>

      </div>

      <div class="pt-8">
        <NuxtLink
          to="/"
          class="vh-btn-white inline-flex items-center gap-1.5"
        >
          &larr; Go back
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup>
const jobUrl = ref('https://www.linkedin.com/jobs/view/4012876543')
const addedKeywords = ref(false)
const saved = ref(false)

const alreadyOnResume = [
  'Team leadership',
  'Network security',
  'NIST RMF',
  'Incident response',
  'CISSP',
  '99.997% uptime / SLAs'
]

const missingFromResume = [
  'ITIL change management',
  'Vendor management',
  'Budget planning',
  'ServiceNow'
]

const submitJob = () => {
  alert('Loaded job listing from: ' + jobUrl.value)
}

const addKeywords = () => {
  addedKeywords.value = true
}

const saveJob = () => {
  saved.value = true
  localStorage.setItem('saved_job_title', 'IT Operations Manager')
}
</script>
