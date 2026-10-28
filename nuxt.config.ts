import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,

  css: [
    '~/assets/css/main.css'
  ],

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  app: {
    head: {
      title: 'VetHire - Veteran Transition Platform',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600;700&display=swap' }
      ]
    }
  },

  nitro: {
    preset: 'azure',

    prerender: {
      routes: ['/']
    }
  }
})
