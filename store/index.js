
export const state = () => ({
  locales: ['en', 'cn'],
  locale: 'en',
  currentUser: {},
  notifications: []
});

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale;
    }
  },
  setCurrentUser(state, { user, notifications }) {
    state.currentUser = user;
    state.notifications = notifications;
  },
  clearUserInfo(state) {
    state.currentUser = {};
    state.notifications = [];
  }
};

export const actions = {
  nuxtServerInit({ commit, dispatch }, { req, res, route }) {
    // is called before all the middlewares.
  },
  async signin(ctx, payload) {
    const res = await this.$axios.$get('https://jsonplaceholder.typicode.com/users/1');
    if (res) {
      ctx.commit('setCurrentUser', { user: res });
    }
  }
};
