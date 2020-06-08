<template>
  <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
    <div class="ml-3 relative">
      <button @click="profile = !profile"
              class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
              aria-label="User menu"
              aria-haspopup="true">
        <img class="h-8 w-8 rounded-full object-cover"
             src="/img/profile.png"
             alt="" />
      </button>
      <transition
        enter-active-class="transition-all duration-100 ease-in-out"
        leave-active-class="transition-all duration-75 ease-in"
        enter-class="opacity-0 transform scale-70"
        enter-to-class="opacity-100 transform scale-100"
        leave-class="opacity-100 transform scale-100"
        leave-to-class="opacity-0 transform scale-95">
        <div v-if="profile"
             @click="profile = false"
             class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
          <div class="pb-1 rounded-md bg-white shadow-xs"
               role="menu"
               aria-orientation="vertical"
               aria-labelledby="user-menu">
            <div class="block rounded-t px-4 py-2 text-sm leading-5 bg-purple-700 text-white flex flex-col">
              <div class="font-bold text-center">
                {{ username }}
              </div>
              <div class="text-center">
                {{ name }}
              </div>
            </div>
            <nuxt-link :to="localeRoute('/')"
                       class="dropdown-item">
              {{ $t('MENU.profile') }}
            </nuxt-link>
            <nuxt-link :to="localeRoute('/logout')"
                       class="dropdown-item">
              {{ $t('MENU.logout') }}
            </nuxt-link>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { INFO_STATES } from '@/domain/profile/info-states';
const { mapActions, mapGetters } = createNamespacedHelpers('profile/info');

export default {
  name: 'ProfileDropdown',
  data: function () {
    return {
      profile: false,
    };
  },
  computed: {
    username() {
      if (this.getState() !== INFO_STATES.FETCHED) {
        return this.$t('PROFILE.welcome');
      }
      return this.getUsername();
    },
    name() {
      if (this.getState() !== INFO_STATES.FETCHED) {
        return this.$t('PROFILE.nice-to-see-you');
      }
      return this.getName();
    },
  },
  mounted() {
    this.refreshInfo();
  },
  methods: {
    ...mapActions(['refreshInfo']),
    ...mapGetters(['getName', 'getUsername', 'getState']),
  },
};
</script>

<style lang="scss" scoped>
  .dropdown-item {
    @apply block px-4 py-2 text-sm leading-5 text-gray-700;
    &:hover {
      @apply bg-gray-100;
    }
    &:focus {
      @apply bg-gray-100;
    }
  }
</style>
