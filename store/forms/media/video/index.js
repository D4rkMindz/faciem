import state from '@/store/forms/media/video/state';
import getters from '@/store/forms/media/video/getters';
import mutations from '@/store/forms/media/video/mutations';
import actions from '@/store/forms/media/video/actions';

export const VIDEO_STATES = {
  INITIAL: 'initial',
  EDITED: 'edited',
  VALID: 'valid',
  INVALID: 'invalid',
  SAVING: 'saving',
  SAVED: 'saved',
  ERROR: 'error',
};

export default { state, getters, mutations, actions };
