import { BALANCE_STATES } from '@/domain/profile/balance-states';

export default {
  setState(state, newState) {
    state.state = newState;
  },

  setBalance(state, { amount, currency }) {
    state.balance = { amount: amount, currency: currency };
  },

  reset(state) {
    state.state = BALANCE_STATES.INITIAL;
    state.balance = { amount: 0, currency: 'CHF' };
  },
};
