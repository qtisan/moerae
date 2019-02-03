
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const pkg = require('./package');

const isDev = process.env.NODE_ENV === 'development';
// modify the url in real development env. http://localhost:8081/ for example.
const MR_HOST_URL = isDev ? 'http://dev.cc/' : process.env.MR_HOST_URL;
const MR_APP_PORT = isDev ? 8081 : process.env.MR_APP_PORT;

module.exports = {
  mode: 'universal',
  head: {
    title: pkg.name,
    titleTemplate: `%s | ${pkg.description}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          new URL('./google-fonts.css', MR_HOST_URL).href
      }
    ]
  },
  server: {
    port: MR_APP_PORT
  },

  loading: { color: '#f38711' },
  css: [
    '~/assets/style/app.styl'
  ],
  plugins: [
    '@/plugins/vuetify'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
      if (ctx.isDev) {
        config.devtool = '#source-map';
      }
    }
  }
};
