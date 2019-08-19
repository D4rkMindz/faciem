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
      class="mb-6 flex">
      <div class="hidden lg:block lg:w-1/3">
        &nbsp;
      </div>
      <div class="w-full lg:w-2/3 text-center error">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
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
  },
  data: function () {
    return {
      touched: false,
      classes: '',
      errors: [],
      inputValue: this.value,
    };
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
      const result = new Promise(resolve => this.$emit('validate', resolve));
      result.then((errors) => {
        this.errors = errors;
        this.classes = this.errors.length === 0 ? 'ok' : 'error';
      });
    },
  },
};
</script>
