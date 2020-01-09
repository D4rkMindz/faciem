<template>
  <div>
    <Select
      :options="options"
      v-model="value.type"
      label="Question Type"
      class="mt-6"
      nomargin />

    <div class="flex flex-wrap w-full">
      <div class="hidden lg:w-1/3 lg:inline-block">
      &nbsp;
      </div>

      <p class="w-full lg:w-2/3 inline-block text text-muted text-sm mb-6 px-3">
        {{ descriptions[value.type] }}
      </p>
    </div>

    <Input
      v-if="typesThatRequireQuestion.includes(value.type)"
      @validate="validateQuestion(value)"
      :id="id('question')"
      :errors="value.errors"
      v-model="value.value"
      label="Question"
      placeholder="Add a question" />

    <AddeableInput
      v-if="typesThatRequireMultipleAnswers.includes(value.type)"
      v-for="(answer, i) in value.answer"
      :key="i"
      @add="addAnswer()"
      @validate="validateAnswer(answer)"
      :id="id('add')"
      :errors="answer.errors"
      :show-add="!!answer.value"
      v-model="answer.value"
      label="Answer"
      placeholder="Your answer" />
  </div>
</template>

<script>
import AddeableInput from '@/components/form/AddeableInput';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import { Question, TEXT, STARS, MULTIPLE_CHOICE } from '@/domain/campaign/question';
import { Answer } from '@/domain/campaign/answer';

export default {
  name: 'QuestionForm',
  components: {
    AddeableInput,
    Input,
    Select,
  },
  model: {
    event: 'input',
  },
  props: {
    value: {
      type: Question,
      required: true,
    },
  },
  data() {
    return {
      typesThatRequireQuestion: [MULTIPLE_CHOICE, TEXT],
      typesThatRequireMultipleAnswers: [MULTIPLE_CHOICE],
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
    type() {
      return this.value.type;
    },
  },
  watch: {
    type() {
      if (!this.typesThatRequireQuestion.includes(this.type)) {
        this.value.answer = [];
        this.value.valid = true;
      } else {
        this.value.valid = !!this.value.value && this.value.errors.length === 0;
      }
    },
  },
  methods: {
    id(name) {
      return name + '-' + Math.round(Math.random() * 100);
    },
    addAnswer() {
      this.value.answer.push(new Answer());
    },
    validateQuestion(question) {
      question.errors = [];
      if (!question.value || question.value.trim().length < 3) {
        question.errors.push('Please enter at least a 3 characters long question');
      }
      question.valid = question.errors.length === 0;
    },
    validateAnswer(answer) {
      answer.errors = [];
      if (this.value.type !== STARS) {
        if (!answer.value || answer.value.trim().length < 1) {
          answer.errors.push('Please enter at least a one character long answer');
        }
      }
      answer.valid = answer.errors.length === 0;
    },
  },
};
</script>
