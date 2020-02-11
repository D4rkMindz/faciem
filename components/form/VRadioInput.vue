<template>
  <div class="pb-2">
    <div>
      <input ref="input"
             :id="id"
             :name="name"
             :title="inputValue"
             :class="['radio', classes]"
             @input="inputValue = id;onInput()"
             @leave="onBlur"
             @blur="onBlur"
             type="radio" />
      <label :for="id"
             class="inline ml-2 text">
        {{ label }}
      </label>
    </div>
    <div v-for="(error, i) in errors"
         :class="{'mb-6': (i === Object.keys(errors).length - 1 /* last element needs a margin bottom 6 */)}"
         class="flex">
      <div class="hidden lg:block lg:w-1/3">
        &nbsp;
      </div>
      <div class="w-full lg:w-2/3 px-3 error text-xs">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/form/BaseInput';

/**
 * Input component
 *
 * This component can be used to replace the native input.
 *
 * @attribute v-model The value of the input
 * @attribute errors An array of errors
 *
 * @event validate Is emitted if the input can be validated.
 * This event can be used to validate the data from the v-model and then push the errors to the error attribute
 */
export default {
  name: 'Input',
  extends: BaseInput,
  props: {
    name: {
      default: 'radio-input',
      type: String,
      required: true,
    },
    type: {
      default: 'text',
      type: String,
      required: false,
    },
    placeholder: {
      default: '',
      type: String,
      required: false,
    },
  },
  methods: {
    click() {
      this.$refs.input.click();
    },
  },
};
</script>

<style>
  .radio {
    color: #3d2dda;
  }
</style>
