import state from '@/store/campaigns/state';
import getters from '@/store/campaigns/getters';
import mutations from '@/store/campaigns/mutations';
import actions from '@/store/campaigns/actions';

export const CAMPAIGNS_STATE = {
  INITIAL: 'initial',
  UP_TO_DATE: 'up-to-date',
  UPDATING: 'updating',
  ERROR: 'error',
};

export default { state, getters, mutations, actions };
