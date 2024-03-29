import { RegistrationState } from '@/domain/registration/registration-state';

export function state() {
  return {
    status: RegistrationState.INITIAL,
    error: { errors: [{ message: null, language: null }] },
    user: {
      username: '',
      firstname: '',
      middlename: '',
      lastname: '',
      birthdate: '',
      password: '',
    },
  };
}

export const getters = {
  // signup with the email
  isSigningUp: state => state.status === RegistrationState.SIGNING_UP,
  isSignedUp: state => state.status === RegistrationState.SIGNED_UP,
  // finish the registration with username, password ...
  isRegistering: state => state.status === RegistrationState.REGISTERING,
  isRegistered: state => state.status === RegistrationState.REGISTERED,
  getMostCurrentError: (state) => {
    // error might be empty so better check if is filled before accessing it
    let filtered = state.error && state.error.errors ? state.error.errors.filter(error => error.field === 'email') : null;
    if (!filtered) {
      filtered = [{
        field: null,
        message: null,
      }];
    }
    const recent = filtered.shift();
    return recent && recent.message ? recent.message : '';
  },
  hasErrors: state => state.status === RegistrationState.ERROR,
  getErrors: state => state.error,
  status: state => state.status,
  user: state => state.user,
};

export const mutations = {
  REGISTERING(state) {
    state.status = RegistrationState.REGISTERING;
    state.error = { errors: null, message: null, language: null };
  },
  REGISTERED(state) {
    state.status = RegistrationState.REGISTERED;
    state.error = { errors: null, message: null, language: null };
  },
  SIGNING_UP(state) {
    state.status = RegistrationState.SIGNING_UP;
    state.error = { errors: null, message: null, language: null };
  },
  SIGN_UP(state) {
    state.status = RegistrationState.SIGNED_UP;
    state.error = { errors: null, message: null, language: null };
  },
  ERROR(state, error) {
    state.status = RegistrationState.ERROR;
    state.error = { errors: error.errors, message: error.message, language: error.language };
  },
  RESET(state) {
    state.status = RegistrationState.INITIAL;
    state.error = { errors: null, message: null, language: null };
  },
  SAVE_PERSONAL_INFORMATION(state, { firstname, middlename, lastname, birthdate }) {
    state.user.firstname = firstname;
    state.user.middlename = middlename;
    state.user.lastname = lastname;
    state.user.birthdate = birthdate;
  },
  SAVE_USERNAME(state, { username }) {
    state.user.username = username;
  },
};

export const actions = {
  /**
   * Sign up a user
   * @param commit
   * @param username
   * @param password
   * @return {Promise<void>}
   */
  async signUp({ commit }, { email }) {
    try {
      commit('SIGNING_UP');
      const response = await this.$axios.post(
        '/users/register',
        { email: email, language: this.$i18n.locale },
      );

      if (response.status === 200) {
        commit('SIGN_UP');
      }
    } catch (e) {
      commit('ERROR', e.response.data);
    }
  },

  /**
   * Register a user on the server
   * @param commit
   * @param emailToken
   * @param firstName
   * @param middleName
   * @param lastName
   * @param birthDate
   * @param username
   * @param password
   * @return {Promise<void>}
   */
  async register({ commit }, { emailToken, firstName, middleName, lastName, birthDate, username, password }) {
    const setError = function (responseData) {
      const error = responseData;
      error.errors = [{ field: 'username', message: responseData.message }];
      commit('ERROR', error);
    };
    try {
      commit('REGISTERING');
      const response = await this.$axios.post(
        '/users',
        {
          email_token: emailToken,
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          birth_date: birthDate,
          username: username,
          password: password,
        },
      );

      if (response.status === 200) {
        commit('REGISTERED');
      } else if (response.status === 422) {
        commit('ERROR', response.data);
      } else {
        setError(response.data);
      }
    } catch (e) {
      if (e.response.status === 422) {
        commit('ERROR', e.response.data);
      } else {
        setError(e.response.data);
      }
    }
  },

  /**
   * Save personal information
   * @param commit
   * @param firstname
   * @param middlename
   * @param lastname
   * @param birthdate
   */
  savePersonalInformation({ commit }, { firstname, middlename, lastname, birthdate }) {
    commit('SAVE_PERSONAL_INFORMATION', {
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      birthdate: birthdate,
    });
  },

  /**
   * Save user credentials
   * @param commit
   * @param username
   * @param password
   */
  saveCredentials({ commit }, { username }) {
    commit('SAVE_USERNAME', { username: username });
  },

  /**
   * Reset the errors
   */
  reset({ commit }) {
    commit('RESET');
  },
};
