export default {
  /**
   * Get the state
   * @param state
   * @return {string}
   */
  getState: state => state.state,
  /**
   * Get all questions
   * @param state
   * @return {any}
   */
  getQuestions: state => state.questions,
  /**
   * Get by id
   * @param state
   * @return {function(*): Question[]}
   */
  getById: state => id => state.questions.filter(question => question.id === id),
  /**
   * Get by locale
   * @param state
   * @return {function(*): Question[]}
   */
  getByLocale: state => locale => state.questions.filter(question => question.locale === locale),
  /**
   * Check if the form is valid
   * @param state
   * @return {boolean}
   */
  isValid: (state) => {
    let formValid = true;
    const BreakException = {};
    try {
      state.questions.forEach((q) => {
        if (!q.valid) {
          throw BreakException;
        }
      });
    } catch (e) {
      formValid = false;
    }

    return formValid;
  },
};
