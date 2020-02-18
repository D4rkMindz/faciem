import { WATCH_STATE } from '@/store/watch/media/index';

export default {
  /**
   * Set the video
   * @param state
   * @param media
   */
  setMedia(state, media) {
    state.media = media;
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
    state.media = null;
    state.state = WATCH_STATE.INITIAL;
  },
};
