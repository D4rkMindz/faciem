import { LANGUAGE_STATES } from '@/domain/profile/language-states';

export default {
  /**
   * Refresh the balance
   * @param rootGetters
   * @param commit
   * @param getters
   * @param dispatch
   * @param locale
   * @return {Promise<void>}
   */
  async updateLocale({ rootGetters, commit, getters, dispatch }, { locale }) {
    const oldLocale = getters.getLocale;
    commit('setState', LANGUAGE_STATES.UPDATING);
    commit('setLocale', locale);
    try {
      const userId = rootGetters['auth/getUserId'];
      const url = `/users/${userId}/language`;
      const response = await this.$axios.put(url, { locale: locale });
      if (response.status === 200) {
        commit('setState', LANGUAGE_STATES.UPDATED);

        const userId = rootGetters['auth/getUserId'];
        const refreshToken = rootGetters['auth/refreshToken'];
        // instead of this store call you would put your code to get new token
        await dispatch('auth/refresh', { refreshToken: refreshToken, userId: userId }, { root: true });
      } else {
        commit('setState', LANGUAGE_STATES.FAILED);
        commit('setLocale', oldLocale);
        this.$toast.error(this.$i18n.t('ERRORS.failed-to-update-language'));
      }
    } catch (e) {
      commit('setState', LANGUAGE_STATES.FAILED);
      commit('setLocale', oldLocale);
    }
  },
};
