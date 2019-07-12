<template>
  <div>
    <nav class="flex flex-wrap items-center justify-between mx-auto py-2 px-3 lg:py-12 lg:px-10">
      <div class="flex items-center flex-shrink-0 mx-2">
        <nuxt-link to="/">
          <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png"
               class="h-8"
               alt="Venovum logo" />
        </nuxt-link>
      </div>
      <div class="block items-center lg:hidden py-2">
        <burger-menu />
      </div>
      <div class="w-full items-center flex-grow hidden lg:flex lg:w-auto lg:justify-between"
           desktop-navigation>
        <div class="hidden lg:inline-flex">
          <div class="mx-5 py-2 items-center text-gray-900 hover:text-gray-900 cursor-pointer">
            PRIVATE
          </div>
          <div class="mx-5 py-2 items-center text-gray-500 hover:text-gray-900 cursor-pointer">
            BUSINESS
          </div>
        </div>
        <div class="hidden lg:inline-flex">
          <div class="mx-5 items-center text-gray-500 hover:text-gray-900 cursor-pointer">
            <button class="bg-purple text-white font-bold py-2 px-4 rounded-full">
              Sign Up
            </button>
          </div>
          <div class="mx-5 py-2 items-center text-gray-500 hover:text-gray-900 cursor-pointer">
            <nuxt-link to="/login">
              Login
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import BurgerMenu from './BurgerMenu';

export default {
  name: 'Navbar',
  components: { BurgerMenu },
  data: () => {
    return {
      menuOpen: false,
    };
  },
};
</script>
