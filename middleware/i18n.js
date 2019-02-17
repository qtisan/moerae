import consts from '~/assets/consts';
const { LANG } = consts.cookies;

export default function ({ isHMR, app, store, route, params, error, redirect, req, res, getCookie, setCookie }) {
  if (isHMR) return;
  const langInCookie = getCookie(LANG);
  const locale = langInCookie || store.state.locale;
  const lang = params.lang || langInCookie;
  if (store.state.locales.indexOf(params.lang) === -1) {
    return redirect(`/${locale}${route.fullPath}`);
  } else if (lang !== locale || lang !== store.state.locale) {
    store.commit('SET_LANG', lang);
    setCookie(LANG, lang);
    app.i18n.locale = lang;
  }
}
