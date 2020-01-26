export default {
  state: state => state.state,
  /**
   * Get all questions
   * @param state
   * @return {any}
   */
  getQuestions: state => state.questions,
  /**
   * Check if the form is valid
   * @param state
   * @return {boolean|(function(*): *|boolean)}
   */
  isValid: (state) => {
    let formValid = true;
    const BreakException = {};
    try {
      state.questions.forEach((q) => {
        if (!q.valid) {
          throw BreakException;
        }
        q.answer.forEach((a) => {
          if (!a.valid) {
            throw BreakException;
          }
        });
      });
    } catch (e) {
      formValid = false;
    }
    return formValid;
  },
};
