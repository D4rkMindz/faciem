
const stage = process.env.NODE_ENV || 'dev';
const env = require('./nuxt.config.' + stage + '.js');
const colors = require('./tailwind.config').theme;

const config = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Venovum',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Venovum lets you earn money by providing feedback to specific advertisements. Start today by watching taylored advertisements',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  render: {
    compressor: false,
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'white' },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/scss/venovum.scss',
    'video.js/dist/video-js.css',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/global-components.js', ssr: false },
    { src: '~/plugins/localstorage.js', ssr: false },
    { src: '~/plugins/interceptors.js', ssr: false },
    { src: '~/plugins/notifications.js', ssr: false },
    { src: '~/plugins/icons.js', ssr: false },
    { src: '~/plugins/i18n-switch.js', ssr: false },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/toast',
    'nuxt-i18n',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'https://api.test.venovum.com',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  toast: {
    duration: 3000,
    theme: 'outline',
    position: 'bottom-right',
    type: 'default',
    keepOnHover: true,
    action: [{
      text: 'OK',
      onClick: (e, toast) => {
        toast.goAway(0);
      },
    }],
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        iso: 'en-GB',
        name: 'English',
        file: 'en-GB.json',
      }, {
        code: 'de',
        iso: 'de-CH',
        name: 'Deutsch',
        file: 'de-CH.json',
      },
    ],
    vuex: {
      syncLocale: true,
      syncMessages: true,
    },
    seo: true,
    lazy: true,
    langDir: 'assets/lang/',
    // TODO implement hook to change the language in JWT
    onLanguageSwitched: (oldLocale, newLocale) => null,
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^vue-awesome/],
    postcss: {
      plugins: {
        tailwindcss: './tailwind.config.js',
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev }) {
      if (!isDev) {
        config.output.publicPath = '/_nuxt/';
        // eslint-disable-next-line no-console
        console.log = console.error = console.warn = () => null;
      }

      return config;
    },
  },
};

const final = Object.assign({}, config, env);
module.exports = final;
