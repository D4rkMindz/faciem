<template>
  <div class="lg:flex lg:items-center my-6">
    <div class="lg:w-1/3">
      <label class="block text-gray-500 lg:text-right mb-1 lg:mb-0 pr-4"
             :for="id">
        {{ label }}
      </label>
    </div>

    <div class="lg:w-2/3">
      <input :id="id"
             :value="value"
             class="input"
             :type="type"
             @input="onInput" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    type: {
      default: 'text',
      type: String,
      require: false,
    },
    value: {
      default: '',
      type: String,
      required: true,
    },
    id: {
      default: 'input',
      type: String,
      required: true,
    },
    label: {
      default: 'FORM INPUT',
      type: String,
      required: true,
    },
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    }
    ,
  }
  ,
}
;
</script>

<style scoped>

</style>
