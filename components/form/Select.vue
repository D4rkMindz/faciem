<template>
  <div>
    <div :class="{'my-6': errors.length === 0 && !nomargin, 'mt-6': errors.length !== 0 && !nomargin}"
         class="lg:flex lg:items-center">
      <div class="lg:w-1/3">
        <label :for="id"
               class="block text-gray-500 lg:text-right mb-1 lg:mb-0 pr-4">
          {{ label }}
        </label>
      </div>

      <div class="lg:w-2/3 relative">
        <select @change="onChange($event)"
                class="input">
          <option v-for="option in options"
                  :key="getKey(option)"
                  :value="getKey(option)"
                  :selected="getKey(option) === inputValue">
            {{ getDisplayValue(option) }}
          </option>
        </select>

        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <v-icon name="chevron-down" />
        </div>
      </div>

      <div v-for="(error, i) in errors"
           :key="i"
           :class="{'mb-6': (i === Object.keys(errors).length - 1) && !nomargin}"
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
    nomargin: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    onChange(event) {
      this.inputValue = event.target.value;
      this.onInput(event);
    },
    getDisplayValue(option) {
      if (typeof option === 'string') {
        return option;
      }
      if (typeof option === 'object' && 'translation' in option) {
        return option.translation;
      }

      return 'TRANSLATION NOT FOUND';
    },
    getKey(option) {
      if (typeof option === 'string') {
        return option;
      }
      if (typeof option === 'object' && 'key' in option) {
        return option.key;
      }

      return Math.random().toString(36).substring(7);
    },
  },
};
</script>
