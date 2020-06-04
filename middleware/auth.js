export default function ({ store, redirect, route, app }) {
  // use store.getters.isAuth ...
  if (!store.getters['auth/isAuthenticated'] && route.name !== 'login') {
    return redirect(app.localeRoute('/login'));
  }
}
