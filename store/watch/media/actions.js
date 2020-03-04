import { WATCH_STATE } from '@/store/watch/media';

export default {
  async loadNextMedia({ commit, rootGetters }) {
    commit('setState', WATCH_STATE.LOADING);
    try {
      const userId = rootGetters['auth/getUserId'];
      const url = `/users/${userId}/next`;
      const response = await this.$axios.get(url);
      if (response.status !== 200) {
        commit('setState', WATCH_STATE.ERROR);
        return;
      }
      if (response.data.found) {
        commit('setMedia', response.data.media);
        commit('setState', WATCH_STATE.LOADED);
      } else {
        commit('setState', WATCH_STATE.ALL_WATCHED);
      }
    } catch (e) {
      commit('setState', WATCH_STATE.ERROR);
    }
  },
};
