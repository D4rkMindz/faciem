import cloneDeep from 'lodash.clonedeep';
import {
  QUESTIONS_FORM_STATES,
  TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS,
  TYPES_THAT_REQUIRE_NO_ANSWER_OPTIONS,
  TYPES_THAT_REQUIRE_NO_QUESTION,
} from '@/store/forms/questions/index';

export default {
  /**
   * Validate a question
   * @param commit
   * @param state
   * @param id
   * @param questionIndex
   */
  validateQuestion({ commit, state, rootGetters }, id) {
    let questionIndex = null;
    state.questions.forEach((value, index) => {
      if (value.id === id) {
        questionIndex = index;
      }
    });
    if (questionIndex === null) {
      throw new Error(this.$i18n.t('ERRORS.question-not-found'));
    }
    const question = cloneDeep(state.questions[questionIndex]);

    question.errors = [];

    if (TYPES_THAT_REQUIRE_NO_QUESTION.includes(question.type)) {
      question.valid = true;
      question.text = null;
      commit('setQuestion', question);
      return;
    }

    const answerCount = rootGetters['forms/answer-options/getAnswersForQuestion'](question.id).length;
    if (TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS.includes(question.type) && answerCount <= 1) {
      question.errors.push(this.$i18n.t('ERRORS.add-more-answers'));
    }

    if (!question.text || question.text.trim().length < 3) {
      const message = this.$i18n.t('ERRORS.minimum-length', { field: this.$i18n.t('CREATECAMPAIGN.question'), minimum: 3 });
      if (!question.errors.includes(message)) {
        question.errors.push(message);
      }
    }

    question.valid = question.errors.length === 0;
    commit('setQuestion', question);
  },
  /**
   * Can a question be persisted
   * @param getters
   * @param rootGetters
   * @param dispatch
   * @param questionId
   * @return {boolean}
   */
  canQuestionBePersisted({ getters, rootGetters, dispatch }, questionId) {
    dispatch('validateQuestion', questionId);
    const question = getters.findById(questionId);
    if (!question || !question.valid) {
      return false;
    }

    const campaignId = rootGetters['forms/campaign/create/getCampaignId'];
    return !!campaignId;
  },
  /**
   * Save all questions
   * @param commit
   * @param getters
   * @param dispatch
   * @param rootGetters
   * @param campaignId
   * @return {Promise<void>}
   */
  async saveQuestions({ commit, getters, dispatch, rootGetters }, campaignId) {
    const BreakException = {};
    commit('setState', QUESTIONS_FORM_STATES.SAVING);
    try {
      const questions = getters.getQuestions;
      const positionCounterByLocale = {};
      let failed = false;
      await Promise.all(
        questions.map(async (question) => {
          if (question.persisted) {
            return;
          }
          if (!positionCounterByLocale[question.locale]) {
            positionCounterByLocale[question.locale] = 0;
          }
          positionCounterByLocale[question.locale]++;
          question.position = positionCounterByLocale[question.locale];
          commit('setQuestion', question);
          if (!question.campaignId) {
            question.campaignId = campaignId;
            commit('setQuestion', question);
          }

          if (!question.valid || !dispatch('canQuestionBePersisted', question.id)) {
            question.valid = false;
            question.errors.push(this.$i18n.t('ERRORS.generic'));
            commit('setQuestion', question);
            return;
          }

          const url = `/campaigns/${campaignId}/questions`;
          try {
            const response = await this.$axios.post(url, {
              text: question.text,
              position: question.position,
              locale: question.locale,
              type: question.type,
            });
            if (response.status === 200) {
              const answers = rootGetters['forms/answer-options/getAnswersForQuestion'](question.id);
              answers.forEach((a) => {
                commit('forms/answer-options/setAnswerValue', { id: a.id, property: 'questionId', value: response.data.question_id }, { root: true });
              });
              question.old_id = question.id;
              question.id = response.data.question_id;
              question.persisted = true;
              commit('setQuestion', question);
            } else {
              failed = true;
              question.errors = this.$i18n.t('ERRORS.generic');
              commit('setQuestion', question);
            }
          } catch (e) {
            if ('response' in e && 'errors' in e.response.data) {
              failed = true;
              const data = e.response.data;
              question.errors = data.errors;
              commit('setQuestion', question);
            }
          }
        })
      );
      if (failed) {
        throw BreakException;
      }
      commit('setState', QUESTIONS_FORM_STATES.SAVED);
    } catch (e) {
      commit('setState', QUESTIONS_FORM_STATES.ERROR);
    }
  },
  /**
   * Change a questions type
   * @param commit
   * @param rootGetters
   * @param id
   * @param type
   */
  changeQuestionType({ commit, rootGetters }, { id, type }) {
    if (TYPES_THAT_REQUIRE_NO_ANSWER_OPTIONS.includes(type)) {
      const answers = rootGetters['forms/answer-options/getAnswersForQuestion'](id);
      answers.forEach(a => commit('forms/answer-options/removeAnswer', a.id, { root: true }));
    }

    commit('setQuestionValue', { id: id, property: 'type', value: type });
  },
  /**
   * Remove a question and its answer options
   * @param commit
   * @param rootGetters
   * @param id
   */
  removeQuestionAndAssociatedAnswerOptions({ commit, rootGetters }, id) {
    const answers = rootGetters['forms/answer-options/getAnswersForQuestion'](id);
    answers.forEach(a => commit('forms/answer-options/removeAnswer', a.id, { root: true }));

    commit('removeQuestion', id);
  },
};
