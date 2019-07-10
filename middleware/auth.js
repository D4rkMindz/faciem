export default function ({ store, redirect }) {
  // use store.getters.isAuth ...
  if (!store.getters['auth/isAuthenticated']) {
    return redirect('/login');
  }
}
