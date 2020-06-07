import moment from 'moment';

export default {
  getState: state => state.state,
  getUsername: state => state.username,
  getName: (state) => {
    let name = state.first_name;
    if (state.middle_name) {
      name += ' ' + state.middle_name;
    }
    name += ' ' + state.last_name;
    return name;
  },
  getBirthDate: (state) => {
    if (state.birth_date_at) {
      return moment(state.birth_date_at);
    }

    return null;
  },
  getLastLoginAt: (state) => {
    if (state.last_login_at) {
      return moment(state.last_login_at);
    }

    return null;
  },
  getRegisteredAt: (state) => {
    if (state.birth_date_at) {
      return moment(state.birth_date_at);
    }

    return null;
  },
};
