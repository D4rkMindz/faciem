<template>
  <div v-if="value"
       class="flex flex-col md:flex-row mt-8">
    <p class="w-1/1 md:w-2/5 mb-4 md:mt-0 text md:text-right pr-4">
      {{ value.text }}
    </p>
    <div class="flex-col w-1/1 md:w-3/5">
      <div v-for="(answer, i) in value.answers"
           :key="i"
           @click.prevent="setValue(i)"
           class="hover py-3 md:py-0">
        <v-radio-input :name="value.id"
                       :ref="value.id + '-answer-' + answer.id"
                       :id="value.id + '-answer-'+ answer.id"
                       :label="answer.text"
                       :errors="answer.errors"
                       :selected="answer.value === true"
                       @validate="validate($event)" />
      </div>

      <div v-for="(error, i) in value.errors"
           :class="{'mb-6': (i === Object.keys(errors).length - 1 /* last element needs a margin bottom 6 */)}"
           class="flex">
        <div class="hidden md:block w-0 md:w-2/5">
          &nbsp;
        </div>
        <div class="w-full md:w-3/5 px-3 error text-xs">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseAnswer from '@/components/campaign/answer/BaseAnswer';
export default {
  name: 'MultipleChoiceAnswer',
  extends: BaseAnswer,
  methods: {
    validate(event) {
    },
    setValue(index) {
      const refId = this.value.id + '-answer-' + this.value.answers[index].id;
      this.$refs[refId][0].click();
      this.value.answers.forEach((a) => { a.value = false; });
      this.value.answers[index].value = true;
      this.emit();
    },
  },
};
</script>

<style>
  .hover:hover {
    cursor: pointer;
  }
</style>
