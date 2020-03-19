<template>
  <div>
    <div :class="{open: menuOpen}"
         @click="menuOpen = !menuOpen"
         class="burger">
      <span />
      <span />
    </div>
    <div :class="{shown: menuOpen}"
         class="overlay">
      <div class="flex justify-center items-center h-full w-full">
        <div>
          <div v-if="!authenticated"
               @click="menuOpen = false"
               class="py-3 text-center text-gray-500 hover:text-gray-900 cursor-pointer">
            <nuxt-link to="/">
              PRIVATE
            </nuxt-link>
          </div>
          <div v-if="!authenticated"
               @click="menuOpen = false"
               class="py-3 text-center text-gray-500 hover:text-gray-900 cursor-pointer">
            <nuxt-link to="/business">
              BUSINESS
            </nuxt-link>
          </div>
          <div @click="menuOpen = false"
               class="py-3 text-center text-gray-500 hover:text-gray-900 cursor-pointer">
            <nuxt-link to="/">
              Home
            </nuxt-link>
          </div>
          <div v-if="authenticated && canSeeAdmin"
               @click="menuOpen = false"
               class="py-3 text-center text-gray-500 hover:text-gray-900 cursor-pointer">
            <nuxt-link to="/b2b/admin">
              Admin
            </nuxt-link>
          </div>
          <div v-if="authenticated && canSeeWatch"
               @click="menuOpen = false"
               class="py-3 text-center text-gray-500 hover:text-gray-900 cursor-pointer">
            <nuxt-link to="/watch">
              Watch
            </nuxt-link>
          </div>
          <div v-if="!authenticated"
               @click="menuOpen = false"
               class="py-3 text-center text-gray-500 hover:text-gray-900 cursor-pointer">
            <nuxt-link to="/login">
              Login
            </nuxt-link>
          </div>
          <div v-if="!authenticated"
               @click="menuOpen = false"
               class="py-3">
            <nuxt-link to="/signup">
              <button class="bg-purple-500 text-white font-bold py-2 px-4 rounded-full hover:bg-purple-400">
                Sign Up
              </button>
            </nuxt-link>
          </div>
          <div v-if="authenticated"
               @click="menuOpen = false"
               class="py-3 text-center text-gray-500 hover:text-gray-900 cursor-pointer">
            <nuxt-link to="/logout">
              Logout
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { CAMPAIGN_ROLES } from '@/domain/auth/authorization/customer/campaign-roles';
import { WATCH_ROLES } from '@/domain/auth/authorization/user/watch-roles';

const { mapState, mapGetters } = createNamespacedHelpers('auth');

export default {
  name: 'BurgerMenu',
  data: () => {
    return {
      menuOpen: false,
    };
  },
  computed: {
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
}
;
</script>

<style scoped>
  .burger {
    height: 1rem;
    z-index: 2;
  }

  .burger > span:nth-child(1),
  .burger > span:nth-child(2) {
    width: 2rem;
    height: 2px;
    background-color: gray; /* TODO CHANGE */
    display: block;
    position: relative;
    left: 0;
    z-index: 2;

    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;

    -webkit-transition: .2s ease-in-out;
    -moz-transition: .2s ease-in-out;
    -o-transition: .2s ease-in-out;
    transition: .2s ease-in-out;

    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  .burger > span:nth-child(1) {
    top: 0;
  }

  .burger > span:nth-child(2) {
    top: .5rem;
  }

  .burger.open > span:nth-child(1) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    /* .025 to match the center exactly left: .5rem; */
    top: 1.025rem;
    left: .5rem;
  }

  .burger.open > span:nth-child(2) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    /* .025 to match the center exactly left: .5rem; */
    top: -.525rem;
    left: .5rem;
  }

  .overlay {
    position: fixed;
    background-color: white; /* TODO CHANGE */
    overflow-x: hidden;
    z-index: 1;
    left: 0;
    top: 0;

    opacity: 0;
    width: 0;
    height: 0;

    -webkit-animation: fadeOut .2s ease-in-out;
    -moz-animation: fadeOut .2s ease-in-out;
    -ms-animation: fadeOut .2s ease-in-out;
    -o-animation: fadeOut .2s ease-in-out;
    animation: fadeOut .2s ease-in-out;
  }

  .overlay.shown {
    height: 100vh;
    width: 100vw;
    opacity: 1;

    -webkit-animation: fadeIn .2s ease-in-out;
    -moz-animation: fadeIn .2s ease-in-out;
    -ms-animation: fadeIn .2s ease-in-out;
    -o-animation: fadeIn .2s ease-in-out;
    animation: fadeIn .2s ease-in-out;
  }

  /* TODO add vendor prefixes after integrating sass */
  @keyframes fadeIn {
    0% {
      opacity: 0;
      width: 0;
      height: 0;
    }
    1% {
      width: 100vw;
      height: 100vh;
      opacity: 0;
    }
    100% {
      width: 100vw;
      height: 100vh;
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      width: 100vw;
      height: 100vh;
      opacity: 1;
    }
    99% {
      width: 100vw;
      height: 100vh;
      opacity: 0;
    }
    100% {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }
</style>
