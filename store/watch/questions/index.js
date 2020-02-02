import state from '@/store/watch/questions/state';
import getters from '@/store/watch/questions/getters';
import mutations from '@/store/watch/questions/mutations';
import actions from '@/store/watch/questions/actions';

export const QUESTIONS_STATE = {
  INITIAL: 'initial',
  LOADING: 'loading',
  LOADED: 'loaded',
  ANSWERING: 'answering',
  SAVING: 'saving',
  SAVED: 'saved',
  ERROR: 'error',
};

export default { state, getters, mutations, actions };
