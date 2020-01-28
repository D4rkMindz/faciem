export default function (vue) {
  const { $axios, store, route } = vue;
  const $toast = vue.store.$toast;
  const $router = vue.store.$router;
  $axios.interceptors.request.use(function (config) {
    if (store.getters['auth/hasToken']) {
      config.headers.common.Authorization = store.getters['auth/getToken'];
    }

    return config;
  });

  $axios.interceptors.response.use(r => r, async function (error) {
    if (error.response.status === 401 && route.name !== 'login') {
      store.dispatch('auth/logout');
      $toast.error('Session expired');
      await $router.push({ name: 'login' });
    }

    return Promise.reject(error);
  });
}
