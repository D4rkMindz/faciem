<template>
  <div class="container mx-auto">
    <h1 class="font-bold text-2xl">
      {{ $t('CONTACT.title') }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  head() {
    return {
      title: 'VENOVUM | ' + this.$t('HEAD.CONTACT.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('HEAD.CONTACT.description') },
      ],
    };
  },
};
</script>
