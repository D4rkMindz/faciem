<template>
  <div class="container mx-auto">
    <input v-model="username"
           type="text" />
    <input v-model="password"
           type="password" />
    <p v-if="hasError">
      {{ errorMessage() }}
    </p>
    <button class="bg-purple text-white font-bold py-2 px-4 rounded-full"
            @click="authenticate">
      Login
    </button>
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
