export default function ({ app, store }) {
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    const token = store.getters['auth/getToken'];
    if (token) {
      store.dispatch('profile/language/updateLocale', { locale: newLocale });
    }
  };
}
