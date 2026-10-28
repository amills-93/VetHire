import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Client-rendered SPA; the login page relies on localStorage
  ssr: false,
  // Builds the frontend to .output/public and server/api to an Azure Functions
  // app in .output/server for Azure Static Web Apps
  nitro: {
    preset: 'azure'
  }
})
