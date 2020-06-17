import { INFO_STATES } from '@/domain/profile/info-states';

export default {
  /**
   * Refresh the balance
   * @param rootGetters
   * @param commit
   * @return {Promise<void>}
   */
  async refreshInfo({ rootGetters, commit }) {
    commit('setState', INFO_STATES.FETCHING);
    try {
      const userId = rootGetters['auth/getUserId'];
      const url = `/users/${userId}`;
      const response = await this.$axios.get(url);
      if (response.status === 200) {
        commit('setState', INFO_STATES.FETCHED);
        const i = response.data.info;
        commit('setInfo', {
          username: i.username,
          firstName: i.first_name,
          middleName: i.middle_name,
          lastName: i.last_name,
          birthDate: i.birth_date,
          registeredAt: i.registered_at,
          lastLoginAt: i.last_login_at,
        });
      } else {
        commit('resetInfo');
        commit('setState', INFO_STATES.FAILED);
      }
    } catch (e) {
      commit('setState', INFO_STATES.FAILED);
      commit('setBalance', { });
    }
  },
};
