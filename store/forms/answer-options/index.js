import state from '@/store/forms/answer-options/state';
import getters from '@/store/forms/answer-options/getters';
import mutations from '@/store/forms/answer-options/mutations';
import actions from '@/store/forms/answer-options/actions';

export const ANSWER_OPTION_STATES = {
  INITIAL: 'initial',
  EDITED: 'edited',
  VALID: 'valid',
  INVALID: 'invalid',
  SAVING: 'saving',
  SAVED: 'saved',
  ERROR: 'error',
};

export default { state, getters, mutations, actions };
