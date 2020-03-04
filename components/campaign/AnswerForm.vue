<template>
  <div class="my-12 w-4/5 md:w-2/3 mx-auto">
    <div v-for="(_, i) in questions"
         :key="i"
         class="my-4">
      <component :is="toComponent(questions[i].type)"
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
import StarsAnswer from '@/components/campaign/answer/StarsAnswer';
import MultipleChoiceAnswer from '@/components/campaign/answer/MultipleChoiceAnswer';
import TextAnswer from '@/components/campaign/answer/TextAnswer';

const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('watch/questions');
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
  },
  methods: {
    ...mapGetters([
      'getQuestions',
      'isValid',
    ]),
    ...mapMutations([
      'setQuestions',
    ]),
    ...mapActions([
      'saveQuestions',
    ]),
    answer() {
      if (!this.valid) {
        return;
      }

      this.saveQuestions();
    },
    /**
     * Set the value
     * @param key
     * @param value
     */
    setValue(key, value) {
      this.questions[key] = value;
      this.setQuestions(cloneDeep(this.questions));
    },
    /**
     * Convert the type to a component
     * @param type
     * @return {*}
     */
    toComponent(type) {
      const map = {
        stars: StarsAnswer.name,
        'multiple-choice': MultipleChoiceAnswer.name,
        text: TextAnswer.name,
      };
      return map[type.toLowerCase()];
    },
  },
};
</script>
