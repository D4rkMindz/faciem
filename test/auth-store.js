import { AuthenticationState } from '../domain/auth/authentication-state';

export default {
  modules: {
    'auth': {
      namespaced: true,
      actions: {
        login: jest.fn(() => Promise.resolve(true)),
        loggingIn: jest.fn(),
        logout: jest.fn(),
        error: jest.fn(),
      },
      state() {
        return {
          authenticated: false,
          token: null,
          refreshToken: null,
          status: null,
          error: { message: null, language: null },
        };
      },
      getters: {
        isAuthenticated: state => state.authenticated,
        hasToken: state => !!state.token,
        token: state => state.token,
        hasRefreshToken: state => !!state.refreshToken,
        refreshToken: state => state.refreshToken,
        hasError: state => state.status === AuthenticationState.FAILED,
        errorMessage: state => state.error.message,
        errorLanguage: state => state.error.language,
        status: state => state.status,
      },
      mutations: {
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
      },
    },
  },
}
;
