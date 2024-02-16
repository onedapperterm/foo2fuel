//https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  routeRules: {
    '/': { prerender: true },
  },
  modules: [
    '@nuxtjs/tailwindcss', 
    'shadcn-nuxt', 
    'nuxt-icon', 
    '@nuxtjs/i18n'
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  i18n: {
    lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    locales: [
      {
        code: "en-US",
        iso: "en-US",
        name: "English(US)",
        file: "en-US.json",
      },
      {
        code: "es-ES",
        iso: "es-ES",
        name: "Español",
        file: "es-ES.json",
      },
      {
        code: "de-DE",
        iso: "de-DE",
        name: "Deutsch",
        file: "de-DE.json",
      },
      {
        code: "vi_VN",
        iso: "vi_VN",
        name: "Việt",
        file: "vi_VN.json",
      },
    ],
    defaultLocale: "en-US",
  },
})
