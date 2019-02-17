import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import en from '~/assets/locales/en-us.json';

Vue.use(Vuetify, {
  lang: {
    locales: { en },
    current: 'en'
  }
});
