<template>
  <div class="file-input"
       @click="select()">
    <div :class="css">
      <span v-if="value">Selected File: {{ value.name }}</span>
      <span v-else>Select File</span>
    </div>
    <input ref="file"
           type="file"
           class="hidden"
           @change="handleFileChange" />
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
