import { QUESTIONS_FORM_STATES } from '@/store/forms/questions/index';
import { Question } from '@/domain/campaign/question';
import cloneDeep from 'lodash.clonedeep';
import Vue from 'vue';

function getIndex(state, id) {
  let questionIndex = null;
  state.questions.forEach((value, index) => {
    if (value.id === id) {
      questionIndex = index;
    }
  });
  if (questionIndex === null) {
    throw new Error(global.$nuxt.$i18n.t('ERRORS.question-not-found'));
  }

  return questionIndex;
}

export default {
  setState(state, newState) {
    state.state = newState;
  },

  reset(state) {
    state.state = QUESTIONS_FORM_STATES.INITIAL;
    state.questions = [];
  },
  /**
   * Add a new question
   * @param state
   * @param locale
   */
  addQuestion(state, locale) {
    Vue.set(state.questions, state.questions.length, new Question({ locale: locale }));
  },
  /**
   * Set a question
   * @param state
   * @param question
   */
  setQuestion(state, question) {
    const q = cloneDeep(question);
    let id = q.id;
    if (q.old_id) {
      id = q.old_id;
      delete q.old_id;
    }
    const questionIndex = getIndex(state, id);
    Vue.set(state.questions, questionIndex, q);
  },
  /**
   * Remove a question
   * @param state
   * @param id
   */
  removeQuestion(state, id) {
    const questionIndex = getIndex(state, id);
    state.questions.splice(questionIndex, 1);
  },
  /**
   * Set a question value
   * @param state
   * @param locale
   * @param property
   * @param value
   */
  setQuestionValue(state, { id, property, value }) {
    const questionIndex = getIndex(state, id);
    state.questions[questionIndex][property] = value;
  },
};
