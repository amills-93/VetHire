import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,

  nitro: {
    preset: 'azure',

    prerender: {
      routes: ['/']
    }
  }
})
