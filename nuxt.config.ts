import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  serverMiddleware: [
    '~/server/middleware/rate-limit.js',
    '~/server/middleware/auth.js',
  ],
})
