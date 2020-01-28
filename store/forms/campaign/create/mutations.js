import Vue from 'vue';
import { Question } from '@/domain/campaign/question';
import { Answer } from '@/domain/campaign/answer';
import { STATES } from '@/store/forms/campaign/create/index';

export default {
  /**
   * Set Name
   * @param state
   * @param name
   */
  setName(state, name) {
    state.name = name;
  },
  /**
   * Set Name Errors
   * @param state
   * @param errors
   */
  setNameErrors(state, errors) {
    state.name_errors = errors;
  },
  /**
   * Set Description
   * @param state
   * @param description
   */
  setDescription(state, description) {
    state.description = description;
  },
  /**
   * Set Description Errros
   * @param state
   * @param errors
   */
  setDescriptionErrors(state, errors) {
    state.description_errors = errors;
  },
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
   * Set a question value
   * @param state
   * @param questionIndex
   * @param property
   * @param value
   */
  setQuestionValue(state, { questionIndex, property, value }) {
    state.questions[questionIndex][property] = value;
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
   * Set an answer value
   * @param state
   * @param questionIndex
   * @param answerIndex
   * @param property
   * @param value
   */
  setAnswerValue(state, { questionIndex, answerIndex, property, value }) {
    state.questions[questionIndex].answer[answerIndex][property] = value;
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
    const getErrors = (field) => {
      const e = [];
      errors.forEach((err) => {
        if (err.field === field) {
          e.push(err.message);
        }
      });

      return e;
    };
    state.errors = errors;
    state.message = message;
    state.name_errors = getErrors('name');
    state.description_errors = getErrors('description');
    state.questions.forEach((question, i) => {
      question.errors = [];
      question.errors.push(...getErrors(question.id + '.value'));
      question.errors.push(...getErrors(question.id + '.type'));
      question.errors.push(...getErrors(question.id + '.language'));

      question.answer.forEach((answer, key) => {
        answer.errors = [];
        answer.errors.push(...getErrors(question.id + '.answer.' + key));
      });
    });
  },
  /**
   * Reset
   * @param state
   */
  reset(state) {
    state.name = '';
    state.name_errors = [];
    state.description = '';
    state.description_errors = [];
    state.campaign_id = null;
    state.pricing_id = null;
    state.language = null;
    state.questions = [new Question()];
    state.state = STATES.UNTOUCHED;
    state.errors = [];
    state.message = null;
  },
};
