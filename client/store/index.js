
export const state = () => ({
  menus: [],
  currentUser: {},
  notifications: []
});

export const mutations = {
  fillMenus(state, { menus }) {
    state.menus = menus;
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
  async signin({ commit }, payload) {
    const res = await this.$axios.$get('https://jsonplaceholder.typicode.com/users/1');
    if (res) {
      commit('setCurrentUser', { user: res });
    }
  }
};
