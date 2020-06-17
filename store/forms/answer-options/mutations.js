import { Answer } from '@/domain/campaign/answer';
import Vue from 'vue';
import cloneDeep from 'lodash.clonedeep';
import { ANSWER_OPTION_STATES } from '@/store/forms/answer-options/index';

function getIndex(state, id) {
  let answerIndex = null;
  state.answers.forEach((value, index) => {
    if (value.id === id) {
      answerIndex = index;
    }
  });
  if (answerIndex === null) {
    throw new Error(global.$nuxt.$i18n.t('ERRORS.answer-not-found'));
  }

  return answerIndex;
}

export default {
  /**
   * Set a state
   * @param state
   * @param newState
   */
  setState(state, newState) {
    state.state = newState;
  },
  /**
   * Reset the state
   * @param state
   */
  reset(state) {
    state.state = ANSWER_OPTION_STATES.INITIAL;
    state.answers = [];
  },
  /**
   * Add a new answer
   * @param state
   * @param questionId
   * @param locale
   */
  addAnswer(state, { questionId, locale }) {
    Vue.set(state.answers, state.answers.length, new Answer({ questionId: questionId, locale: locale }));
  },
  /**
   * Set a answer
   * @param state
   * @param answer
   */
  setAnswer(state, answer) {
    const a = cloneDeep(answer);
    let id = a.id;
    if (a.old_id) {
      id = a.old_id;
      delete a.old_id;
    }
    const answerIndex = getIndex(state, id);
    Vue.set(state.answers, answerIndex, a);
  },
  /**
   * Remove a answer
   * @param state
   * @param id
   */
  removeAnswer(state, id) {
    const answerIndex = getIndex(state, id);
    state.answers.splice(answerIndex, 1);
  },
  /**
   * Set a answer value
   * @param state
   * @param locale
   * @param property
   * @param value
   */
  setAnswerValue(state, { id, property, value }) {
    const answerIndex = getIndex(state, id);
    state.answers[answerIndex][property] = value;
  },
};
