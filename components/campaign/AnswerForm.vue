<template>
  <div class="my-12 w-4/5 md:w-2/3 mx-auto">
    <div v-for="(_, i) in questions"
         :key="i"
         class="my-4">
      <component :is="questions[i].type"
                 :value="questions[i]"
                 @input="setValue(i, $event)">
        <slot />
      </component>
    </div>
    <div class="text-right">
      <button :disabled="valid === false"
              :class="{'opacity-50 cursor-not-allowed': (valid === false)}"
              @click.prevent="answer"
              class="button">
        Send answers
      </button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import cloneDeep from 'lodash.clonedeep';
import { QUESTIONS_STATE } from '@/store/watch/questions';

const { mapGetters, mapMutations } = createNamespacedHelpers('watch/questions');
export default {
  name: 'AnswerForm',
  computed: {
    /**
     * Check if the form is valid
     * @return {Boolean}
     */
    valid() { return this.isValid(); },
    /**
     * Get all questions
     * @return {Question[]}
     */
    questions() { return this.getQuestions(); },
    questionsAvailable() { return this.getState() === QUESTIONS_STATE.LOADED; },
  },
  methods: {
    ...mapGetters([
      'getQuestions',
      'getState',
      'isValid',
    ]),
    ...mapMutations([
      'setQuestions',
    ]),
    answer() {
      if (!this.valid) {
        return;
      }
      // eslint-disable-next-line no-console
      console.log('answer');
    },
    setValue(key, value) {
      this.questions[key] = value;
      this.setQuestions(cloneDeep(this.questions));
    },
  },
};
</script>
