import { getters, mutations, state } from '../store/auth';

const testMutations = {
  ...mutations,
  SET(state, { key, value }) {
    state[key] = value;
  },
};
export default {
  modules: {
    auth: {
      namespaced: true,
      actions: {
        login: jest.fn(() => Promise.resolve()),
        loggingIn: jest.fn(),
        logout: jest.fn(),
        error: jest.fn(),
      },
      state: state,
      getters: getters,
      mutations: testMutations,
    },
  },
}
;
