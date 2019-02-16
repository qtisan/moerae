export default function ({ isHMR, app, store, route, params, error, redirect }) {
  if (isHMR) return;
  const locale = params.lang || store.state.locale;
  if (store.state.locales.indexOf(route.fullPath.split('/')[1]) === -1) {
    return redirect(`/${locale}${route.fullPath}`);
  }
  store.commit('SET_LANG', locale);
  app.i18n.locale = store.state.locale;
}
