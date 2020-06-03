
<template>
  <div>
    {{ $t('AUTH.logging-out') }}
    <!--    logging you out-->
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('auth');

export default {
  name: 'LogoutPage',
  middleware: 'auth',
  created() {
    this.logout();
    this.$router.push(this.localeRoute('/login'));
  },
  methods: {
    ...mapActions([
      'logout',
    ]),
  },
};
</script>
