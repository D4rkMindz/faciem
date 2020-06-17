<template>
  <div>
    <div :class="{'my-6': errors.length === 0, 'mt-6': errors.length !== 0}"
         class="flex flex-col lg:flex-row lg:items-center">
      <div class="w-full lg:w-2/5">
        <label :for="id"
               class="block lg:text-right mb-1 lg:mb-0 pr-4 text">
          {{ label }}
        </label>
      </div>

      <div class="w-full lg:w-3/5">
        <input ref="input"
               :id="id"
               v-model="inputValue"
               :title="inputValue"
               :class="['input', classes]"
               :placeholder="placeholder"
               :type="type"
               @input="onInput"
               @leave="onBlur"
               @blur="onBlur" />
      </div>
    </div>
    <div
      v-for="(error, i) in errors"
      :class="{'mb-6': (i === Object.keys(errors).length - 1 /* last element needs a margin bottom 6 */)}"
      class="flex">
      <div class="hidden md:block w-0 md:w-2/5">
        &nbsp;
      </div>
      <div class="w-full lg:w-3/5 px-3 error text-xs">
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
};
</script>
