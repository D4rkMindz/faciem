import { VIDEO_STATES } from '@/store/forms/media/video/index';

export default {
  /**
   * Set a state
   * @param state
   * @param newState
   */
  setState(state, newState) {
    state.state = newState;
  },
  /**
   * Reset the state
   * @param state
   */
  reset(state) {
    state.state = VIDEO_STATES.INITIAL;
  },
};
