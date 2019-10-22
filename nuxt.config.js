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
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/localstorage.js', ssr: false },
    { src: '~/plugins/interceptors.js', ssr: false },
    { src: '~/plugins/notifications.js', ssr: false },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/toast',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'https://venovum.dev/',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  toast: {
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
  /*
   ** Build configuration
   */
  build: {
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
        config.output.publicPath = './_nuxt/';
      }

      return config;
    },
  },
};

const final = Object.assign({}, config, env);
module.exports = final;
