<template>
  <div>
    <!-- from https://dribbble.com/shots/11678010-Payment-application-page-example -->
    <div class="container mx-auto">
      <h2 class="text-muted mb-3">
        {{ $t('DASHBOARD.overview') }}
      </h2>
      <div class="flex flex-col md:flex-row">
        <ProfitCard class="w-1 md:w-1/2 lg:w-1/3" />
        <!--        <ProfitCard class="w-1 md:w-1/2 lg:w-1/3 ml-5" />-->
        <!--        <ProfitCard class="w-1 md:w-1/2 lg:w-1/3 ml-5" />-->
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
};
</script>
