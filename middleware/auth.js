export default function ({ store, redirect, route, app }) {
  if (!store.getters['auth/isAuthenticated'] && route.name !== 'login') {
    return redirect(app.localeRoute('/login'));
  }
}
