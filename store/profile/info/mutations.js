import { INFO_STATES } from '@/domain/profile/info-states';

export default {
  setState(state, newState) {
    state.state = newState;
  },

  setInfo(state, { username, firstName, middleName, lastName, birthDate, registeredAt, lastLoginAt }) {
    state.username = username;
    state.first_name = firstName;
    state.middle_name = middleName;
    state.last_name = lastName;
    state.birth_date = birthDate;
    state.registered_at = registeredAt;
    state.last_login_at = lastLoginAt;
  },

  resetInfo(state) {
    state.username = null;
    state.first_name = '';
    state.middle_name = null;
    state.last_name = null;
    state.birth_date = null;
    state.registered_at = null;
    state.last_login_at = null;
  },

  reset(state) {
    state.state = INFO_STATES.INITIAL;
    this.resetInfo(state);
  },
};
