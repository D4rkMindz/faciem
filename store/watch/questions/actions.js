import { QUESTIONS_STATE } from '@/store/watch/questions/index';

export default {
  async getQuestionsForMedia({ commit, rootGetters }, campaignId) {
    commit('setState', QUESTIONS_STATE.LOADING);
    try {
      const url = `/campaigns/${campaignId}/questions`;
      const response = await this.$axios.get(url);
      if (response.status !== 200) {
        commit('setState', QUESTIONS_STATE.ERROR);
        return;
      }
      commit('setQuestions', response.data.questions);
      commit('setState', QUESTIONS_STATE.LOADED);
    } catch (e) {
      commit('setState', QUESTIONS_STATE.ERROR);
    }
  },
};
