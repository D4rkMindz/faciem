<template>
  <div>
    <div class="flex">
      <button v-for="i in 5"
              :class="{ 'mr-1': i < 5 }"
              @click="$emit('input', i)"
              type="button"
              class="focus:outline-none">
        <svg :class="[ value >= i ? 'text-primary': 'text-muted']"
             class="block h-8 w-8"
             fill="currentColor"
             viewBox="0 0 20 20"
             xmlns="http://www.w3.org/2000/svg"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stars',
  props: {
    value: {
      default: 0,
      type: Number,
    },
  },
  watch: {
    value(n) {
      // eslint-disable-next-line no-console
      console.log('value stars changed to:', n);
    },
  },
};
</script>

<style scoped>

</style>
