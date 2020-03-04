import { CAMPAIGNS_STATE } from '@/store/campaigns/index';

export default {
  async update({ commit, rootGetters }) {
    commit('setState', CAMPAIGNS_STATE.UPDATING);
    try {
      const userId = rootGetters['auth/getUserId'];
      const url = `/users/${userId}/campaigns`;
      const response = await this.$axios.get(url);
      if (response.status !== 200) {
        commit('setState', CAMPAIGNS_STATE.ERROR);
        return;
      }
      commit('setCampaigns', response.data.campaigns);
      commit('setState', CAMPAIGNS_STATE.UP_TO_DATE);
    } catch (e) {
      commit('setState', CAMPAIGNS_STATE.ERROR);
    }
  },
};
