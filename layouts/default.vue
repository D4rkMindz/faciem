<template>
  <div>
    <navbar />
    <div class="mt-8">
      <nuxt />
    </div>
  </div>
</template>
<script>
import Navbar from '~/components/layout/Navbar';

export default {
  components: { Navbar },
};
</script>

<style scoped>
  body, html {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    min-height: 80vh;
  }
</style>
