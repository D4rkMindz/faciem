<template>
  <div class="flex flex-col min-h-screen">
    <navbar class="flex-grow-0" />
    <div class="mt-8 flex-grow">
      <nuxt />
    </div>
    <footer class="text-white mt-5 flex-grow-0">
      <div class="bg-purple-700 w-full">
        <div class="container mx-auto px-2 md:px-0 pt-5 pb-3 flex flex-col md:flex-row">
          <div class="w-1 md:w-1/3 lg:w-1/6 flex flex-col">
            <h3 class="font-bold">
              {{ $t('FOOTER.first.title') }}
            </h3>
            <nuxt-link :to="localeRoute('/imprint')"
                       class="mt-1">
              {{ $t('FOOTER.first.imprint') }}
            </nuxt-link>
            <nuxt-link :to="localeRoute('/contact')"
                       class="mt-1">
              {{ $t('FOOTER.first.contact') }}
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="bg-purple-900 w-full">
        <div class="container mx-auto bg-purple-900 py-2">
          © 2019 - {{ currentYear }} venovum
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import moment from 'moment';
import Navbar from '~/components/layout/Navbar';

export default {
  components: { Navbar },
  computed: {
    currentYear() {
      return moment().year().toString();
    },
  },
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
