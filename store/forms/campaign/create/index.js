import state from '@/store/forms/campaign/create/state';
import getters from '@/store/forms/campaign/create/getters';
import mutations from '@/store/forms/campaign/create/mutations';
import actions from '@/store/forms/campaign/create/actions';

export const CAMPAIGN_CREATE_STATES = {
  UNTOUCHED: 'untouched',
  INVALID: 'invalid',
  VALID: 'valid',
  SAVING: 'saving',
  SAVED: 'saved',
};

export default { state, getters, mutations, actions };
