import { CAMPAIGN_ROLES } from '@/domain/auth/authorization/customer/campaign-roles';

export default function ({ store, redirect }) {
  if ((store.getters['auth/hasRole'](CAMPAIGN_ROLES.CREATE)) !== true) {
    return redirect(store.localeRoute('/'));
  }
};
