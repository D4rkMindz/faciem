<template>
  <div>
    <!-- from https://dribbble.com/shots/11678010-Payment-application-page-example -->
    <div class="container mx-auto p-3">
      <h2 class="text-muted mb-3">
        {{ $t('DASHBOARD.overview') }}
      </h2>
      <div class="flex flex-col md:flex-row">
        <ProfitCard class="w-full md:w-1/2 lg:w-1/3" />
      </div>
    </div>
  </div>
</template>

<script>
import ProfitCard from '@/components/profile/ProfitCard';

export default {
  middleware: ['auth'],
  name: 'RootPage',
  components: {
    ProfitCard,
  },
  head() {
    return {
      title: 'VENOVUM | ' + this.$t('HEAD.INDEX.title'),
    };
  },
};
</script>
