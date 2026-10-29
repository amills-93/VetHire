<template>
  <div class="w-full space-y-2 font-mono">
    <div class="w-full h-8 flex overflow-hidden">
      <div class="flex-1 bg-vh-red-gauge" :class="softColors ? 'opacity-80' : ''"></div>
      <div class="flex-1 bg-vh-yellow-gauge" :class="softColors ? 'opacity-80' : ''"></div>
      <div class="flex-1 bg-vh-green" :class="softColors ? 'opacity-80' : ''"></div>
    </div>

    <div class="relative pt-1">
      <div class="flex justify-between text-xs text-black">
        <span>Bad</span>
        <span>Good</span>
      </div>

      <div
        class="absolute -top-1 transform -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-500"
        :style="{ left: `${clampedScore}%` }"
      >
        <span class="text-xl leading-none text-black font-bold">↑</span>
        <span v-if="showScoreLabel" class="text-sm font-bold text-black mt-0.5">
          {{ score }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  score: {
    type: Number,
    default: 50
  },
  showScoreLabel: {
    type: Boolean,
    default: false
  },
  softColors: {
    type: Boolean,
    default: false
  }
})

const clampedScore = computed(() => {
  return Math.max(8, Math.min(92, props.score))
})
</script>
