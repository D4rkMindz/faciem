export default {
  /**
   * Get the name of the campaign
   * @param state
   * @return {*}
   */
  getName: state => state.name,
  /**
   * Get name errors
   * @param state
   * @return {[]}
   */
  getNameErrors: state => state.name_errors,
  /**
   * Get the description of the campaign
   * @param state
   * @return {*}
   */
  getDescription: state => state.description,
  /**
   * Get Description errors
   * @param state
   * @return {[]}
   */
  getDescriptionErrors: state => state.description_errors,
  /**
   * Get the state of the form
   * @param state
   * @return {*}
   */
  getState: state => state.state,
  /**
   * Check if the form is valid
   * @param state
   * @return {boolean}
   */
  isValid: (state) => {
    let formValid = true;
    const BreakException = {};
    try {
      if (state.name_errors.length > 0 || state.description_errors > 0) {
        throw BreakException;
      }
    } catch (e) {
      formValid = false;
    }

    return formValid;
  },
};
