import Vue from 'vue';
import { Question } from '@/domain/campaign/question';
import { Answer } from '@/domain/campaign/answer';
import { STATES } from '@/store/forms/campaign/create/index';

export default {
  /**
   * Set the pricing id
   * @param state
   * @param pricingId
   */
  setPricingId(state, pricingId) {
    state.pricing_id = pricingId;
  },
  /**
   * Set the campaign id
   * @param state
   * @param campaignId
   */
  setCampaignId(state, campaignId) {
    state.campaign_id = campaignId;
  },
  /**
   * Set language
   * @param state
   * @param language
   */
  setLanguage(state, language) {
    state.language = language;
  },
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
  /**
   * Set the state
   * @param state
   * @param s STATES[x]
   */
  setState(state, s) {
    state.state = s;
  },
  /**
   * Set errors
   * @param state
   * @param errors
   * @param message
   */
  setErrors(state, { errors, message }) {
    state.errors = errors;
    state.message = message;
  },
  /**
   * Reset
   * @param state
   */
  reset(state) {
    state.campaign_id = null;
    state.pricing_id = null;
    state.language = null;
    state.questions = [new Question()];
    state.state = STATES.UNTOUCHED;
    state.errors = [];
    state.message = null;
  },
};
