<template>
  <div class="container mx-auto">
    <h1 class="font-bold text-2xl">
      {{ $t('IMPRINT.title') }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'ImprintPage',
  head() {
    return {
      title: 'VENOVUM | ' + this.$t('HEAD.IMPRINT.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('HEAD.IMPRINT.description') },
      ],
    };
  },
};
</script>
