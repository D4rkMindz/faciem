<template>
  <div class="container mx-auto emailtoken flex flex-wrap">
    <div class="block lg:inline-block w-3/4 p-6 lg:w-3/12 mx-auto lg:mr-auto">
      <img src="/img/almost-done.svg"
           alt="Thank you for signing up at venovum. Please finish your registration, you're almost done" />
    </div>

    <div class="block lg:inline-block bg-white shadow w-11/12 lg:w-8/12 mx-auto p-6 mx-auto lg:ml-auto registration-card">
      <h1 class="text-center lg:text-left title">
        Almost done
      </h1>
      <p class="text">
        Please fill out the missing fields to complete your registration
      </p>

      <div class="registration">
        <transition :duration="500"
                    name="fade"
                    mode="out-in">
          <div key="step-1"
               v-if="step === 1"
               class="step">
            <div class="form">
              <v-input id="first-name"
                       v-model="firstname"
                       :errors="errors.firstname"
                       @validate="validateFirstname"
                       placeholder="Required"
                       label="First name" />

              <v-input id="middle-name"
                       v-model="middlename"
                       :errors="errors.middlename"
                       @validate="validateMiddlename"
                       placeholder="Optional"
                       label="Middle name" />

              <v-input id="last-name"
                       v-model="lastname"
                       :errors="errors.lastname"
                       @validate="validateLastname"
                       placeholder="Required"
                       label="Last name" />

              <v-input id="birth-date"
                       v-model="birthdate"
                       :placeholder="minimumAge"
                       :errors="errors.birthdate"
                       @validate="validateBirthdate"
                       label="Birthdate" />
            </div>

            <div class="flex flex-wrap">
              <button @click="save"
                      class="button w-full lg:w-auto lg:ml-auto loading">
                Save
              </button>
            </div>
          </div>

          <div key="step-2"
               v-else-if="step === 2"
               class="step">
            <div class="form">
              <v-input id="username"
                       v-model="username"
                       :errors="errors.username"
                       @validate="validateUsername"
                       label="Username" />

              <v-input id="password"
                       v-model="password"
                       :errors="errors.password"
                       @validate="validatePassword"
                       type="password"
                       label="Password" />
            </div>

            <div class="flex flex-wrap flex-col-reverse lg:flex-row">
              <button @click="back"
                      class="button outline w-full lg:w-auto mr-auto mt-6 lg:mt-0">
                Back
              </button>

              <button @click="finish"
                      class="button w-full lg:w-auto">
                Finish
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import moment from 'moment';

