<template>
  <div v-if="answers && answers.length >= 1"
       class="flex flex-col md:flex-row mt-8">
    <div class="w-1/1 md:w-2/5 md:text-right pr-4 text">
      How would you rate the advertisement?
    </div>
    <div class="w-1/1 mt-4 md:w-3/5 md:mt-0">
      <v-stars v-model="answers[0].value" />
    </div>
    <div v-if="!answers[0].valid"
         v-for="error in answers[0].errors"
         class="w-1/1 error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { Answer } from '@/domain/campaign/answer';
import BaseAnswer from '@/components/campaign/answer/BaseAnswer';
export default {
  name: 'StarsAnswer',
  extends: BaseAnswer,
  data() {
    return {
      answers: this.value.answers,
    };
  },
  mounted() {
    if (!this.value.answers || this.value.answers.length === 0) {
      this.answers = [new Answer({ valid: true, value: 0 })];
    }
  },
};
</script>
