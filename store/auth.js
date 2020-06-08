import decode from 'jwt-decode';
import { AuthenticationState } from '@/domain/auth/authentication-state';
import { LOCALES } from '@/domain/profile/locale';

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
  hasRole: state => (role) => {
    const token = state.token.decoded && 'data' in state.token.decoded ? state.token.decoded.data : null;
    return (token && token.roles.includes(role));
  },
  getUserId: (state) => {
    if (state.token.decoded && 'data' in state.token.decoded && 'user_id' in state.token.decoded.data) {
      return state.token.decoded.data.user_id;
    }
    return null;
  },
  getLocale: (state) => {
    if (state.token.decoded && 'data' in state.token.decoded && 'locale' in state.token.decoded.data) {
      return state.token.decoded.data.locale.substring(0, 2);
    }
    return LOCALES.DEFAULT;
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
  login(state, { token, refreshToken }) {
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
  refreshing(state) {
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
    // TODO remove language from error
    state.error = { message: error.message, language: error.language };
  },
};

export const actions = {
  /**
   * Log in a user
   * @param commit
   * @param getters
   * @param dispatch
   * @param username
   * @param password
   * @return {Promise<void>}
   */
  async login({ commit, getters, dispatch }, { username, password }) {
    try {
      commit('loggingIn');
      const response = await this.$axios.post(
        '/auth/login',
        { username: username, password: password },
      );

      if (response.status === 200) {
        const token = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        commit('login', { token: token, refreshToken: refreshToken });
        const currentLocale = this.$i18n.locale;
        const newLocale = getters.getLocale;
        if (currentLocale !== newLocale) {
          this.$i18n.setLocale(newLocale);
          this.$toast.info(this.$i18n.t('AUTH.changed-locale'));
        }
      } else {
        // todo think about the language param here
        commit('error', { error: this.$i18n.t('ERRORS.generic'), language: LOCALES.DEFAULT });
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

  /**
   * Refresh a token
   * @param commit
   * @param userId
   * @param refreshToken
   * @return {Promise<void>}
   */
  async refresh({ commit }, { userId, refreshToken }) {
    try {
      commit('refreshing');
      const response = await this.$axios.post(
        '/auth/refresh',
        { refresh_token: refreshToken, user_id: userId },
      );
      if (response.status === 200) {
        const token = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        commit('login', { token: token, refreshToken: refreshToken });
      } else {
        commit('error', { error: this.$i18n.t('ERRORS.generic'), language: LOCALES.EN });
      }
    } catch (e) {
      if ('response' in e && 'data' in e.response) {
        commit('error', e.response.data);
      }
    }
  },
};
