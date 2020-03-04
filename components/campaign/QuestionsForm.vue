<template>
  <div>
    <div class="pr-5">
      <v-input id="name"
               :value="name"
               @input="setName($event)"
               @validate="validateName($event)"
               :errors="nameErrors"
               label="Name"
               placeholder="My Campaign"
               class="mt-6" />

      <v-input id="description"
               :value="description"
               @input="setDescription($event)"
               @validate="validateDescription($event)"
               :errors="descriptionErrors"
               label="Description"
               placeholder="What is it all about?"
               class="mt-6" />
    </div>

    <div v-if="questions.length"
         v-for="(question, i) in questions"
         :key="question.id"
         class="w-full flex flex-wrap">
      <div class="w-11/12 inline-block p-4 mb-4">
        <v-select
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

        <v-input
          v-if="typesThatRequireQuestion.includes(question.type)"
          :id="id('question')"
          :errors="question.errors"
          :value="question.value"
          @input="setQuestionValue({questionIndex: i, property: 'value', value: $event})"
          @validate="validateQuestion({ questionIndex: i })"
          label="Question"
          placeholder="Add a question" />

        <addeable-input
          v-if="typesThatRequireMultipleAnswers.includes(question.type)"
          v-for="(answer, answerIndex) in question.answers"
          :key="answerIndex"
          @add="onAdd(i, answerIndex)"
          @remove="onRemove(i, answerIndex)"
          @validate="validateAnswer({ questionIndex: i, answerIndex: answerIndex })"
          :id="id('add')"
          :errors="answer.errors"
          :show-add="answerIndex === question.answers.length - 1"
          :show-remove="question.answers.length > 1"
          :value="answer.value"
          @input="setAnswerValue({questionIndex: i, answerIndex: answerIndex, property: 'value', value: $event})"
          label="Answer"
          placeholder="Your answer" />
      </div>

      <div class="w-1/12 inline-block text-center flex justify-center flex-col mb-4">
        <v-icon @click.prevent="removeQuestionFromForm({ questionIndex: i })"
                :class="{'icon-danger': questions.length > 1, 'icon-disabled': questions.length < 2}"
                name="trash-alt" />
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
import { TEXT, STARS, MULTIPLE_CHOICE } from '@/domain/campaign/question';
import {
  CAMPAIGN_CREATE_STATES,
  TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS, TYPES_THAT_REQUIRE_NO_QUESTION,
  TYPES_THAT_REQUIRE_QUESTION,
} from '@/store/forms/campaign/create';
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('forms/campaign/create');

export default {
  name: 'QuestionsForm',
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
    name() { return this.getName(); },
    nameErrors() { return this.getNameErrors(); },
    description() { return this.getDescription(); },
    descriptionErrors() { return this.getDescriptionErrors(); },
    questions() { return this.getQuestions(); },
    state() { return this.getState(); },
  },
  mounted() {
    this.setState(CAMPAIGN_CREATE_STATES.UNTOUCHED);
    this.setPricingId(1);
    this.setLanguage('de');
  },
  methods: {
    ...mapGetters([
      'getName',
      'getNameErrors',
      'getDescription',
      'getDescriptionErrors',
      'getQuestions',
      'getState',
    ]),
    ...mapMutations([
      'setName',
      'setDescription',
      'setLanguage',
      'setPricingId',
      'setCampaignId',
      'setState',
      'addQuestion',
      'removeQuestion',
      'setQuestion',
      'setQuestionValue',
      'addAnswer',
      'setAnswerValue',
      'removeAnswer',
    ]),
    ...mapActions([
      'validateQuestion',
      'validateAnswer',
      'validateName',
      'validateDescription',
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
      if (TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS.includes(type) && question.answers.length === 0) {
        this.addAnswer({ questionIndex: index });
      }
      if (!TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS.includes(type)) {
        this.setQuestionValue({ questionIndex: index, property: 'answers', value: [] });
      }
      if (TYPES_THAT_REQUIRE_NO_QUESTION.includes(type)) {
        this.setQuestionValue({ questionIndex: index, property: 'valid', value: true });
        this.setQuestionValue({ questionIndex: index, property: 'value', value: null });
        this.setQuestionValue({ questionIndex: index, property: 'errors', value: [] });
      }

      this.setQuestionValue({ questionIndex: index, property: 'type', value: type });
    },
    removeQuestionFromForm(id) {
      if (this.questions.length < 2) {
        return;
      }
      this.removeQuestion(id);
    },
    id(name) {
      return name + '-' + Math.round(Math.random() * 100);
    },
  },
};
</script>
