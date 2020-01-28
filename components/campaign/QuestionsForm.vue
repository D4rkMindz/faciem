<template>
  <div>
    <div v-if="questions.length"
         v-for="(question, i) in questions"
         :key="question.id"
         class="w-full flex flex-wrap">
      <div class="w-11/12 inline-block p-4 mb-4">
        <Select
          :options="options"
          :value="question.type"
          @input="setType(i, $event)"
          label="Question Type"
          class="mt-6"
          nomargin />

        <div class="flex flex-wrap w-full">
          <div class="hidden lg:w-1/3 lg:inline-block">
            &nbsp;
          </div>

          <p class="w-full lg:w-2/3 inline-block text text-muted text-sm mb-6 px-3">
            {{ descriptions[question.type] }}
          </p>
        </div>

        <Input
          v-if="typesThatRequireQuestion.includes(question.type)"
          :id="id('question')"
          :errors="question.errors"
          :value="question.value"
          @input="setQuestionValue(i, 'value', $event)"
          @validate="validateQuestion({ questionIndex: i })"
          label="Question"
          placeholder="Add a question" />

        <AddeableInput
          v-if="typesThatRequireMultipleAnswers.includes(question.type)"
          v-for="(answer, answerIndex) in question.answer"
          :key="answerIndex"
          @add="onAdd(i, answerIndex)"
          @remove="onRemove(i, answerIndex)"
          @validate="validateAnswer({ questionIndex: i, answerIndex: answerIndex })"
          :id="id('add')"
          :errors="answer.errors"
          :show-add="answerIndex === question.answer.length - 1"
          :show-remove="question.answer.length > 1"
          :value="answer.value"
          @input="setAnswerValue(i, answerIndex, 'value', $event)"
          label="Answer"
          placeholder="Your answer" />
      </div>

      <div v-if="questions.length > 1"
           class="w-1/12 inline-block text-center flex justify-center flex-col mb-4">
        <v-icon @click="removeQuestion({ questionIndex: i })"
                name="trash-alt"
                class="icon-danger" />
      </div>
    </div>

    <div class="w-full mb-12">
      <div class="text-right m-4">
        <button @click="addQuestion()"
                class="button sm:w-1/1 md:w-1/3">
          Add Question
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import cloneDeep from 'lodash.clonedeep';
import AddeableInput from '@/components/form/AddeableInput';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import { TEXT, STARS, MULTIPLE_CHOICE } from '@/domain/campaign/question';
import {
  STATES,
  TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS,
  TYPES_THAT_REQUIRE_QUESTION,
} from '@/store/forms/campaign/create';
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('forms/campaign/create');

export default {
  name: 'QuestionsForm',
  components: {
    AddeableInput,
    Input,
    Select,
  },
  data() {
    return {
      typesThatRequireQuestion: TYPES_THAT_REQUIRE_QUESTION,
      typesThatRequireMultipleAnswers: TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS,
      options: [
        { key: STARS, translation: 'Stars' },
        { key: MULTIPLE_CHOICE, translation: 'Multiple choice' },
        { key: TEXT, translation: 'Text' },
      ],
      descriptions: {
        [STARS]: 'Stars allow you to get user feedback about your video. With this option, the user can rate your video with stars. This is literally a must for every video.',
        [MULTIPLE_CHOICE]: 'A Multiple choice question allows the user to select one of many given answers. This is one of the best options.',
        [TEXT]: 'A Text offers the user to say something about your product. We strongly recommend you to not use this option.',
      },
    };
  },
  computed: {
    questions() { return this.getQuestions(); },
    state() { return this.getState(); },
  },
  watch: {
    state() {
      if (!this.state === STATES.INVALID) {
        return;
      }
      const $this = this;
      this.questions.forEach((question, i) => {
        const questionErrors = [];
        questionErrors.push(...$this.getError(question.id + '.value'));
        questionErrors.push(...$this.getError(question.id + '.type'));
        questionErrors.push(...$this.getError(question.id + '.language'));
        $this.setQuestionValue(i, 'errors', questionErrors);
        question.answer.forEach((answer, key) => {
          const answerErrors = [];
          answerErrors.push(...$this.getError(question.id + '.answer.' + key));
          $this.setAnswerValue(i, key, 'errors', answerErrors);
        });
      });
    },
  },
  mounted() {
    this.setState(STATES.UNTOUCHED);
    this.setPricingId(1);
    this.setLanguage('de');
  },
  methods: {
    ...mapGetters([
      'getQuestions',
      'getErrorForField',
      'getState',
    ]),
    ...mapMutations([
      'setLanguage',
      'setPricingId',
      'setCampaignId',
      'setState',
      'addQuestion',
      'removeQuestion',
      'setQuestion',
      'addAnswer',
      'removeAnswer',
    ]),
    ...mapActions([
      'validateQuestion',
      'validateAnswer',
    ]),
    onAdd(i, answerIndex) {
      this.addAnswer({ questionIndex: i });
      this.validateAnswer({ questionIndex: i, answerIndex: answerIndex });
    },
    onRemove(i, answerIndex) {
      this.removeAnswer({ questionIndex: i, answerIndex: answerIndex });
      if (answerIndex >= 1) {
        this.validateAnswer({ questionIndex: i, answerIndex: answerIndex - 1 });
      }
    },
    setType(index, type) {
      const question = this.getQuestions()[index];
      if (TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS.includes(type) && question.answer.length === 0) {
        this.addAnswer({ questionIndex: index });
      }
      if (!TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS.includes(type)) {
        this.setQuestionValue(index, 'answer', []);
      }

      this.setQuestionValue(index, 'type', type);
    },
    setQuestionValue(index, property, value) {
      // TODO move this hack into store
      const question = cloneDeep(this.getQuestions()[index]);
      question[property] = value;
      this.setQuestion({ questionIndex: index, question: question });
    },
    setAnswerValue(questionIndex, answerIndex, property, value) {
      const question = cloneDeep(this.getQuestions()[questionIndex]);
      question.answer[answerIndex][property] = value;
      this.setQuestion({ questionIndex: questionIndex, question: question });
    },
    id(name) {
      return name + '-' + Math.round(Math.random() * 100);
    },
    hasError(field) {
      return !!this.getError(field);
    },
    getError(field) {
      return this.getErrorForField()(field);
    },
  },
};
</script>
