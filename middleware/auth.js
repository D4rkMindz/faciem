export default function ({ store, redirect, route }) {
  // use store.getters.isAuth ...
  if (!store.getters['auth/isAuthenticated'] && route.name !== 'login') {
    return redirect('/login');
  }
}
