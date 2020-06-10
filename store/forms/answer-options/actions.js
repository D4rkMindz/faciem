import cloneDeep from 'lodash.clonedeep';
import { TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS } from '@/store/forms/questions';
import { ANSWER_OPTION_STATES } from '@/store/forms/answer-options/index';

export default {
  /**
   * Validate an answer
   * @param commit
   * @param state
   * @param questionIndex
   * @param answerIndex
   */
  validateAnswers({ commit, state, rootGetters, getters }, { id }) {
    let answerIndex = null;
    state.answers.forEach((answer, index) => {
      if (answer.id === id) {
        answerIndex = index;
      }
    });
    if (answerIndex === null) {
      throw new Error(this.$i18n.t('ERRORS.answer-not-found'));
    }
    const answer = cloneDeep(state.answers[answerIndex]);
    answer.errors = [];
    const question = rootGetters['forms/questions/getById'](answer.question_id);
    const answerCount = getters.getAnswersForQuestion(answer.question_id).length;

    if (TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS.includes(question.type) && answerCount <= 1) {
      question.errors.push(this.$i18n.t('ERRORS.add-more-answers'));
      question.valid = false;
      commit('forms/questions/setQuestion', question, { root: true });
    }

    if (!answer.text || answer.text.trim().length < 1) {
      answer.errors.push(this.$i18n.t('ERRORS.minimum-length', { field: this.$i18n.t('CREATECAMPAIGN.answer'), minimum: 1 }));
    }
    answer.valid = answer.errors.length === 0;

    commit('setAnswer', { answerIndex, answer });
  },
  /**
   * Save all answer options
   * @param commit
   * @param getters
   * @return {Promise<void>}
   */
  async saveAnswerOptions({ commit, getters }) {
    commit('setState', ANSWER_OPTION_STATES.SAVING);
    const BreakException = {};
    try {
      const answers = getters.getAnswers;
      answers.forEach((a) => {
        if (!a.question_id) {
          throw BreakException;
        }
      });
      let failed = false;
      await Promise.all(
        answers.map(async (answer) => {
          const url = `/questions/${answer.question_id}/answer-options`;
          try {
            const response = await this.$axios.post(url, {
              text: answer.text,
              position: answer.position,
            });
            if (response.status === 200) {
              answer.id = response.data.answer_option_id;
              answer.persisted = true;
              commit('setAnswer', answer);
            } else {
              failed = true;
              answer.errors = this.$i18n.t('ERRORS.generic');
              commit('setAnswer', answer);
            }
          } catch (e) {
            if ('response' in e && 'errors' in e.response.data) {
              failed = true;
              const data = e.response.data;
              answer.errors = data.errors;
              commit('setAnswer', answer);
            }
          }
        })
      );
      if (failed) {
        throw BreakException;
      }
      commit('setState', ANSWER_OPTION_STATES.SAVED);
    } catch (e) {
      commit('setState', ANSWER_OPTION_STATES.ERROR);
    }
  },
};
