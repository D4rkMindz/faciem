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
        errors.push(this.$t('ERRORS.answer-the-question'));
      }
      if (value.trim().length <= 2) {
        errors.push(this.$t('ERRORS.minimum-length', { field: this.$t('ERRORS.generic-field'), minimum: 3 }));
      }
      if (value.trim().length >= 150) {
        errors.push(this.$t('ERRORS.maximum-length', { field: this.$t('ERRORS.generic-field'), maximum: 150 }));
      }

      this.$set(this.value, 'errors', errors);
      this.$set(this.value, 'valid', errors.length === 0);
      this.emit();
    },
  },
};
</script>
