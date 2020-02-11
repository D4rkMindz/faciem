<template>
  <div v-if="value"
       class="mt-8">
    <v-input :id="value.id"
             v-model="value.value"
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
      this.value.errors = [];
      if (!value) {
        this.value.errors.push('Please answer the question');
      }
      if (value.trim().length <= 2) {
        this.value.errors.push('Your answer must be longer than 3 characters');
      }
      if (value.trim().length >= 80) {
        this.value.errors.push('Your answer cannot be longer than 150 characters');
      }
    },
  },
};
</script>
