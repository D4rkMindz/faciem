<template>
  <div @click="select()"
       class="file-input">
    <div :class="css">
      <span v-if="value">Selected File: {{ value.name }}</span>
      <span v-else>Select File</span>
    </div>
    <input ref="file"
           @change="handleFileChange"
           type="file"
           class="hidden" />
  </div>
</template>

<script>

export default {
  name: 'FileInput',
  props: {
    value: File,
    css: {
      type: String,
      default: 'button',
    },
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    select() {
      this.$refs.file.click();
    },
    handleFileChange(e) {
      this.$emit('input', e.target.files[0]);
    },
  },
};
</script>
