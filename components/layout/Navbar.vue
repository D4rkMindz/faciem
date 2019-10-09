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
      <div class="w-full items-center flex-grow hidden lg:flex lg:w-auto lg:justify-between"
           desktop-navigation>
        <div class="hidden lg:inline-flex">
          <div v-if="!authenticated"
               class="navigation-link">
            <nuxt-link to="/"
                       exact>
              PRIVATE
            </nuxt-link>
          </div>
          <div v-if="!authenticated"
               class="navigation-link">
            <nuxt-link to="/business"
                       exact>
              BUSINESS
            </nuxt-link>
          </div>
          <div v-if="authenticated"
               class="navigation-link">
            <nuxt-link to="/watch">
              Watch
            </nuxt-link>
          </div>
        </div>
        <div class="hidden lg:inline-flex">
          <div v-if="!authenticated"
               class="navigation-link button-link">
            <nuxt-link to="/signup">
              <button class="bg-purple-500 text-white font-bold py-2 px-4 rounded-full">
                Sign Up
              </button>
            </nuxt-link>
          </div>
          <div v-if="!authenticated"
               class="navigation-link">
            <nuxt-link to="/login">
              Login
            </nuxt-link>
          </div>
          <div v-if="authenticated"
               class="navigation-link">
            <nuxt-link to="/logout">
              Logout
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import BurgerMenu from './BurgerMenu';

const { mapState } = createNamespacedHelpers('auth');

export default {
  name: 'Navbar',
  components: { BurgerMenu },
  data: () => {
    return {
      menuOpen: false,
    };
  },
  computed: {
    ...mapState({
      authenticated: state => state.authenticated,
    }),
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
