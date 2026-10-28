<template>
  <div class="min-h-screen bg-canvas flex flex-col font-mono text-black">
    <!-- Top Header -->
    <AppHeader />

    <!-- Main Content Container -->
    <main class="flex-1 max-w-4xl w-full mx-auto p-6 sm:p-12 flex flex-col justify-between">
      <div class="space-y-8">
        <!-- Title -->
        <h1 class="text-xl font-bold tracking-tight text-center">
          Upload your resume
        </h1>

        <!-- State 1: Select File (Dashed Box) -->
        <div v-if="!selectedFile" class="space-y-4 max-w-2xl mx-auto">
          <div
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            class="border-2 border-dashed border-black bg-transparent p-12 flex flex-col items-center justify-center text-center transition-colors"
            :class="isDragging ? 'bg-[#EAF7EE]' : ''"
          >
            <input
              ref="fileInputRef"
              type="file"
              accept=".pdf,.docx,.txt"
              class="hidden"
              @change="handleFileChange"
            />

            <!-- Upload Tray/Arrow Icon -->
            <div class="text-black mb-4">
              <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v12m0-12l-4 4m4-4l4 4" />
              </svg>
            </div>

            <!-- Select Resume File Green Button -->
            <button
              type="button"
              @click="triggerFileInput"
              class="vh-btn-green px-6 py-2.5 text-sm font-medium tracking-wide shadow-none"
            >
              Selct resume file
            </button>
          </div>

          <!-- Prompt text below box -->
          <p class="text-xs text-[#237A3B] text-center font-mono">
            Click the button above to select<br />and upload your resume!
          </p>

          <!-- Prototype Quick Test Button -->
          <div class="text-center pt-2">
            <button
              @click="loadSampleResume"
              class="text-xs text-[#2B78E4] hover:underline"
            >
              (Demo: Load sample military resume)
            </button>
          </div>
        </div>

        <!-- State 2: File Chosen (Solid Green Box + Civilian Job Selection) -->
        <div v-else class="space-y-6 max-w-2xl mx-auto">
          <!-- File Details Green Border Box -->
          <div class="border-2 border-[#237A3B] bg-white p-6 flex flex-col items-center justify-center text-center space-y-2">
            <!-- Document Icon -->
            <div class="text-black">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="text-sm font-bold text-black">
              {{ selectedFile.name }}
            </div>
            <div class="text-xs text-neutral-500">
              {{ selectedFile.sizeText || '4.9 KB · 1 page · PDF' }}
            </div>
            <button
              @click="resetFile"
              class="text-xs text-[#2B78E4] hover:underline pt-1"
            >
              Change file
            </button>
          </div>

          <!-- Job Aiming Prompt -->
          <div class="space-y-3 text-center">
            <h2 class="text-xs font-bold text-black">
              What kind of civilian job are you aiming for?
            </h2>

            <!-- Options Grid -->
            <div class="space-y-2 max-w-md mx-auto text-xs">
              <div class="flex flex-col sm:flex-row gap-2">
                <label
                  v-for="job in ['IT / Cybersecurity Management', 'Project Management']"
                  :key="job"
                  class="flex-1 border p-2.5 flex items-center gap-2 cursor-pointer transition-colors"
                  :class="selectedTarget === job ? 'border-black bg-white font-bold' : 'border-[#CCCCCC] bg-white hover:border-black'"
                >
                  <input
                    type="radio"
                    name="targetJob"
                    :value="job"
                    v-model="selectedTarget"
                    class="accent-[#237A3B]"
                  />
                  <span>{{ job }}</span>
                </label>
              </div>

              <div class="flex flex-col sm:flex-row gap-2">
                <label
                  v-for="job in ['Teaching & Training', 'Network Engineering']"
                  :key="job"
                  class="flex-1 border p-2.5 flex items-center gap-2 cursor-pointer transition-colors"
                  :class="selectedTarget === job ? 'border-black bg-white font-bold' : 'border-[#CCCCCC] bg-white hover:border-black'"
                >
                  <input
                    type="radio"
                    name="targetJob"
                    :value="job"
                    v-model="selectedTarget"
                    class="accent-[#237A3B]"
                  />
                  <span>{{ job }}</span>
                </label>
              </div>

              <div>
                <label
                  class="w-full border p-2.5 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  :class="selectedTarget === 'Not sure yet, show me options' ? 'border-black bg-white font-bold' : 'border-[#CCCCCC] bg-white hover:border-black'"
                >
                  <input
                    type="radio"
                    name="targetJob"
                    value="Not sure yet, show me options"
                    v-model="selectedTarget"
                    class="accent-[#237A3B]"
                  />
                  <span>Not sure yet, show me options</span>
                </label>
              </div>
            </div>

            <!-- Upload & Analyze Button -->
            <div class="pt-2">
              <button
                @click="uploadAndAnalyze"
                class="px-8 py-2.5 text-sm font-medium transition-colors cursor-pointer text-center"
                :class="selectedTarget ? 'bg-[#237A3B] hover:bg-[#1B6530] text-white' : 'bg-[#A8ACA9] text-white'"
              >
                Upload & Analyze
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Go Back Action -->
      <div class="pt-12">
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
useHead({
  title: 'VetHire - Upload your resume'
})

const fileInputRef = ref(null)
const isDragging = ref(false)
const selectedFile = ref(null)
const selectedTarget = ref('IT / Cybersecurity Management')
const router = useRouter()

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const handleDrop = (e) => {
  isDragging.value = false
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    setFile(e.dataTransfer.files[0])
  }
}

const handleFileChange = (e) => {
  if (e.target.files && e.target.files[0]) {
    setFile(e.target.files[0])
  }
}

const setFile = (file) => {
  selectedFile.value = {
    name: file.name,
    sizeText: `${(file.size / 1024).toFixed(1)} KB · 1 page · ${file.name.split('.').pop().toUpperCase()}`
  }
}

const loadSampleResume = () => {
  selectedFile.value = {
    name: 'Resume_Doe_USAF_3D1X2.pdf',
    sizeText: '4.9 KB · 1 page · PDF'
  }
}

const resetFile = () => {
  selectedFile.value = null
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const uploadAndAnalyze = () => {
  localStorage.setItem('resume_uploaded', 'true')
  router.push('/review')
}
</script>
