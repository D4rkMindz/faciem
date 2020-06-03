<template>
  <div v-if="value"
       class="flex flex-col md:flex-row mt-8">
    <div class="w-1/1 md:w-2/5 md:text-right pr-4 text">
      {{ $t('ANSWER.STARS.how-would-you-rate') }}
    </div>
    <div class="w-1/1 mt-4 md:w-3/5 md:mt-0">
      <v-stars v-model="value.value"
               @validate="validate"
               @input="emit()" />
    </div>
    <div v-if="!value.valid"
         v-for="error in value.errors"
         class="w-1/1 error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import BaseAnswer from '@/components/campaign/answer/BaseAnswer';
export default {
  name: 'StarsAnswer',
  extends: BaseAnswer,
  mounted() {
    if (!this.value.value) {
      this.value.value = 0;
      this.value.valid = false;
    }
  },
  methods: {
    validate(value) {
      const errors = [];
      if (value > 5 || value <= 0) {
        errors.push(this.$t('ERRORS.stars'));
      }

      this.value.errors = errors;
      this.value.valid = errors.length === 0;
      this.emit();
    },
  },
};
</script>
