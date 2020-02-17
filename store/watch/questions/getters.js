import cloneDeep from 'lodash.clonedeep';

export default {
  /**
   * Get the video
   * @param state
   * @return {Question[]}
   */
  getQuestions: state => cloneDeep(state.questions),
  /**
   * Get the campaigns answer state
   * @param state
   * @return {*}
   */
  getQuestionsState: state => state.state,
  /**
   * Check if the form is valid
   * @param state
   * @return {boolean}
   */
  isValid: (state) => {
    let formValid = true;
    const BreakException = {};
    try {
      if (state.questions.length <= 0) {
        throw BreakException;
      }
      state.questions.forEach((q) => {
        if (!q.valid) {
          throw BreakException;
        }
        q.answers.forEach((a) => {
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
