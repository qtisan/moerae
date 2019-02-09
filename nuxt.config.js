
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const pkg = require('./package');

const isDev = process.env.NODE_ENV === 'development';
const port = isDev ? (process.env.MR_DEV_PORT || 8081) : process.env.MR_APP_PORT;
const host = isDev ? (process.env.MR_DEV_HOST || `localhost:${port}`) : process.env.MR_HOST;
debugger;
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
          new URL('./google-fonts.css', `http://${host}/`).href
      }
    ]
  },
  server: {
    host,
    port
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
