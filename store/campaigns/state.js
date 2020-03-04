import { CAMPAIGNS_STATE } from '@/store/campaigns/index';

export default function () {
  return {
    campaigns: [],
    state: CAMPAIGNS_STATE.INITIAL,
  };
}
