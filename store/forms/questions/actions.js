import cloneDeep from 'lodash.clonedeep';
import {
  QUESTIONS_FORM_STATES,
  TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS,
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
  validateQuestion({ commit, state, rootGetters }, { id }) {
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
   * Save all questions
   * @param commit
   * @param getters
   * @return {Promise<void>}
   */
  async saveQuestions({ commit, getters }) {
    const BreakException = {};
    commit('setState', QUESTIONS_FORM_STATES.SAVING);
    try {
      const questions = getters.getQuestions;
      questions.forEach((a) => {
        if (!a.question_id) {
          throw BreakException;
        }
      });
      let failed = false;
      await Promise.all(
        questions.map(async (question) => {
          const url = `/campaigns/${question.campaign_id}/questions`;
          try {
            const response = await this.$axios.post(url, {
              text: question.text,
              locale: question.locale,
              type: question.type,
            });
            if (response.status === 200) {
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
};
