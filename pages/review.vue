<template>
  <div class="min-h-screen bg-canvas flex flex-col font-mono text-black">
    <AppHeader />

    <div
      v-if="showDownloadToast"
      class="w-full bg-[#237A3B] text-white py-2 px-4 text-center text-xs font-mono flex items-center justify-center gap-3 transition-all"
    >
      <span>Downloaded Doe_Jane_Resume_Civilian.pdf &bull; saved to your profile</span>
      <button @click="showDownloadToast = false" class="text-white hover:text-black">&times;</button>
    </div>

    <main class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-between">
      <div class="flex flex-col lg:flex-row items-start gap-4">
        
        <div class="flex-1 w-full bg-white border border-black p-6 space-y-4 shadow-none">
          <div class="text-center pb-2 border-b border-neutral-200">
            <h1 class="text-base font-bold text-black tracking-tight">
              MSGT (E-7) JANE J. DOE, USAF
            </h1>
            <p class="text-[11px] text-neutral-600 mt-0.5">
              San Antonio, TX | (210) 555-0133 | jane.doe@email.com
            </p>
            <p class="text-[11px] text-neutral-600">
              TS/SCI w/ CI Poly | 18 YOS | Retirement eff. 1 Mar 27
            </p>
          </div>

          <div>
            <h2 class="text-xs font-bold text-black uppercase mb-1">
              PROFESSIONAL PROFILE
            </h2>
            <div
              class="p-2.5 text-xs leading-relaxed flex items-start justify-between gap-2 transition-colors"
              :class="activeSuggestionIndex === 0
                ? 'border-2 border-[#D99B00] bg-white'
                : suggestions[0].accepted ? 'bg-[#EAF7EE]' : 'bg-neutral-50'"
            >
              <span>{{ suggestions[0].accepted ? suggestions[0].suggested : suggestions[0].original }}</span>
              <span class="w-4 h-4 rounded-none bg-[#237A3B] text-white text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
            </div>
          </div>

          <div>
            <h2 class="text-xs font-bold text-black uppercase mb-1">
              CORE COMPETENCIES
            </h2>
            <p class="text-[10px] text-neutral-700 leading-relaxed">
              RMF / eMASS / ATO Pkgs &bull; ACAS / HBSS-ESS / JRSS &bull; DISA TSR / TSO Lifecycle &bull; DCO-IDM / Hunt / CLEAR &bull; CCRI / CSSP / KT-C &bull; NIPR / SIPR / JWICS &bull; TBMCS / GCCS-AF / AMHS &bull; DoD 8140 IAT III / IAM II &bull; COMSEC / KG-175 / TACLANE
            </p>
          </div>

          <div class="space-y-2">
            <h2 class="text-xs font-bold text-black uppercase">
              EXPERIENCE
            </h2>

            <div
              class="p-2 text-xs font-medium flex items-center justify-between"
              :class="activeSuggestionIndex === 1
                ? 'border-2 border-[#D99B00] bg-white'
                : suggestions[1].accepted ? 'bg-[#EAF7EE]' : 'bg-neutral-50'"
            >
              <span>{{ suggestions[1].accepted ? suggestions[1].suggested : suggestions[1].original }}</span>
              <span class="w-4 h-4 bg-[#237A3B] text-white text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
            </div>

            <div class="text-[10px] text-neutral-500">
              JBSA-Lackland, TX | 2021 – Present
            </div>

            <div class="space-y-2 text-xs">
              <div
                class="p-2.5 transition-colors flex items-start justify-between gap-2"
                :class="activeSuggestionIndex === 2
                  ? 'border-2 border-[#D99B00] bg-white'
                  : suggestions[2].accepted ? 'bg-[#EAF7EE]' : 'bg-[#FDE8E8]'"
              >
                <span>&bull; {{ suggestions[2].accepted ? suggestions[2].suggested : suggestions[2].original }}</span>
                <span
                  class="w-4 h-4 text-white text-[10px] font-bold flex items-center justify-center shrink-0"
                  :class="activeSuggestionIndex === 2 ? 'bg-[#D99B00]' : (suggestions[2].accepted ? 'bg-[#237A3B]' : 'bg-[#D9534F]')"
                >3</span>
              </div>

              <div class="p-1 text-neutral-800">
                &bull; Oversaw TCNO/MTO/CTO compliance; closed 2,300+ IAVAs/IAVBs within suspense.
              </div>

              <div
                class="p-2.5 transition-colors flex items-start justify-between gap-2"
                :class="activeSuggestionIndex === 3
                  ? 'border-2 border-[#D99B00] bg-white'
                  : suggestions[3].accepted ? 'bg-[#EAF7EE]' : 'bg-[#FDE8E8]'"
              >
                <span>&bull; {{ suggestions[3].accepted ? suggestions[3].suggested : suggestions[3].original }}</span>
                <span
                  class="w-4 h-4 text-white text-[10px] font-bold flex items-center justify-center shrink-0"
                  :class="activeSuggestionIndex === 3 ? 'bg-[#D99B00]' : (suggestions[3].accepted ? 'bg-[#237A3B]' : 'bg-[#D9534F]')"
                >4</span>
              </div>

              <div class="p-1 text-neutral-800">
                &bull; Drove ACC/AFCYBER NOSC transition to SDN-based architecture; recognized by 16 AF/CC.
              </div>

              <div
                class="p-2.5 transition-colors flex items-start justify-between gap-2"
                :class="activeSuggestionIndex === 4
                  ? 'border-2 border-[#D99B00] bg-white'
                  : suggestions[4].accepted ? 'bg-[#EAF7EE]' : 'bg-[#FDE8E8]'"
              >
                <span>&bull; {{ suggestions[4].accepted ? suggestions[4].suggested : suggestions[4].original }}</span>
                <span
                  class="w-4 h-4 text-white text-[10px] font-bold flex items-center justify-center shrink-0"
                  :class="activeSuggestionIndex === 4 ? 'bg-[#D99B00]' : (suggestions[4].accepted ? 'bg-[#237A3B]' : 'bg-[#D9534F]')"
                >5</span>
              </div>
            </div>
          </div>
        </div>

        <div class="hidden lg:flex flex-col gap-2 pt-24 shrink-0">
          <button
            @click="prevSuggestion"
            class="w-9 h-9 bg-white border border-black hover:bg-neutral-100 flex items-center justify-center font-bold text-sm cursor-pointer"
            aria-label="Previous suggestion"
          >
            &uarr;
          </button>
          <button
            @click="nextSuggestion"
            class="w-9 h-9 bg-white border border-black hover:bg-neutral-100 flex items-center justify-center font-bold text-sm cursor-pointer"
            aria-label="Next suggestion"
          >
            &darr;
          </button>
        </div>

        <div class="flex-1 w-full bg-white border border-black p-6 space-y-6">
          <div v-if="!allReviewed" class="space-y-5">
            <div class="flex items-center justify-between">
              <h2 class="text-base font-bold text-black">
                Suggested feedback
              </h2>
              <span class="text-xs text-neutral-600">
                {{ activeSuggestionIndex + 1 }} of {{ suggestions.length }}
              </span>
            </div>

            <div class="flex gap-1.5 h-1.5 w-full">
              <div
                v-for="(sug, idx) in suggestions"
                :key="idx"
                class="flex-1 transition-colors"
                :class="sug.accepted ? 'bg-[#237A3B]' : (idx === activeSuggestionIndex ? 'bg-[#D99B00]' : 'bg-neutral-200')"
              ></div>
            </div>

            <div class="text-center">
              <span class="border border-[#D99B00] px-3 py-1 text-xs text-black font-medium inline-block">
                {{ currentSuggestion.category }}
              </span>
            </div>

            <div class="space-y-1 text-center">
              <div class="text-[10px] text-neutral-500 uppercase tracking-wider">ORIGINAL</div>
              <div class="bg-[#FDE8E8] p-3 text-xs text-black text-left leading-relaxed">
                {{ currentSuggestion.original }}
              </div>
            </div>

            <div class="space-y-1 text-center">
              <div class="text-[10px] text-neutral-500 uppercase tracking-wider">SUGGESTED</div>
              <div class="bg-[#EAF7EE] p-3 text-xs text-black text-left leading-relaxed">
                {{ currentSuggestion.suggested }}
              </div>
            </div>

            <p class="text-[11px] text-neutral-600 leading-relaxed">
              <span class="font-bold text-black">Why:</span> {{ currentSuggestion.why }}
            </p>

            <div class="flex items-center justify-center gap-3 pt-2">
              <button
                @click="acceptCurrentSuggestion"
                class="vh-btn-green px-6 py-2 text-xs font-bold"
              >
                Accept
              </button>
              <button
                @click="editCurrentSuggestion"
                class="vh-btn-white px-6 py-2 text-xs"
              >
                Edit
              </button>
              <button
                @click="skipCurrentSuggestion"
                class="bg-white border border-neutral-400 hover:border-black text-neutral-600 hover:text-black px-6 py-2 text-xs transition-colors cursor-pointer"
              >
                Skip
              </button>
            </div>

            <div class="text-center text-xs text-[#1E6091] font-bold">
              Score: {{ currentScore }} &rarr; {{ currentScore + currentSuggestion.impact }} if accepted
            </div>
          </div>

          <div v-else class="py-4 space-y-6 text-center">
            <h2 class="text-base font-bold text-black">
              All 5 suggestions reviewed!
            </h2>

            <div class="max-w-md mx-auto pt-2">
              <ScoreGauge :score="78" :show-score-label="true" />
            </div>

            <div class="text-sm font-bold text-[#1E6091] pt-6">
              Your score went from 41 to 78.
            </div>

            <div class="space-y-3 max-w-sm mx-auto pt-2">
              <button
                @click="downloadResume"
                class="w-full vh-btn-green py-2.5 text-xs font-bold"
              >
                Export corrected resume
              </button>

              <NuxtLink
                to="/compare"
                class="block w-full bg-white border border-[#237A3B] hover:bg-[#EAF7EE] text-[#237A3B] py-2.5 text-xs font-bold transition-colors text-center"
              >
                Compare to a Job Listing
              </NuxtLink>
            </div>
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
const showDownloadToast = ref(false)
const allReviewed = ref(false)
const activeSuggestionIndex = ref(2)
const currentScore = ref(56)

