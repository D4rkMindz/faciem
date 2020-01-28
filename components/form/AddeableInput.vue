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

      <div :class="{
        'lg:w-6/12': showAdd === true && showRemove === true,
        'lg:w-7/12': (showAdd === false && showRemove === true) || (showAdd === true && showRemove === false),
        'lg:w-8/12': showAdd === false && showRemove === false,
      }">
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

      <div @click="onAdd()"
           :class="{'hidden': !showAdd}"
           class="lg:w-1/12 text-center">
        <v-icon name="plus" />
      </div>

      <div @click="onRemove()"
           :class="{'hidden': !showRemove}"
           class="lg:w-1/12 text-center">
        <v-icon
          name="trash-alt"
          class="icon-danger" />
      </div>
    </div>

    <div
      v-for="(error, i) in errors"
      :key="i"
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
    type: {
      default: 'text',
      type: String,
      require: false,
    },
    placeholder: {
      default: '',
      type: String,
      required: false,
    },
    showAdd: {
      default: true,
      type: Boolean,
      required: false,
    },
    showRemove: {
      default: true,
      type: Boolean,
      required: false,
    },
  },
  methods: {
    onAdd() {
      this.$emit('add');
    },
    onRemove() {
      this.$emit('remove');
    },
  },
};
</script>
