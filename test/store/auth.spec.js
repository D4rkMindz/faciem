import { mutations } from '@/store/auth';
import { AuthenticationState } from '@/domain/auth/authentication-state';

const { login, loggingIn, logout, error } = mutations;

describe('Auth store', () => {
  describe('actions', () => {
    it('should login', () => {
      // TODO
    });
  });

  describe('mutations', () => {
    let state = {
      authenticated: false,
      token: null,
      refreshToken: null,
      status: null,
      error: { message: null, language: null },
    };

    beforeEach(() => {
      state = {
        authenticated: false,
        token: null,
        refreshToken: null,
        status: null,
        error: { message: null, language: null },
      };
    });

    it('should logging in', () => {
      loggingIn(state);

      expect(state.authenticated).toBeFalsy();
      expect(state.error).toEqual({ message: null, language: null });
      expect(state.token).toBe(null);
      expect(state.refreshToken).toBeNull();
      expect(state.status).toBe(AuthenticationState.AUTHENTICATING);
    });

    it('should login', () => {
      const token = 'access_test';
      const refreshToken = 'refresh_test';
      login(state, token, refreshToken);

      expect(state.authenticated).toBeTruthy();
      expect(state.error).toEqual({ message: null, language: null });
      expect(state.token).toBe(token);
      expect(state.refreshToken).toBe(refreshToken);
      expect(state.status).toBe(AuthenticationState.AUTHENTICATED);
    });

    it('should logout', () => {
      logout(state);

      expect(state.authenticated).toBe(false);
      expect(state.error).toEqual({ message: null, language: null });
      expect(state.token).toBe(null);
      expect(state.refreshToken).toBe(null);
      expect(state.status).toBe(AuthenticationState.LOGGED_OUT);
    });

    it('should error', () => {
      const errorData = { message: 'error', language: 'en_GB' };
      error(state, errorData);

      expect(state.authenticated).toBe(false);
      expect(state.error).toEqual(errorData);
      expect(state.token).toBe(null);
      expect(state.refreshToken).toBe(null);
      expect(state.status).toBe(AuthenticationState.FAILED);
    });
  });
});
