import { INFO_STATES } from '@/domain/profile/info-states';

export default function () {
  return {
    state: INFO_STATES.INITIAL,
    username: null,
    first_name: '',
    middle_name: null,
    last_name: null,
    birth_date: null,
    registered_at: null,
    last_login_at: null,
  };
}
