<template>
  <div>
    <div class="lg:flex lg:items-center"
         :class="{'my-6': errors.length === 0, 'mt-6': errors.length !== 0}">
      <div class="lg:w-1/3">
        <label class="block text-gray-500 lg:text-right mb-1 lg:mb-0 pr-4"
               :for="id">
          {{ label }}
        </label>
      </div>

      <div class="lg:w-2/3">
        <input :id="id"
               ref="input"
               v-model="inputValue"
               :class="['input', classes]"
               :placeholder="placeholder"
               :type="type"
               @input="onInput"
               @blur="onBlur" />
      </div>
    </div>
    <div
      v-for="(error, i) in errors"
      :key="i"
      class="flex"
      :class="{'mb-6': (index === Object.keys(errors).length - 1)}">
      <div class="hidden lg:block lg:w-1/3">
        &nbsp;
      </div>
      <div class="w-full lg:w-2/3 text-center error text-xs">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
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
  model: {
    event: 'modified',
  },
  props: {
    id: {
      default: 'input',
      type: String,
      required: true,
    },
    value: {
      default: '',
      type: String,
      required: true,
    },
    label: {
      default: 'FORM INPUT',
      type: String,
      required: true,
    },
    type: {
      default: 'text',
      type: String,
      require: false,
    },
    validate: {
      default: () => [],
      type: Function,
      required: false,
    },
    placeholder: {
      default: '',
      type: String,
      required: false,
    },
    errors: {
      default: () => [],
      type: Array,
      required: false,
    },
  },
  data: function () {
    return {
      touched: false,
      classes: '',
      inputValue: this.value,
    };
  },
  watch: {
    errors: function () {
      this.classes = this.errors.length === 0 ? 'ok' : 'error';
    },
  },
  methods: {
    onBlur() {
      this.touched = true;
      this.emit();
    },
    onInput(event) {
      event.preventDefault();
      this.$emit('modified', this.inputValue);

      if (!this.touched) {
        this.classes = '';
        return;
      }
      this.emit();
    },
    emit() {
      this.$emit('validate', this.inputValue);
    },
  },
};
</script>
