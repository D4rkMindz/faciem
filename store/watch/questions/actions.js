import { WATCH_STATE } from '@/store/watch/media';

export default {
  async getQuestionsForMedia({ commit, rootGetters }, hash) {
    commit('setState', WATCH_STATE.LOADING);
    try {
      const userId = rootGetters['auth/getUserId'];
      const url = `/users/${userId}/next`;
      const response = await this.$axios.get(url);
      if (response.status !== 200) {
        commit('setState', WATCH_STATE.ERROR);
        return;
      }
      const media = {
        hash: response.data.hash,
      };
      commit('setMedia', media);
      commit('setState', WATCH_STATE.LOADED);
    } catch (e) {
      commit('setState', WATCH_STATE.ERROR);
    }
  },
};
