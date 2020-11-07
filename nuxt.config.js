export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  // mode: 'universal', // deprecated
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Lokabees Consumer',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=5',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Shopverwaltung',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }],
  },
  /*
   ** The env Property
   ** See https://nuxtjs.org/api/configuration-env/
   ** also https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config/
   */
  publicRuntimeConfig: {
    mapboxKey: process.env.MAPBOX_KEY,
  },
  privateRuntimeConfig: {
    ctfAccessTokem: process.env.CTF_CDA_ACCESS_TOKEN,
    ctfSpaceId: process.env.CTF_SPACE_ID,
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/main'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/modules/i18n',
    '~/plugins/modules/vue-formulate',
    { src: '~/plugins/modules/eva-icons', ssr: false },
    { src: '~/plugins/modules/eva-icons', ssr: false },
    { src: '~/plugins/modules/mapbox', ssr: false },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    // Doc: https://github.com/nuxt-community/google-fonts-module
    '@nuxtjs/google-fonts',
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/markdownit
    '@nuxtjs/markdownit',
  ],
  /**
   ** Markdown configuration
   */
  markdownit: {
    preset: 'default',
    breaks: true,
    injected: true,
  },
  /*
   ** google fonts module configuration
   ** See https://github.com/nuxt-community/google-fonts-module#options
   ** Todo: @lukas - Set specific font weights if purgecss not active - test it
   ** also specific subset
   */
  googleFonts: {
    families: {
      Merriweather: [400, 900],
      Montserrat: [400, 500],
    },
  },
  /*
   ** Pwa module configuration
   ** See https://pwa.nuxtjs.org/modules/workbox.html#config
   */
  pwa: {
    workbox: {
      clientsClaim: false,
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
  },
  proxy: {
    '/api': { target: process.env.API_URL },
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
}
