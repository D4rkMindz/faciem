<template>
  <div class="flex flex-col min-h-screen">
    <navbar class="flex-grow-0" />
    <div class="mt-8 flex-grow">
      <nuxt />
    </div>
    <footer class="text-white mt-5 flex-grow-0">
      <div class="bg-purple-700 w-full">
        <div class="container mx-auto px-2 md:px-0 pt-5 pb-3 flex flex-col md:flex-row">
          <div class="footer-row">
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

          <div class="footer-row">
            <h3 class="font-bold hidden">
              {{ $t('FOOTER.second.title') }}
            </h3>
          </div>

          <div class="footer-row">
            <h3 class="font-bold hidden">
              {{ $t('FOOTER.third.title') }}
            </h3>
          </div>

          <div class="footer-row">
            <h3 class="font-bold">
              {{ $t('FOOTER.fourth.title') }}
            </h3>
            <nuxt-link
              v-for="locale in availableLocales"
              :key="locale.code"
              :to="switchLocalePath(locale.code)"
              class="mt-1">
              {{ locale.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="bg-purple-900 w-full">
        <div class="container mx-auto bg-purple-900 p-2 flex flex-row justify-between">
          <div>© 2019 - {{ currentYear }} venovum</div>
          <a :href="'https://github.com/D4rkMindz/faciem/commit/' + version.full"
             class="text-muted version">v{{ version.short }}</a>
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
    version() {
      const version = require('@/static/version.json');
      // eslint-disable-next-line no-console
      console.log(version);
      return version;
    },
    currentYear() {
      return moment().year().toString();
    },
    availableLocales() {
      return this.$i18n.locales;
    },
  },
};
</script>

<style scoped lang="scss">
  body, html {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    min-height: 80vh;
  }

  .footer-row {
    @apply w-1 flex flex-col mt-2;

    &:first-of-type {
      @apply mt-0;
    }
  }

  .version {
    @apply text-xs;
    line-height: 1.5rem;
  }

  @screen md {
    .footer-row {
      @apply w-1/4;
    }
  }
</style>
