<template>
  <div class="container mx-auto emailtoken flex flex-wrap">
    <div class="block lg:inline-block w-3/4 p-6 lg:w-3/12 mx-auto lg:mr-auto">
      <img :alt="$t('REGISTRATION.thanks')"
           src="/img/almost-done.svg" />
    </div>

    <div class="block lg:inline-block bg-white shadow w-11/12 lg:w-8/12 mx-auto p-6 mx-auto lg:ml-auto registration-card">
      <h1 class="text-center lg:text-left title">
        {{ $t('REGISTRATION.title') }}
      </h1>
      <p class="text">
        {{ $t('REGISTRATION.text') }}
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
                       @touched="touched.firstname = $event"
                       :placeholder="$t('DEFAULTS.required')"
                       :label="$t('REGISTRATION.first-name')" />

              <v-input id="middle-name"
                       v-model="middlename"
                       :errors="errors.middlename"
                       @validate="validateMiddlename"
                       @touched="touched.middlename = $event"
                       :placeholder="$t('DEFAULTS.optional')"
                       :label="$t('REGISTRATION.middle-name')" />

              <v-input id="last-name"
                       v-model="lastname"
                       :errors="errors.lastname"
                       @validate="validateLastname"
                       @touched="touched.lastname = $event"
                       :placeholder="$t('DEFAULTS.required')"
                       :label="$t('REGISTRATION.last-name')" />

              <v-input id="birth-date"
                       v-model="birthdate"
                       :placeholder="minimumAge"
                       :errors="errors.birthdate"
                       @validate="validateBirthdate"
                       @touched="touched.birthdate = $event"
                       :label="$t('REGISTRATION.birthdate')" />
            </div>

            <div class="flex flex-wrap">
              <button @click="save"
                      :disabled="!firstStepValid"
                      :class="{'disabled': !firstStepValid, 'loading': saving}"
                      class="button w-full lg:w-auto lg:ml-auto">
                {{ $t('FORM.save') }}
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
                       @touched="touched.username = $event"
                       :label="$t('DEFAULTS.username')" />

              <v-input id="password"
                       v-model="password"
                       :errors="errors.password"
                       @validate="validatePassword"
                       @touched="touched.password = $event"
                       :label="$t('DEFAULTS.password')"
                       type="password" />
            </div>

            <div class="flex flex-wrap flex-col-reverse lg:flex-row">
              <button @click="back"
                      class="button outline w-full lg:w-auto mr-auto mt-6 lg:mt-0">
                {{ $t('REGISTRATION.back') }}
              </button>

              <button @click="finish"
                      class="button w-full lg:w-auto">
                {{ $t('REGISTRATION.finish') }}
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
      saving: false,
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
      touched: {
        firstname: false,
        middlename: false,
        lastname: false,
        birthdate: false,
        username: false,
        password: false,
      },
    };
  },
  computed: {
    minimumAge() {
      return moment().subtract(18, 'years').format('DD.MM.YYYY');
    },
    firstStepValid() {
      return this.isValid(['firstname', 'middlename', 'lastname', 'birthdate']);
    },
    secondStepValid() {
      return this.isValid(['firstname', 'middlename', 'lastname', 'birthdate', 'username', 'password']);
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
      if (!this.secondStepValid) {
        return;
      }
      this.saving = true;
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

      this.saving = false;
      if (this.isRegistered()) {
        this.$toast.info(this.$t('REGISTRATION.success-message'));
        await this.$router.replace('/login');
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
      if (!this.firstStepValid) {
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
        if (!this.touched[field]) {
          return;
        }
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
        errors.push(this.$t('ERRORS.minimum-length', { field: field, minimum: minimum })); // {field} is not long enough. Minimum {minimum} letters
      }

      if (name.length > maximum) {
        errors.push(this.$t('ERRORS.maximum-length', { field: field, maximum: maximum })); // {field} exceeds the maximum length. Please keep it shorter than {maximum} characters
      }

      return errors;
    },
    validateFirstname() {
      this.errors.firstname = this.validateLength(this.firstname, this.$t('REGISTRATION.first-name'));
    },
    validateMiddlename() {
      if (this.middlename.length <= 0) {
        return;
      }
      this.errors.middlename = this.validateLength(this.middlename, this.$t('REGISTRATION.middle-name'));
    },
    validateLastname() {
      this.errors.lastname = this.validateLength(this.lastname, this.$t('REGISTRATION.last-name'));
    },
    validateBirthdate() {
      const birthdate = moment(this.birthdate, 'DD.MM.YYYY', true);
      const errors = [];
      if (!birthdate.isValid()) {
        errors.push(this.$t('ERRORS.date-format'));
      }

      if (birthdate.diff(moment().subtract(18, 'years')) > 0) {
        errors.push(this.$t('ERRORS.minimum-age'));
      }

      this.errors.birthdate = errors;
    },
    validateUsername() {
      // https://stackoverflow.com/a/12019115/6805097
      const regex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/;
      const errors = this.validateLength(this.username, this.$t('DEFAULTS.username'), 3, 30);
      if (!this.username.match(regex)) {
        errors.push(this.$t('ERRORS.username'));
      }

      this.errors.username = errors;
    },
    validatePassword() {
      // https://stackoverflow.com/a/21456918/6805097
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]$/;
      const errors = this.validateLength(this.password, this.$t('DEFAULTS.password'), 6);

      if (!this.password.match(regex)) {
        errors.push(this.$t('ERRORS.password'));
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
