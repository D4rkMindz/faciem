<template>
  <div class="container mx-auto login">
    <div class="bg-white shadow w-11/12 lg:w-1/3 mx-auto p-6 rounded">
      <div class="lg:flex lg:items-center mb-6">
        <div class="lg:w-1/3">
          <label class="block text-gray-500 lg:text-right mb-1 lg:mb-0 pr-4"
                 for="username">
            Username
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
                 class="block text-gray-500 lg:text-right mb-1 lg:mb-0 pr-4"
                 @keyup.enter.native="authenticate">
            Password
          </label>
        </div>
        <div class="lg:w-2/3">
          <input id="password"
                 v-model="password"
                 class="input"
                 type="password" />
        </div>
      </div>
      <p v-if="hasError"
         class="text-right text-red-500 mb-6">
        {{ errorMessage() }}
      </p>
      <div class="text-right">
        <button class="bg-purple-500 text-white font-bold py-2 px-4 rounded-full"
                :class="{'opacity-50 cursor-not-allowed': (isAuthenticating() === true)}"
                @click="authenticate">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters } = createNamespacedHelpers('auth');

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions([
      'login',
    ]),
    ...mapGetters([
      'hasError',
      'errorMessage',
      'errorLanguage',
      'state',
      'isAuthenticating',
    ]),
    async authenticate() {
      await this.login({ username: this.username, password: this.password });
      if (!this.hasError()) {
        this.$router.push('/watch');
      }
    },
  },
};
</script>
