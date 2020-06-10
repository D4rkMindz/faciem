export default {
  /**
   * Get the state
   * @param state
   * @return {string}
   */
  getState: state => state.state,
  /**
   * Get all answers
   * @param state
   * @return {any}
   */
  getAnswers: state => state.answers,
  /**
   * Get the answers for a question
   * @param state
   * @return {function(*): Answer[]}
   */
  getAnswersForQuestion: state => id => state.answers.filter(a => a.questionId === id),
  /**
   * Check if the form is valid
   * @param state
   * @return {boolean}
   */
  isValid: (state) => {
    let formValid = true;
    const BreakException = {};
    try {
      state.answers.forEach((answer) => {
        if (!answer.valid) {
          throw BreakException;
        }
      });
    } catch (e) {
      formValid = false;
    }

    return formValid;
  },
};
