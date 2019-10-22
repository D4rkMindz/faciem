export default function ({ $axios, store, $router, route, redirect }) {
  $axios.interceptors.request.use(function (config) {
    if (store.getters['auth/hasToken']) {
      config.headers.common.Authorization = store.getters['auth/getToken'];
    }

    return config;
  });

  $axios.interceptors.response.use(function (config) {
    return config;
  }, function (error) {
    if (error.response.status === 401 && route.name !== 'login') {
      // eslint-disable-next-line no-console
      console.log(error);
      store.dispatch('auth/logout');
      return redirect('/login');
    }
    throw error;
  });
}