const suggestions = ref([
  {
    category: 'Clarify target title',
    original: 'IT and cybersecurity operations leader with 18 years of experience running secure enterprise networks...',
    suggested: 'Senior Infrastructure & Security Director with 18+ years leading enterprise network operations and federal compliance.',
    why: 'Civilian recruiters search for industry titles rather than broad military descriptions.',
    impact: 6,
    accepted: true
  },
  {
    category: 'Translate rank to civilian leadership',
    original: 'Network Operations Manager (Flight Chief), U.S. Air Force Cyber Operations',
    suggested: 'Director of Network Operations & Infrastructure | USAF Cyber Operations',
    why: 'Flight Chief is a military tier; framing as Director matches civilian executive parity.',
    impact: 5,
    accepted: true
  },
  {
    category: 'Add measurable results',
    original: 'Led 47-member flight sustaining AFNET backbone (NIPR/SIPR/JWICS) for 186 GSUs across 9 MAJCOMs; 99.997% uptime.',
    suggested: 'Managed a 47-person team running a secure enterprise network for 186 sites across 9 regional commands, keeping 99.997% uptime.',
    why: 'Your numbers are strong. The acronyms around them hide them. Team size, site count, and uptime are what a hiring manager scans for.',
    impact: 7,
    accepted: false
  },
  {
    category: 'Clarify compliance frameworks',
    original: 'Authored RMF packages for 14 enclaves via eMASS; achieved full ATO from AO with zero CAT I findings at CCRI.',
    suggested: 'Wrote NIST RMF security authorization packages for 14 networks and passed federal cybersecurity inspections with zero critical findings.',
    why: 'Civilian teams understand NIST RMF and audit compliance; military acronyms like eMASS and CCRI are obscure in private sector.',
    impact: 6,
    accepted: false
  },
  {
    category: 'Civilianize staff appraisals',
    original: 'Rated 7 TSgts/SSgts on EPBs/ACAs; 3x SNCO selected for SNCOA in-residence.',
    suggested: 'Wrote annual performance reviews for 7 supervisors and mentored 3 team members into senior leadership programs.',
    why: 'EPBs and SNCOA are USAF-specific jargon. People leadership and career coaching resonate with every hiring director.',
    impact: 4,
    accepted: false
  }
])

