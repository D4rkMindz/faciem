<template>
  <div class="bg-gray-100">
    <navbar />
    <nuxt />
  </div>
</template>
<script>
import Navbar from '~/components/layout/Navbar';

export default {
  components: { Navbar },
};
</script>
