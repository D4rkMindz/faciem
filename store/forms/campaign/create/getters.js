export default {
  getState: state => state.state,
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
  /**
   * Get a error for a field
   * @param state
   */
  getErrorForField: state => (field) => {
    const errors = [];
    state.errors.forEach((error) => {
      if (error.field === field) {
        errors.push(error.message);
      }
    });

    return errors;
  },
};
