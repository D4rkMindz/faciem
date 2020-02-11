<template>
  <div class="my-12 w-4/5 md:w-2/3 mx-auto">
    <div v-for="(_, i) in questions"
         :key="i"
         class="my-4">
      <component :is="questions[i].type"
                 v-model="questions[i]">
        <slot />
      </component>
    </div>
    <div class="text-right">
      <button :disabled="nextIsDisabled"
              :class="{'opacity-50 cursor-not-allowed': (nextIsDisabled === true)}"
              @click.prevent="answer"
              class="button">
        Send answers
      </button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { QUESTIONS_STATE } from '@/store/watch/questions';

const questions = createNamespacedHelpers('watch/questions');
export default {
  name: 'AnswerForm',
  data() {
    return {
      nextIsDisabled: true,
    };
  },
  computed: {
    /**
     * Get all questions
     * @return {Question[]}
     */
    questions() { return this.getQuestions(); },
    questionsAvailable() { return this.getState() === QUESTIONS_STATE.LOADED; },
  },
  methods: {
    ...questions.mapGetters([
      'getQuestions',
      'getState',
    ]),
    answer() {
      if (QUESTIONS_STATE.ERROR) {
        return;
      }
      // eslint-disable-next-line no-console
      console.log('answer');
    },
  },
};
</script>
