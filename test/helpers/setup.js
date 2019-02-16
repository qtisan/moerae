require('browser-env')();
const hooks = require('require-extension-hooks');
const Vue = require('vue');

Vue.config.productionTip = false;

hooks('vue').plugin('vue').push();
hooks(['vue', 'js']).exclude(({ filename }) => filename.match(/node_modules\//)).plugin('babel').push();

// fix the issue `https://github.com/nuxt/create-nuxt-app/issues/180` temporarily.
window.Date = global.Date = Date;
