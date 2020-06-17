import cloneDeep from 'lodash.clonedeep';
import { TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS } from '@/store/forms/questions';
import { ANSWER_OPTION_STATES } from '@/store/forms/answer-options/index';

export default {
  /**
   * Validate an answer
   * @param commit
   * @param state
   * @param answerOptionId
   * @param questionIndex
   */
  validateAnswerOption({ commit, state, rootGetters, getters, dispatch }, answerOptionId) {
    let answerIndex = null;
    state.answers.forEach((answer, index) => {
      if (answer.id === answerOptionId) {
        answerIndex = index;
      }
    });
    if (answerIndex === null) {
      throw new Error(this.$i18n.t('ERRORS.answer-not-found'));
    }
    const answer = cloneDeep(state.answers[answerIndex]);

    // always validate the question too if the answers get validated
    dispatch('forms/questions/validateQuestion', answer.questionId, { root: true });

    answer.errors = [];
    const question = cloneDeep(rootGetters['forms/questions/findById'](answer.questionId));
    const answerCount = (getters.getAnswersForQuestion)(answer.questionId).length;

    if (TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS.includes(question.type) && answerCount <= 1) {
      const message = this.$i18n.t('ERRORS.add-more-answers');
      if (!question.errors.includes(message)) {
        question.errors.push(message);
      }
      question.valid = false;
      commit('forms/questions/setQuestion', question, { root: true });
    }

    if (!answer.text || answer.text.trim().length < 1) {
      answer.errors.push(this.$i18n.t('ERRORS.minimum-length', { field: this.$i18n.t('CREATECAMPAIGN.answer'), minimum: 1 }));
    }
    answer.valid = answer.errors.length === 0;

    commit('setAnswer', answer);
  },
  /**
   *
   * @param getters
   * @param rootGetters
   * @param dispatch
   * @param answerOptionId
   */
  canAnswerOptionBePersisted({ getters, rootGetters, dispatch }, answerOptionId) {
    dispatch('validateAnswerOption', answerOptionId);
    const answerOption = getters.findById(answerOptionId);
    if (!answerOption || !answerOption.valid) {
      return false;
    }
    return rootGetters['forms/questions/findById'](answerOption.questionId).persisted;
  },
  /**
   * Save all answer options
   * @param commit
   * @param getters
   * @param rootGetters
   * @param dispatch
   * @return {Promise<void>}
   */
  async saveAnswerOptions({ commit, getters, rootGetters, dispatch }) {
    commit('setState', ANSWER_OPTION_STATES.SAVING);
    const BreakException = {};
    try {
      const answers = getters.getAnswers;
      answers.forEach((a) => {
        if (!a.questionId) {
          throw BreakException;
        }
      });
      let failed = false;
      const positionCounterByQuestion = [];
      await Promise.all(
        answers.map(async (a) => {
          const answer = cloneDeep(a);
          if (answer.persisted) {
            return;
          }
          if (!positionCounterByQuestion[answer.questionId]) {
            positionCounterByQuestion[answer.questionId] = 0;
          }
          positionCounterByQuestion[answer.questionId]++;
          answer.position = positionCounterByQuestion[answer.questionId];
          commit('setAnswer', answer);

          if (!answer.valid || !dispatch('canAnswerOptionBePersisted', answer.id)) {
            answer.valid = false;
            answer.errors.push(this.$i18n.t('ERRORS.generic'));
            commit('setAnswer', answer);
            throw BreakException;
          }
          const url = `/questions/${answer.questionId}/answer-options`;
          try {
            const response = await this.$axios.post(url, {
              text: answer.text,
              position: answer.position,
            });
            if (response.status === 200) {
              answer.old_id = answer.id;
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
