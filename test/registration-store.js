import { getters, mutations, state } from '../store/registration';

const testMutations = {
  ...mutations,
  SET(state, { key, value }) {
    state[key] = value;
  },
};

export default {
  modules: {
    registration: {
      namespaced: true,
      actions: {
        signUp: jest.fn(() => Promise.resolve(true)),
        reset: jest.fn(),
      },
      state: state,
      getters: getters,
      mutations: testMutations,
    },
  },
}
;
