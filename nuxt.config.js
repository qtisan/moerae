
const { resolve } = require('fast-url-parser');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const _ = require('lodash');
const pkg = require('./package');

const isDev = process.env.NODE_ENV === 'development';
const port = isDev ? (process.env.MR_DEV_PORT || 8081) : process.env.MR_APP_PORT;
const host = isDev ? (process.env.MR_DEV_HOST || `localhost:${port}`) : process.env.MR_HOST;
const basePath = isDev ? (process.env.MR_DEV_BASE_PATH || '/') : process.env.MR_BASE_PATH;
const baseUrl = `http://${host}${basePath}`;

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
        href: resolve(baseUrl, './google-fonts.css')
      }
    ]
  },
  server: {
    host,
    port
  },
  serverMiddleware: [
    { path: '/api', handler: '~server/api/index.js' }
  ],

  env: {
    baseUrl,
    database: {
      host: process.env.MR_MONGO_HOST || 'localhost',
      port: process.env.MR_MONGO_PORT || 27017,
      db: (isDev ? process.env.MR_DEV_MONGO_DBNAME : process.env.MR_MONGO_DBNAME) || 'moerae_default_db',
      user: process.env.MR_MONGO_USERNAME || 'moerae',
      pass: process.env.MR_MONGO_PASSWORD || 'password!@#$%'
    }
  },

  loading: { color: '#f38711' },
  router: {
    base: basePath,
    middleware: ['cs', 'i18n']
  },
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  css: [
    '~assets/page-transition.css'
  ],
  plugins: [
    '~plugins/i18n',
    '~plugins/vuetify'
  ],
  generate: {
    routes: ['/']
  },
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios'
  ],
  styleResources: {
    stylus: ['~assets/stylus/main.styl']
  },
  globalName: {
    id: globalName => `__${globalName}`,
    nuxt: globalName => `$${globalName}`,
    context: globalName => `__${globalName.toUpperCase()}__`,
    pluginPrefix: globalName => globalName,
    readyCallback: globalName => `on${_.capitalize(globalName)}Ready`,
    loadedCallback: globalName => `_on${_.capitalize(globalName)}Loaded`
  },
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/stylus/vars.styl']
      }
    },
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = '#source-map';
      }
    }
  }
};
