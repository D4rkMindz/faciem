import state from '@/store/forms/questions/state';
import getters from '@/store/forms/questions/getters';
import mutations from '@/store/forms/questions/mutations';
import actions from '@/store/forms/questions/actions';
import { MULTIPLE_CHOICE, STARS, TEXT, VALIDATION } from '@/domain/campaign/question';

export const TYPES_THAT_REQUIRE_QUESTION = [MULTIPLE_CHOICE, TEXT, VALIDATION];
export const TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS = [MULTIPLE_CHOICE, VALIDATION];
export const TYPES_THAT_REQUIRE_NO_QUESTION = [STARS];

export const QUESTIONS_FORM_STATES = {
  INITIAL: 'initial',
  EDITED: 'fetching',
  VALID: 'valid',
  INVALID: 'invalid',
  SAVING: 'saving',
  SAVED: 'saved',
  ERROR: 'error',
};

export default { state, getters, mutations, actions };
