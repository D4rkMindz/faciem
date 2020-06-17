<template>
  <div>
    <div v-for="(answer, answerIndex) in answers">
      <addeable-input
        v-if="typesThatRequireMultipleAnswers.includes(question.type)"
        :key="answer.id"
        @add="onAdd(answer)"
        @remove="onRemove(answer)"
        @validate="validateAnswerOption(answer.id)"
        :id="id('add')"
        :errors="answer.errors"
        :show-add="answerIndex === answers.length - 1"
        :show-remove="answers.length > 1"
        :show-correct="question.type === validation"
        :correct="answer.correct"
        :value="answer.text"
        @input="setAnswerValue({id: answer.id, property: 'text', value: $event})"
        @correct="setAnswerValue({id: answer.id, property: 'correct', value: $event})"
        :label="$t('ANSWER.answer')"
        :placeholder="$t('ANSWER.your-answer')" />
    </div>
  </div>
</template>

<script>
import {
  TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS,
  TYPES_THAT_REQUIRE_NO_ANSWER_OPTIONS,
  TYPES_THAT_REQUIRE_QUESTION,
} from '@/store/forms/questions';
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
      let answers = this.getAnswersForQuestion()(this.question.id);
      if (answers.length < 1 && TYPES_THAT_REQUIRE_QUESTION.includes(this.question.type)) {
        this.addAnswer({ questionId: this.question.id, locale: this.locale });
        answers = this.getAnswersForQuestion()(this.question.id);
      }

      return answers;
    },
  },
  watch: {
    question: {
      deep: true,
      handler(question) {
        const answerCount = this.answers.length;
        if ((TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS.includes(question.type) || TYPES_THAT_REQUIRE_QUESTION.includes(question.type)) && answerCount < 1) {
          this.addAnswer({ questionId: question.id, locale: question.locale });
        }
        if (TYPES_THAT_REQUIRE_NO_ANSWER_OPTIONS.includes(question.type)) {
          this.answers.forEach((answer) => {
            this.removeAnswer(answer.id);
          });
        }
      },
    },
  },
  methods: {
    ...mapActions(['validateAnswerOption']),
    ...mapMutations([
      'addAnswer',
      'removeAnswer',
      'setAnswerValue',
    ]),
    ...mapGetters([
      'getAnswersForQuestion',
    ]),
    onAdd(answer) {
      this.addAnswer({ questionId: this.question.id, locale: this.question.locale });
      this.validateAnswerOption(answer.id);
    },
    onRemove(answer) {
      this.removeAnswer(answer.id);
      if (this.answers.length >= 1) {
        this.answers.forEach((a) => {
          this.validateAnswerOption(a.id);
        });
      }
    },
    id(name) {
      return name + '-' + Math.round(Math.random() * 100);
    },
  },
};
</script>
