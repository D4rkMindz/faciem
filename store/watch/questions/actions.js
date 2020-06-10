import { QUESTIONS_STATE } from '@/store/watch/questions/index';
import { Question } from '@/domain/campaign/question';

/**
 * Parse questions
 * @param q
 * @return {[]|*[]}
 */
function parseQuestions(q) {
  if (!q) {
    return [];
  }
  const questions = [];
  q.forEach((question) => {
    const data = {};
    data.id = question.id;
    data.type = question.question_type;
    data.text = question.question;
    data.value = null;
    data.answers = question.answers;
    questions.push(new Question(data));
  });

  return questions;
}

export default {
  /**
   * Get questions for a media
   * @param commit
   * @param campaignId
   * @return {Promise<void>}
   */
  async getQuestionsForMedia({ commit }, campaignId) {
    commit('setState', QUESTIONS_STATE.LOADING);
    try {
      const url = `/campaigns/${campaignId}/questions`;
      const response = await this.$axios.get(url);
      if (response.status !== 200) {
        commit('setState', QUESTIONS_STATE.ERROR);
        return;
      }
      commit('setQuestions', parseQuestions(response.data.questions));
      commit('setState', QUESTIONS_STATE.LOADED);
    } catch (e) {
      commit('setState', QUESTIONS_STATE.ERROR);
    }
  },
  /**
   * Save questions
   * @param commit
   * @param getters
   * @param rootGetters
   * @param campaignId
   * @return {Promise<void>}
   */
  async saveQuestions({ commit, getters, rootGetters }) {
    commit('setState', QUESTIONS_STATE.SAVING);
    try {
      const userId = rootGetters['auth/getUserId'];
      const media = rootGetters['watch/media/getMedia'];
      const questions = rootGetters['watch/questions/getQuestions'];
      const url = `/campaigns/${media.campaign_id}/users/${userId}/answers`;
      const data = {
        answers: questions,
      };
      const response = await this.$axios.post(url, data);
      if (response.status !== 200) {
        commit('setState', QUESTIONS_STATE.ERROR);
        return;
      }
      commit('setQuestions', []);
      commit('setState', QUESTIONS_STATE.SAVED);
    } catch (e) {
      commit('setState', QUESTIONS_STATE.ERROR);
    }
  },
};
