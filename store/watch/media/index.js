import state from '@/store/watch/media/state';
import getters from '@/store/watch/media/getters';
import mutations from '@/store/watch/media/mutations';
import actions from '@/store/watch/media/actions';

export const WATCH_STATE = {
  INITIAL: 'initial',
  LOADING: 'loading',
  LOADED: 'loaded',
  ALL_WATCHED: 'all-watched',
  ERROR: 'error',
};

export default { state, getters, mutations, actions };
