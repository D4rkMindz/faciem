
<template>
  <div>
    logging you out
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('auth');

export default {
  name: 'LogoutPage',
  created() {
    this.logout();
    this.$router.push('/');
  },
  methods: {
    ...mapActions([
      'logout',
    ]),
  },
};
</script>

<style scoped>

</style>
