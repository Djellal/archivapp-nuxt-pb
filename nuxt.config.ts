// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxt/ui',
    '@vee-validate/nuxt'
  ],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', dir: 'ltr' },
      { code: 'ar', iso: 'ar-SA', file: 'ar.json', dir: 'rtl' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.json', dir: 'ltr' }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix'
  },
  runtimeConfig: {
    public: {
      pocketbaseUrl: 'http://127.0.0.1:8090'
    }
  }
})