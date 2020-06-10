import { QUESTIONS_FORM_STATES } from '@/store/forms/questions/index';
import { Question } from '@/domain/campaign/question';
import Vue from 'vue';

function getIndex(state, id) {
  let questionIndex = null;
  state.questions.forEach((value, index) => {
    if (value.id === id) {
      questionIndex = index;
    }
  });
  if (questionIndex === null) {
    throw new Error(this.$i18n.t('ERRORS.question-not-found'));
  }

  return questionIndex;
}

export default {
  setState(state, newState) {
    state.state = newState;
  },

  reset(state) {
    state.state = QUESTIONS_FORM_STATES.INITIAL;
    state.questions = [new Question()];
  },
  /**
   * Add a new question
   * @param state
   * @param locale
   */
  addQuestion(state, locale) {
    Vue.set(state.questions, state.questions.length, new Question());
  },
  /**
   * Set a question
   * @param state
   * @param question
   */
  setQuestion(state, question) {
    const questionIndex = getIndex(state, question.id);
    Vue.set(state.questions, questionIndex, question);
  },
  /**
   * Remove a question
   * @param state
   * @param index
   */
  removeQuestion(state, { id }) {
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
