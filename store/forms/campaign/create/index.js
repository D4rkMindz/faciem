import state from '@/store/forms/campaign/create/state';
import getters from '@/store/forms/campaign/create/getters';
import mutations from '@/store/forms/campaign/create/mutations';
import actions from '@/store/forms/campaign/create/actions';
import { MULTIPLE_CHOICE, STARS, TEXT } from '@/domain/campaign/question';

export const CAMPAIGN_CREATE_STATES = {
  UNTOUCHED: 'untouched',
  INVALID: 'invalid',
  VALID: 'valid',
  SAVING: 'saving',
  SAVED: 'saved',
};

export const TYPES_THAT_REQUIRE_QUESTION = [MULTIPLE_CHOICE, TEXT];
export const TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS = [MULTIPLE_CHOICE];
export const TYPES_THAT_REQUIRE_NO_QUESTION = [STARS];

export default { state, getters, mutations, actions };
