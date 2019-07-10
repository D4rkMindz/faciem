<template>
  <div class="container mx-auto">
    <input v-model="username"
           type="text" />
    <input v-model="password"
           type="password" />
    <button class="bg-purple text-white font-bold py-2 px-4 rounded-full"
            @click="authenticate">
      Login
    </button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('auth');

export default {
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
    authenticate() {
      this.login(this.username, this.password);
      this.$router.push('/watch');
    },
  },
};
</script>
