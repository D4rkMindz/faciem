<template>
  <div v-if="value"
       class="flex flex-col mt-8">
    <p class="w-full mb-4 text">
      {{ value.text }}
    </p>
    <div class="w-full">
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
    validate(value) {
      // TODO validate
      this.emit();
    },
    setValue(index) {
      this.value.answers.forEach((a) => { a.value = false; });
      this.value.answers[index].value = true;
      this.value.valid = true;
      this.emit();
      const refId = this.value.id + '-answer-' + this.value.answers[index].id;
      this.$refs[refId][0].click();
    },
  },
};
</script>

<style>
  .hover:hover {
    cursor: pointer;
  }
</style>
