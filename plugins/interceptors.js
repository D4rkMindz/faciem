export default function (vue) {
  const { $axios, store, route } = vue;
  const $toast = vue.store.$toast;
  const $t = vue.store.$t;
  const localeRoute = vue.store.localeRoute;
  const $router = vue.store.$router;
  let isAlreadyFetchingAccessToken = false;
  let subscribers = [];

  function onAccessTokenFetched(accessToken) {
    subscribers = subscribers.filter(callback => callback(accessToken));
  }

  function addSubscriber(callback) {
    subscribers.push(callback);
  }

  $axios.interceptors.request.use(function (config) {
    if (store.getters['auth/hasToken']) {
      config.headers.common.Authorization = store.getters['auth/getToken'];
    }

    return config;
  });

  // $axios.interceptors.response.use(r => r, async function (error) {
  //   if (error.response.status === 401 && route.name !== 'login') {
  //     if (store.getters['auth/hasRefreshToken']) {
  //       const refreshToken = store.getters['auth/refreshToken'];
  //       store.dispatch('auth/refresh', { refreshToken: refreshToken });
  //     } else {
  //       store.dispatch('auth/logout');
  //       $toast.error('Session expired');
  //       await $router.push({ name: 'login' });
  //     }
  //   }
  //
  //   return Promise.reject(error);
  // });

  $axios.interceptors.response.use(r => r, async function (error) {
    const { config, response: { status } } = error;
    const originalRequest = config;

    if (status === 401 && route.name !== 'login') {
      if (!store.getters['auth/hasRefreshToken']) {
        store.dispatch('auth/logout');
        $toast.error($t('ERRORS.session-expired'));
        await $router.push(localeRoute({ name: 'login' }));
        return;
      }
      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;
        const userId = store.getters['auth/getUserId'];
        const refreshToken = store.getters['auth/refreshToken'];
        // instead of this store call you would put your code to get new token
        store.dispatch('auth/refresh', { refreshToken: refreshToken, userId: userId }).then(async () => {
          if (store.getters['auth/hasError']) {
            subscribers = [];
            $toast.error($t('ERRORS.session-expired'));
            await $router.push(localeRoute({ name: 'login' }));
            return;
          }
          const token = store.getters['auth/getToken'];
          isAlreadyFetchingAccessToken = false;
          onAccessTokenFetched(token);
        });
      }

      return new Promise((resolve) => {
        addSubscriber(() => {
          originalRequest.headers.Authorization = store.getters['auth/getToken'];
          resolve($axios(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  });
}
