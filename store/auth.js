import decode from 'jwt-decode';
import { AuthenticationState } from '@/domain/auth/authentication-state';

export function state() {
  return {
    authenticated: false,
    token: { original: null, decoded: null },
    refreshToken: null,
    status: null,
    error: { message: null, language: null },
  };
}

export const getters = {
  isAuthenticated: state => state.authenticated,
  hasToken: state => !!state.token.original,
  getToken: state => state.token.original,
  hasRoleAbove: state => (level) => {
    const token = state.token.decoded && 'data' in state.token.decoded ? state.token.decoded.data : null;
    return (token && token.role && token.role.level >= level);
  },
  hasRefreshToken: state => !!state.refreshToken,
  refreshToken: state => state.refreshToken,
  hasError: state => state.status === AuthenticationState.FAILED,
  errorMessage: state => state.error.message,
  errorLanguage: state => state.error.language,
  status: state => state.status,
  isAuthenticating: state => state.status === AuthenticationState.AUTHENTICATING,
};

export const mutations = {
  login(state, token, refreshToken) {
    state.status = AuthenticationState.AUTHENTICATED;
    state.authenticated = true;
    state.token.original = token;
    state.token.decoded = decode(token);
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
    state.token = { original: null, decoded: null };
    state.error = { message: null, language: null };
  },
  error(state, error) {
    state.status = AuthenticationState.FAILED;
    state.authenticated = false;
    state.token = { original: null, decoded: null };
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
      } else {
        commit('error', { error: 'Something went wrong', language: 'en' });
      }
    } catch (e) {
      if ('response' in e && 'data' in e.response) {
        commit('error', e.response.data);
      }
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
