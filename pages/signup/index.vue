<template>
  <div class="container mx-auto signup">
    <div class="w-full lg:w-1/3 p-6 lg:float-right flex items-center lg:mt-20 lg:mr-32">
      <img :alt="$t('SIGNUP.register-now')"
           src="/img/registration.svg" />
    </div>
    <div class="w-full lg:w-1/2 px-6 float-left">
      <h1 class="text-center lg:text-left p-3 title">
        {{ $t('SIGNUP.title') }}
      </h1>
      <p class="text-gray-500 p-3 text-sm">
        {{ $t('SIGNUP.teaser') }}
      </p>
      <div class="lg:flex lg:items-center mx-6 mt-6 mb-3 lg:mt-12">
        <div class="lg:w-1/6">
          <label class="block text-gray-500 text-left lg:text-right mb-1 lg:mb-0 pr-4"
                 for="email">
            {{ $t('REGISTRATION.email') }}
          </label>
        </div>
        <div class="w-full lg:w-3/6 mb-3 lg:my-0">
          <input id="email"
                 v-model="email"
                 :class="emailClass"
                 @keydown="onEmailSignupInput"
                 @input="onEmailSignupInput"
                 type="email"
                 class="input" />
        </div>
        <div v-if="hasErrors()"
             class="w-full text-center error block lg:hidden mb-3 error-mobile">
          {{ getMostCurrentError() }}
        </div>
        <div class="w-full lg:w-2/6 px-2">
          <button :class="signUpClass"
                  :disabled="isSignUpDisabled"
                  @click="signUpWithEmail"
                  class="button w-full">
            {{ $t('SIGNUP.sign-up') }}
          </button>
        </div>
      </div>
      <div v-if="hasErrors()"
           class="text-center error hidden lg:block error-desktop">
        {{ getMostCurrentError() }}
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters } = createNamespacedHelpers('registration');

export default {
  name: 'SignupPage',
  data() {
    return {
      email: '',
      // eslint-disable-next-line no-useless-escape
      emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },
  computed: {
    emailClass: function () {
      if (this.email === '') {
        return '';
      }

      if (this.hasErrors()) {
        return 'error';
      }

      if (this.isValidEmail()) {
        return 'ok';
      }

      return 'error';
    },
    signUpClass: function () {
      if (this.isSignUpDisabled) {
        return 'disabled';
      }

      return '';
    },
    isSignUpDisabled: function () {
      if (this.email === '') {
        return true;
      }

      if (this.emailClass !== 'ok') {
        return true;
      }

      if (this.isSigningUp()) {
        return true;
      }

      if (this.hasErrors()) {
        return true;
      }

      return false;
    },
  },
  methods: {
    ...mapActions([
      'signUp',
      'reset',
    ]),
    ...mapGetters([
      'hasErrors',
      'getMostCurrentError',
      'status',
      'isSigningUp',
      'isSignedUp',
    ]),
    isValidEmail: function () {
      return this.email === '' ? false : this.emailRegex.test(this.email);
    },
    signUpWithEmail: async function () {
      if (this.isSignUpDisabled) {
        return;
      }
      await this.signUp({ email: this.email });
      if (!this.hasErrors()) {
        this.$router.push(this.localeRoute('/signup/thank-you'));
      }
    },
    onEmailSignupInput() {
      if (this.hasErrors()) {
        this.reset();
      }
    },
  },
};
</script>
