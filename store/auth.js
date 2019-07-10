export function state() {
  return {
    authenticated: false,
  };
}

export const getters = {
  isAuthenticated: state => state.authenticated,
};

export const mutations = {
  login(state) {
    state.authenticated = true;
  },

  logout(state) {
    state.authenticated = false;
  },
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    // if auth token used by external API, fetch here e.g. req.session.authToken
    // then it can be accessed with store on all API calls
    if (req.session && req.session.authUser) {
      commit('login');
    } else {
      commit('logout');
    }
  },
  login({ commit }, { username, password }) {
    commit('login');
  },

  logout({ commit }) {
    commit('logout');
  },

};