const currentSuggestion = computed(() => {
  return suggestions.value[activeSuggestionIndex.value]
})

const prevSuggestion = () => {
  if (activeSuggestionIndex.value > 0) {
    activeSuggestionIndex.value--
  }
}

const nextSuggestion = () => {
  if (activeSuggestionIndex.value < suggestions.value.length - 1) {
    activeSuggestionIndex.value++
  } else {
    allReviewed.value = true
  }
}

const acceptCurrentSuggestion = () => {
  currentSuggestion.value.accepted = true
  currentScore.value += currentSuggestion.value.impact
  if (activeSuggestionIndex.value < suggestions.value.length - 1) {
    activeSuggestionIndex.value++
  } else {
    allReviewed.value = true
    localStorage.setItem('resume_uploaded', 'true')
  }
}

const editCurrentSuggestion = () => {
  const custom = prompt('Edit suggested text:', currentSuggestion.value.suggested)
  if (custom) {
    currentSuggestion.value.suggested = custom
    acceptCurrentSuggestion()
  }
}

const skipCurrentSuggestion = () => {
  if (activeSuggestionIndex.value < suggestions.value.length - 1) {
    activeSuggestionIndex.value++
  } else {
    allReviewed.value = true
  }
}

const downloadResume = () => {
  showDownloadToast.value = true
  const element = document.createElement('a')
  const file = new Blob(['MSGT (E-7) JANE J. DOE, USAF\nCivilianized Resume via VetHire\nScore: 78/100'], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = 'Doe_Jane_Resume_Civilian.pdf'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
</script>
