import Vue from 'vue';
import { Question } from '@/domain/campaign/question';
import { Answer } from '@/domain/campaign/answer';

export default {
  /**
   * Add a new question
   * @param state
   */
  addQuestion(state) {
    Vue.set(state.questions, state.questions.length, new Question());
  },
  /**
   * Remove a question
   * @param state
   * @param index
   */
  removeQuestion(state, { questionIndex }) {
    state.questions.splice(questionIndex, 1);
  },
  /**
   * Set a question
   * @param state
   * @param index
   * @param question
   */
  setQuestion(state, { questionIndex, question }) {
    Vue.set(state.questions, questionIndex, question);
  },
  /**
   * Add an answer
   * @param state
   * @param questionIndex
   */
  addAnswer(state, { questionIndex }) {
    state.questions[questionIndex].answer.push(new Answer());
  },
  /**
   * Remove an answer
   * @param state
   * @param questionIndex
   * @param answerIndex
   */
  removeAnswer(state, { questionIndex, answerIndex }) {
    state.questions[questionIndex].answer.splice(answerIndex, 1);
  },
};
