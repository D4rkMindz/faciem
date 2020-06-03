export default function ({ store, redirect, route, app }) {
  // use store.getters.isAuth ...
  if (!store.getters['auth/isAuthenticated'] && route.name !== 'login') {
    const locale = app.i18n && app.i18n.locale ? app.i18n.locale : 'en';
    return redirect(`/${locale}/login`);
  }
}
