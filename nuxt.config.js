
const { resolve } = require('fast-url-parser');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const _ = require('lodash');
const consola = require('consola');
const pkg = require('./package');

const isDev = process.env.NODE_ENV === 'development';
const port = isDev ? (process.env.MR_DEV_PORT || 8081) : process.env.MR_APP_PORT;
const host = isDev ? (process.env.MR_DEV_HOST || `localhost:${port}`) : process.env.MR_HOST;
const basePath = isDev ? (process.env.MR_DEV_BASE_PATH || '/') : process.env.MR_BASE_PATH;
const baseUrl = `http://${host}${basePath}`;

module.exports = {
  mode: 'universal',
  head: {
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
    '~assets/stylus/main.styl',
    '~assets/page-transition.css'
  ],
  plugins: [
    '~plugins/i18n',
    '~plugins/vuetify'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/apollo'
  ],
  globalName: {
    id: globalName => `__${globalName}`,
    nuxt: globalName => `$${globalName}`,
    context: globalName => `__${globalName.toUpperCase()}__`,
    pluginPrefix: globalName => globalName,
    readyCallback: globalName => `on${_.capitalize(globalName)}Ready`,
    loadedCallback: globalName => `_on${_.capitalize(globalName)}Loaded`
  },
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = '#source-map';
      }
    }
  },
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  apollo: {
    tokenName: `${pkg.name}-apollo-token`,
    tokenExpires: 10, // optional, default: 7 (days)
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    authenticationType: 'Basic', // optional, default: 'Bearer'
    errorHandler(error) {
      consola.error('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message);
    },
    clientConfigs: {
      default: {
        httpEndpoint: baseUrl,
        // See https://www.apollographql.com/docs/link/links/http.html#options
        httpLinkOptions: {
          uri: '/api',
          credentials: 'same-origin',
          headers: {
            'Accept-Encoding': 'gzip'
          }
        },
        tokenName: `${pkg.name}-apollo-token`
      }
    }
  }
};
