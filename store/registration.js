import { RegistrationState } from '../domain/registration/registration-state';

export function state() {
  return {
    emailToken: null,
    status: RegistrationState.INITIAL,
    error: { message: null, language: null },
  };
}

export const getters = {
  // signup with the email
  isSigningUp: state => state.status === RegistrationState.SIGNING_UP,
  isSignedUp: state => state.status === RegistrationState.SIGNED_UP,
  // finish the registration with username, password ...
  isRegistering: state => state.status === RegistrationState.REGISTERING,
  isRegistered: state => state.status === RegistrationState.REGISTERED,
  emailToken: state => state.emailToken,
  hasError: state => state.status === RegistrationState.ERROR,
  getMostCurrentError: (state) => {
    // error might be empty so better check if is filled before accessing it
    let filtered = state.error && state.error.errors ? state.error.errors.filter(error => error.field === 'email') : null;
    if (!filtered) {
      filtered = [{
        field: null,
        message: null,
      }];
    }
    return filtered.shift().message;
  },
  status: state => state.status,
};

export const mutations = {
  SIGNING_UP(state) {
    state.emailToken = null;
    state.status = RegistrationState.SIGNING_UP;
    state.error = { errors: null, message: null, language: null };
  },
  SIGN_UP(state, emailToken) {
    state.emailToken = emailToken;
    state.status = RegistrationState.SIGNED_UP;
    state.error = { errors: null, message: null, language: null };
  },
  ERROR(state, error) {
    state.emailToken = null;
    state.status = RegistrationState.ERROR;
    state.error = error;
  },
  RESET(state) {
    state.emailToken = null;
    state.status = RegistrationState.INITIAL;
    state.error = { errors: null, message: null, language: null };
  },
};

export const actions = {
  /**
   * Log in a user
   * @param commit
   * @param username
   * @param password
   * @return {Promise<void>}
   */
  async signUp({ commit }, { email }) {
    try {
      commit('SIGNING_UP');
      const response = await this.$axios.post(
        '/users/register',
        { email: email },
      );

      if (response.status === 200) {
        const token = response.data.email_token;
        commit('SIGN_UP', token);
      }
    } catch (e) {
      commit('ERROR', e.response.data);
    }
  },
  /**
   * Reset the errors
   */
  reset({ commit }) {
    commit('RESET');
  },
};
