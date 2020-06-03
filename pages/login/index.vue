<template>
  <div class="container mx-auto login">
    <div class="bg-white shadow w-11/12 lg:w-1/3 mx-auto p-6 rounded">
      <div class="lg:flex lg:items-center mb-6">
        <div class="lg:w-1/3">
          <label class="block text lg:text-right mb-1 lg:mb-0 pr-4"
                 for="username">
            {{ $t('DEFAULTS.username') }}
          </label>
        </div>
        <div class="lg:w-2/3">
          <input id="username"
                 v-model="username"
                 class="input"
                 type="text" />
        </div>
      </div>
      <div class="lg:flex lg:items-center mb-6">
        <div class="lg:w-1/3">
          <label for="password"
                 class="block text lg:text-right mb-1 lg:mb-0 pr-4">
            {{ $t('DEFAULTS.password') }}
          </label>
        </div>
        <div class="lg:w-2/3">
          <input id="password"
                 v-model="password"
                 @keyup.enter="authenticate"
                 class="input"
                 type="password" />
        </div>
      </div>
      <p v-if="hasError"
         class="text-right text-red-500 mb-6">
        {{ errorMessage() }}
      </p>
      <div class="text-right">
        <button :class="{'opacity-50 cursor-not-allowed': (disabled === true)}"
                :disabled="disabled"
                @click="authenticate"
                class="button">
          {{ $t('DEFAULTS.login-action') }}
        </button>
      </div>
    </div>
    <div class="w-1/1 text-center mt-3">
      <p class="text-muted">
        {{ $t('REGISTRATION.dont-have-an-account') }}
        <nuxt-link :to="localeRoute('/signup')"
                   class="link">
          {{ $t('REGISTRATION.create-account') }}
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { WATCH_ROLES } from '@/domain/auth/authorization/user/watch-roles';

const { mapActions, mapGetters } = createNamespacedHelpers('auth');

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    disabled() {
      const formNotEmpty = !!this.username && !!this.password;
      const x = !(formNotEmpty && !this.isAuthenticating());
      return x;
    },
  },
  methods: {
    ...mapActions([
      'login',
    ]),
    ...mapGetters([
      'hasRole',
      'hasError',
      'errorMessage',
      'errorLanguage',
      'state',
      'isAuthenticating',
    ]),
    async authenticate() {
      await this.login({ username: this.username, password: this.password });
      if (!this.hasError()) {
        if (this.hasRole()(WATCH_ROLES.WATCH)) {
          await this.$router.push(this.localeRoute('/watch'));
        } else {
          await this.$router.push(this.localeRoute('/b2b/admin'));
        }
      }
    },
  },
};
</script>
