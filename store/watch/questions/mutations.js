import { QUESTIONS_STATE } from '@/store/watch/questions/index';

export default {
  /**
   * Set the video
   * @param state
   * @param questions
   */
  setQuestions(state, questions) {
    state.questions = questions;
  },
  /**
   * Set the state
   * @param state
   * @param s
   */
  setState(state, s) {
    state.state = s;
  },
  /**
   * Reset the store
   * @param state
   */
  reset(state) {
    state.questions = [];
    state.state = QUESTIONS_STATE.INITIAL;
  },
};
