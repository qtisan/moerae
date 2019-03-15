import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
export default ({ app, store }, inject) => {
  // // Set i18n instance on app
  // // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    messages: {
      'en': require('~/assets/locales/en-us.json'),
      'cn': require('~/assets/locales/zh-cn.json')
    }
  });

  const _p = app.i18n.path = link => `/${app.i18n.locale}${link}`;
  inject('path', _p);
  inject('redirect', link => app.router.push(_p(link)));
};
