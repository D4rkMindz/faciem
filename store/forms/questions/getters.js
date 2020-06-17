export default {
  /**
   * Get the state
   * @param state
   * @return {string}
   */
  getQuestionsState: state => state.state,
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
  findById: state => (id) => {
    let index = null;
    state.questions.forEach((value, i) => {
      if (value.id === id) {
        index = i;
      }
    });

    return state.questions[index];
  },
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
