<template>
  <div>
    <div class="burger"
         :class="{open: menuOpen}"
         @click="menuOpen = !menuOpen">
      <span />
      <span />
    </div>
    <div class="overlay"
         :class="{shown: menuOpen}">
      <div class="flex justify-center items-center h-full w-full">
        <div>
          <div class="py-3 text-center text-gray-500 hover:text-gray-900 cursor-pointer">
            PRIVATE
          </div>
          <div class="py-3 text-center text-gray-500 hover:text-gray-900 cursor-pointer">
            BUSINESS
          </div>
          <div class="py-3 text-center text-gray-500 hover:text-gray-900 cursor-pointer"
               @click="menuOpen = false">
            <nuxt-link to="/">
              Home
            </nuxt-link>
          </div>
          <div class="py-3 text-center text-gray-500 hover:text-gray-900 cursor-pointer"
               @click="menuOpen = false">
            <nuxt-link to="/login">
              Login
            </nuxt-link>
          </div>
          <div class="py-3"
               @click="menuOpen = false">
            <nuxt-link to="/">
              <button class="bg-purple text-white font-bold py-2 px-4 rounded-full hover:bg-purple-400">
                Sign Up
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BurgerMenu',
  data: () => {
    return {
      menuOpen: false,
    };
  },
};
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
