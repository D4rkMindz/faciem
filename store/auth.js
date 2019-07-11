import { AuthenticationState } from '@/domain/auth/authentication-state';

export function state() {
  return {
    authenticated: false,
    token: null,
    refreshToken: null,
    status: null,
    error: { message: null, language: null },
  };
}

export const getters = {
  isAuthenticated: state => state.authenticated,
  hasToken: state => !!state.token,
  token: state => state.token,
  hasRefreshToken: state => !!state.refreshToken,
  refreshToken: state => state.refreshToken,
  hasError: state => state.status === AuthenticationState.FAILED,
  errorMessage: state => state.error.message,
  errorLanguage: state => state.error.language,
  status: state => state.status,
};

export const mutations = {
  login(state, token, refreshToken) {
    state.status = AuthenticationState.AUTHENTICATED;
    state.authenticated = true;
    state.token = token;
    state.refreshToken = refreshToken;
    state.error = { message: null, language: null };
  },
  loggingIn(state) {
    state.status = AuthenticationState.AUTHENTICATING;
    state.error = { message: null, language: null };
  },
  logout(state) {
    state.status = AuthenticationState.LOGGED_OUT;
    state.authenticated = false;
    state.token = null;
    state.error = { message: null, language: null };
  },
  error(state, error) {
    state.status = AuthenticationState.FAILED;
    state.authenticated = false;
    state.token = null;
    state.error = { message: error.message, language: error.language };
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
  async login({ commit }, { username, password }) {
    try {
      commit('loggingIn');
      const response = await this.$axios.post(
        '/auth/login',
        { username: username, password: password },
      );

      if (response.status === 200) {
        const token = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        commit('login', token, refreshToken);
      }
    } catch (e) {
      commit('error', e.response.data);
    }
  },

  /**
   * Logout
   * @param commit
   */
  logout({ commit }) {
    commit('logout');
  },
};
