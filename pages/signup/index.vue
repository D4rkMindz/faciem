<template>
  <div class="container mx-auto">
    <div class="w-full lg:w-1/3 p-6 lg:float-right flex items-center lg:mt-20 lg:mr-32">
      <img src="/img/registration.svg"
           alt="Register now at Venovum.com" />
    </div>
    <div class="w-full lg:w-1/2 px-6 float-left">
      <h1 class="text-center lg:text-left p-3 text-2xl lg:text-6xl">
        Get Started With Ease
      </h1>
      <p class="text-gray-500 p-3 text-sm">
        Just enter your email and get ready to earn some money by watching advertisement videos. We then send you an
        email with a link to complete your signup at Venovum
      </p>
      <div class="lg:flex lg:items-center mx-6 mt-6 mb-3 lg:mt-12">
        <div class="lg:w-1/6">
          <label class="block text-gray-500 text-left lg:text-right mb-1 lg:mb-0 pr-4"
                 for="email">
            Email
          </label>
        </div>
        <div class="w-full lg:w-3/6 mb-3 lg:my-0">
          <input id="email"
                 v-model="email"
                 class="input"
                 :class="emailClass"
                 type="email"
                 @keydown="onEmailSignupInput"
                 @input="onEmailSignupInput" />
        </div>
        <div v-if="hasError()"
             class="w-full text-center error block lg:hidden mb-3">
          {{ getMostCurrentError() }}
        </div>
        <div class="w-full lg:w-2/6 px-2">
          <button class="button w-full"
                  :class="signUpClass"
                  :disabled="isSignUpDisabled"
                  @click="signUpWithEmail">
            Sign Up
          </button>
        </div>
      </div>
      <div v-if="hasError()"
           class="text-center error hidden lg:block">
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

      if (this.isValidEmail(this.email)) {
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

      if (this.hasError()) {
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
      'hasError',
      'getMostCurrentError',
      'status',
      'isSigningUp',
      'isSignedUp',
    ]),
    isValidEmail: function (email) {
      return this.hasError() ? false : this.email === '' ? false : this.emailRegex.test(email);
    },
    signUpWithEmail: async function () {
      await this.signUp({ email: this.email });
      if (!this.hasError()) {
        this.$router.push('/signup/thank-you');
      }
    },
    onEmailSignupInput() {
      // TODO test
      if (this.hasError()) {
        this.reset();
      }
    },
  },
};
</script>
