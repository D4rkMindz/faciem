import { BALANCE_STATES } from '@/domain/profile/balance-states';

export default function () {
  return {
    state: BALANCE_STATES.INITIAL,
    balance: {},
  };
}
