<template>
  <div>
    <div :class="{'my-6': errors.length === 0, 'mt-6': errors.length !== 0}"
         class="lg:flex lg:items-center">
      <div class="lg:w-1/3">
        <label :for="id"
               class="block text-gray-500 lg:text-right mb-1 lg:mb-0 pr-4">
          {{ label }}
        </label>
      </div>

      <div class="lg:w-2/3 relative">
        <select class="input">
          <option v-for="option in options">
            {{ option }}
          </option>
        </select>

        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      <div
        v-for="(error, i) in errors"
        :key="i"
        :class="{'mb-6': (index === Object.keys(errors).length - 1)}"
        class="flex">
        <div class="hidden lg:block lg:w-1/3">
          &nbsp;
        </div>
        <div class="w-full lg:w-2/3 text-center error text-xs">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/form/BaseInput';

export default {
  name: 'Select',
  extends: BaseInput,
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
};
</script>
