export default {
  setState(state, newState) {
    state.state = newState;
  },

  setLocale(state, { locale }) {
    state.locale = locale;
  },
};