const { mapActions, mapGetters } = createNamespacedHelpers('registration');
export default {
  name: 'EmailTokenPage',
  data() {
    return {
      step: 1,
      emailtoken: null,
      firstname: '',
      middlename: '',
      lastname: '',
      birthdate: '',
      username: '',
      password: '',
      errors: {
        firstname: [],
        middlename: [],
        lastname: [],
        birthdate: [],
        username: [],
        password: [],
      },
    };
  },
  computed: {
    minimumAge: function () {
      return moment().subtract(18, 'years').format('DD.MM.YYYY');
    },
  },
  created() {
    this.populate();
    this.emailtoken = this.$router.currentRoute.params.emailtoken;
  },
  methods: {
    ...mapActions([
      'register',
      'savePersonalInformation',
      'saveCredentials',
    ]),
    ...mapGetters([
      'isRegistering',
      'isRegistered',
      'getErrors',
      'hasErrors',
      'user',
    ]),
    async finish() {
      // validate all fields from the first page again
      const fields = ['firstname', 'middlename', 'lastname', 'birthdate', 'username', 'password'];

      if (!this.isValid(fields)) {
        return;
      }

      this.saveCredentials({ username: this.username });
      this.populate();
      await this.register({
        emailToken: this.emailtoken,
        firstName: this.firstname,
        middleName: this.middlename,
        lastName: this.lastname,
        username: this.username,
        password: this.password,
        // PHP 'c' format
        birthDate: moment(this.birthdate).format('YYYY-MM-DD[T]HH:mm:ssZ'),
      });

      if (this.isRegistered()) {
        this.$router.push('/login');
        return;
      }

      if (this.hasErrors()) {
        const errors = {
          firstname: [],
          middlename: [],
          lastname: [],
          birthdate: [],
          username: [],
          password: [],
        };
        this.getErrors().errors.forEach(error => errors[error.field].push(error.message));

        this.errors = errors;
      }
    },
    save() {
      // validate all fields from the first page again
      const fields = ['firstname', 'middlename', 'lastname', 'birthdate'];

      if (!this.isValid(fields)) {
        return;
      }

      this.savePersonalInformation({
        firstname: this.firstname,
        middlename: this.middlename,
        lastname: this.lastname,
        birthdate: this.birthdate,
      });

      this.populate();
      this.step = 2;
    },
    back() {
      this.populate();
      this.step--;
    },
    populate() {
      const user = this.user();
      this.firstname = user.firstname;
      this.middlename = user.middlename;
      this.lastname = user.lastname;
      this.birthdate = user.birthdate;
      this.username = user.username;
      // dont save the password
    },
    isValid(fields) {
      fields.forEach((field) => {
        const validator = 'validate' + field.charAt(0).toUpperCase() + field.slice(1);

        this[validator]();
      });

      return !this.checkForErrors(fields);
    },
    validateLength(name, field, minimum, maximum) {
      minimum = minimum || 2;
      maximum = maximum || 255;
      const errors = [];
      if (name.length < minimum) {
        errors.push(`${field} is not long enough. Minimum ${minimum} letters`);
      }

      if (name.length > maximum) {
        errors.push(`${field} exceeds the maximum length. Please keep it shorter than ${maximum} characters`);
      }

      return errors;
    },
    validateFirstname() {
      this.errors.firstname = this.validateLength(this.firstname, 'First name');
    },
    validateMiddlename() {
      if (this.middlename.length <= 0) {
        return;
      }
      this.errors.middlename = this.validateLength(this.middlename, 'Middle name');
    },
    validateLastname() {
      this.errors.lastname = this.validateLength(this.lastname, 'Last name');
    },
    validateBirthdate() {
      const birthdate = moment(this.birthdate, 'DD.MM.YYYY', true);
      const errors = [];
      if (!birthdate.isValid()) {
        errors.push('The date must match dd.mm.yyyy format');
      }

      if (birthdate.diff(moment().subtract(18, 'years')) > 0) {
        errors.push('You need to be at least 18 years old to use venovum');
      }

      this.errors.birthdate = errors;
    },
    validateUsername() {
      // https://stackoverflow.com/a/12019115/6805097
      const regex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/;
      const errors = this.validateLength(this.username, 'Username', 3, 30);
      if (!this.username.match(regex)) {
        errors.push('Your username can only contain alphanumeric letters, ".", "-" and "_" and cannot end with ".", "-" and "_"');
      }

      this.errors.username = errors;
    },
    validatePassword() {
      // https://stackoverflow.com/a/21456918/6805097
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]$/;
      const errors = this.validateLength(this.password, 'Password', 6);

      if (!this.password.match(regex)) {
        errors.push('Your password must contain at least one uppercase, one lowercase and a special character');
      }

      this.errors.password = [];
    },
    checkForErrors(fields) {
      let hasError = false;
      const errors = this.errors;

      if (!fields) {
        fields = Object.keys(this.errors);
      }

      fields.forEach((field) => {
        if (errors[field].length !== 0) {
          hasError = true;
        }
      });
      return hasError;
    },
  },
};
</script>

<style scoped>
  .fade-enter-active, .fade-blur-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-blur-to, .fade-blur-active {
    opacity: 0;
  }

  .registration-card {
    min-height: 50vh;
    display: flex;
    flex-direction: column;
  }

  .registration {
    height: 100%;
  }

  .step {
    height: auto;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
