import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Disable server-side rendering for static site
  ssr: false,
  // Configure Nitro for static output (Azure Static Web Apps)
  nitro: {
    preset: 'static'
  },
  // No server middleware needed; server/api will be auto-handled
})
