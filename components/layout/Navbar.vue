<template>
  <div>
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button @click="mobileMenu = !mobileMenu"
                    class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
                    aria-label="Main menu"
                    aria-expanded="false">
              <!-- Icon when menu is closed. -->
              <svg v-if="!mobileMenu"
                   class="block h-6 w-6"
                   stroke="currentColor"
                   fill="none"
                   viewBox="0 0 24 24">
                <path stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!-- Icon when menu is open. -->
              <svg v-if="mobileMenu"
                   class="block h-6 w-6"
                   stroke="currentColor"
                   fill="none"
                   viewBox="0 0 24 24">
                <path stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex-shrink-0">
              <img class="block lg:hidden h-8 w-auto"
                   src="/img/logos/logo.png"
                   alt="Workflow logo" />
              <!-- TODO add venovum text to image-->
              <img class="hidden lg:block h-8 w-auto"
                   src="/img/logos/logo.png"
                   alt="Workflow logo" />
            </div>
            <div class="hidden sm:block sm:ml-6">
              <div class="flex">
                <div v-for="item in navigation">
                  <nuxt-link
                    :to="localeRoute(item.route)"
                    class="menu-item">
                    {{ item.title }}
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
          <div v-if="authenticated">
            <ProfileDropdown />
          </div>
        </div>
      </div>

      <!-- Mobile navigation -->
      <div v-if="mobileMenu"
           @click="mobileMenu = false"
           class="block">
        <div class="px-2 pt-2 pb-3">
          <div v-for="item in navigation">
            <nuxt-link
              :to="localeRoute(item.route)"
              class="mobile-item">
              {{ item.title }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import ProfileDropdown from '@/components/layout/ProfileDropdown';
import { createNamespacedHelpers } from 'vuex';
import { CAMPAIGN_ROLES } from '@/domain/auth/authorization/customer/campaign-roles';
import { WATCH_ROLES } from '@/domain/auth/authorization/user/watch-roles';

const { mapState, mapGetters } = createNamespacedHelpers('auth');

export default {
  name: 'Navbar',
  components: { ProfileDropdown },
  data: () => {
    return {
      mobileMenu: false,
      menuOpen: false,
    };
  },
  computed: {
    navigation() {
      const items = [];
      const login = {
        route: '/login',
        title: this.$t('MENU.login'),
      };
      const signup = {
        route: '/signup',
        title: this.$t('MENU.sign-up'),
      };
      const admin = {
        route: '/b2b/admin',
        title: this.$t('MENU.admin'),
      };
      const watch = {
        route: '/watch',
        title: this.$t('MENU.watch'),
      };
      if (!this.authenticated) {
        items.push(login);
        items.push(signup);
      } else {
        if (this.canSeeAdmin) {
          items.push(admin);
        }
        if (this.canSeeWatch) {
          items.push(watch);
        }
      }

      return items;
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

<style scoped lang="scss">
  .menu-item {
    @apply ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-white;

    &:hover {
     @apply bg-gray-700;
    }

    &.nuxt-link-active {
      @apply bg-gray-900;
    }
  }

  .mobile-item {
    @apply mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300;
    &:hover{
      @apply text-white bg-gray-700;
    }
    &:focus {
      @apply text-white bg-gray-700;
    }
  }
</style>
