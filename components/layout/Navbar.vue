<template>
  <div>
    <nav class="flex flex-wrap items-center justify-between bg-white mx-auto py-2 px-3 lg:py-12 lg:px-10">
      <div class="items-center flex-shrink-0 mx-2">
        <nuxt-link to="/">
          <img src="/img/logo.png"
               class="h-8 w-8 lg:ml-32"
               alt="Venovum logo" />
        </nuxt-link>
      </div>
      <div class="block items-center lg:hidden py-2">
        <burger-menu />
      </div>
      <div class="w-full lg:flex lg:flex-row items-center flex-grow hidden lg:flex lg:w-auto lg:justify-between"
           desktop-navigation>
        <div class="hidden lg:inline-flex">
          <div v-if="!authenticated"
               class="navigation-link">
            <nuxt-link to="/"
                       exact>
              {{ $t('PRIVATE') }}
            </nuxt-link>
          </div>
          <div v-if="!authenticated"
               class="navigation-link">
            <nuxt-link to="/business"
                       exact>
              {{ $t('BUSINESS') }}
            </nuxt-link>
          </div>
          <div v-if="authenticated">
            <div v-if="canSeeWatch"
                 class="navigation-link">
              <nuxt-link to="/watch">
                {{ $t('Watch') }}
              </nuxt-link>
            </div>
            <div v-if="canSeeAdmin"
                 class="navigation-link">
              <nuxt-link to="/b2b/admin">
                {{ $t('Admin') }}
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="hidden lg:inline-flex">
          <div v-if="!authenticated"
               class="navigation-link button-link">
            <nuxt-link to="/signup">
              <button class="bg-purple-500 text-white font-bold py-2 px-4 rounded-full">
                {{ $t('Sign Up') }}
              </button>
            </nuxt-link>
          </div>
          <div v-if="!authenticated"
               class="navigation-link">
            <nuxt-link to="/login">
              {{ $t('Login') }}
            </nuxt-link>
          </div>
          <div v-if="authenticated"
               class="navigation-link">
            <nuxt-link to="/logout">
              {{ $t('Logout') }}
            </nuxt-link>
          </div>
          <div v-for="locale in availableLocales"
               :key="locale.code"
               class="navigation-link">
            <nuxt-link :to="switchLocalePath(locale.code)">
              {{ locale.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import BurgerMenu from '@/components/layout/BurgerMenu';
import { CAMPAIGN_ROLES } from '@/domain/auth/authorization/customer/campaign-roles';
import { WATCH_ROLES } from '@/domain/auth/authorization/user/watch-roles';

const { mapState, mapGetters } = createNamespacedHelpers('auth');

export default {
  name: 'Navbar',
  components: { BurgerMenu },
  data: () => {
    return {
      menuOpen: false,
    };
  },
  computed: {
    availableLocales() {
      // eslint-disable-next-line no-console
      console.log(this.$i18n.locales);
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    },
    ...mapState({
      authenticated: state => state.authenticated,
    }),
    canSeeAdmin() {
      return this.hasRole()(CAMPAIGN_ROLES.VIEW);
    },
    canSeeWatch() {
      return this.hasRole()(WATCH_ROLES.WATCH);
    },
  },
  methods: {
    ...mapGetters([
      'hasRole',
    ]),
  },
};
</script>

<style scoped>
  .button-link {
    margin: 0;
    padding: 0;
  }
  nav {
    background-color: transparent;
  }
</style>
