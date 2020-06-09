export default function ({ store, redirect, route, app }) {
  if (!store.getters['auth/isAuthenticated'] && route.name !== 'login') {
    // eslint-disable-next-line no-console
    console.log('middleware redirect');
    return redirect(app.localeRoute('/login'));
  }
}
