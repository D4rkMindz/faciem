import { BALANCE_STATES } from '@/domain/profile/balance-states';

export default {
  /**
   * Refresh the balance
   * @param rootGetters
   * @param commit
   * @return {Promise<void>}
   */
  async refreshBalance({ rootGetters, commit }) {
    commit('setState', BALANCE_STATES.FETCHING);
    try {
      const userId = rootGetters['auth/getUserId'];
      const url = `/users/${userId}/account/balance`;
      const response = await this.$axios.get(url);
      if (response.status === 200) {
        commit('setState', BALANCE_STATES.FETCHED);
        commit('setBalance', response.data.balance);
      } else {
        commit('setState', BALANCE_STATES.FAILED);
        commit('setBalance', { });
      }
    } catch (e) {
      commit('setState', BALANCE_STATES.FAILED);
      commit('setBalance', { });
    }
  },
};
