<template>
  <div v-if="value"
       class="mt-8">
    <v-input :id="value.id"
             v-model="value.value"
             @input="emit()"
             @validate="validateText($event)"
             :errors="value.errors"
             :label="value.text"
             placeholder="Your answer" />
  </div>
</template>

<script>
import BaseAnswer from '@/components/campaign/answer/BaseAnswer';
export default {
  name: 'TextAnswer',
  extends: BaseAnswer,
  methods: {
    validateText(value) {
      const errors = [];
      if (!value) {
        errors.push('Please answer the question');
      }
      if (value.trim().length <= 2) {
        errors.push('Your answer must be longer than 3 characters');
      }
      if (value.trim().length >= 150) {
        errors.push('Your answer cannot be longer than 150 characters');
      }

      this.$set(this.value, 'errors', errors);
      this.$set(this.value, 'valid', errors.length === 0);
      this.emit();
    },
  },
};
</script>
