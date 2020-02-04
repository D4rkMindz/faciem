import { QUESTIONS_STATE } from '@/store/watch/questions/index';
// import { Question } from '@/domain/campaign/question';

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
    state.state = QUESTIONS_STATE.INITIAL;
    state.questions = [];
  },
};
