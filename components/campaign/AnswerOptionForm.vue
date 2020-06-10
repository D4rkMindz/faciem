<template>
  <div>
    <div v-for="(answer, answerIndex) in answers">
      <addeable-input
        v-if="typesThatRequireMultipleAnswers.includes(question.type)"
        :key="answer.id"
        @add="onAdd(answer)"
        @remove="onRemove(answer)"
        @validate="validateAnswers({ id: answer.id })"
        :id="id('add')"
        :errors="answer.errors"
        :show-add="answerIndex === question.answers.length - 1"
        :show-remove="question.answers.length > 1"
        :show-correct="question.type === validation"
        :correct="answer.correct"
        :value="answer.value"
        @input="setAnswerValue({id: answer.id, property: 'value', value: $event})"
        @correct="setAnswerValue({id: answer.id, property: 'correct', value: $event})"
        :label="$t('ANSWER.answer')"
        :placeholder="$t('ANSWER.your-answer')" />
    </div>
  </div>
</template>

<script>
import { TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS } from '@/store/forms/questions';
import { createNamespacedHelpers } from 'vuex';
import { Question, VALIDATION } from '@/domain/campaign/question';

const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('forms/answer-options');
export default {
  name: 'AnswerOptionForm',
  props: {
    question: {
      type: [Object, Question],
      required: true,
    },
  },
  data() {
    return {
      typesThatRequireMultipleAnswers: TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS,
      validation: VALIDATION,
    };
  },
  computed: {
    answers() {
      return this.getAnswersForQuestion()(this.question.id);
    },
  },
  methods: {
    ...mapActions(['validateAnswers']),
    ...mapMutations([
      'addAnswer',
      'removeAnswer',
      'setAnswerValue',
    ]),
    ...mapGetters([
      'getAnswersForQuestion',
    ]),
    onAdd(answer) {
      this.addAnswer({ id: this.question.id });
      this.validateAnswers({ id: answer.id });
    },
    onRemove(i, answerIndex) {
      this.removeAnswer({ questionIndex: i, answerIndex: answerIndex });
      if (answerIndex >= 1) {
        this.validateAnswer({ questionIndex: i, answerIndex: answerIndex - 1 });
      }
    },
  },
};
</script>
