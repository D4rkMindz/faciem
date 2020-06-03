<template>
  <div>
    <div class="pr-5">
      <v-input id="name"
               :value="name"
               @input="setName($event)"
               @validate="validateName($event)"
               :errors="nameErrors"
               :label="$t('QUESTIONS.name')"
               :placeholder="$t('QUESTIONS.my-campaign')"
               class="mt-6" />

      <v-input id="description"
               :value="description"
               @input="setDescription($event)"
               @validate="validateDescription($event)"
               :errors="descriptionErrors"
               :label="$t('QUESTIONS.description')"
               :placeholder="$t('QUESTIONS.about')"
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
          :label="$t('QUESTIONS.question-type')"
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
          :label="$t('QUESTIONS.question')"
          :placeholder="$t('QUESTIONS.add')" />

        <div v-for="(answer, answerIndex) in question.answers">
          <addeable-input
            v-if="typesThatRequireMultipleAnswers.includes(question.type)"
            :key="answerIndex"
            @add="onAdd(i, answerIndex)"
            @remove="onRemove(i, answerIndex)"
            @validate="validateAnswer({ questionIndex: i, answerIndex: answerIndex })"
            :id="id('add')"
            :errors="answer.errors"
            :show-add="answerIndex === question.answers.length - 1"
            :show-remove="question.answers.length > 1"
            :show-correct="question.type === validation"
            :correct="answer.correct"
            :value="answer.value"
            @input="setAnswerValue({questionIndex: i, answerIndex: answerIndex, property: 'value', value: $event})"
            @correct="setAnswerValue({questionIndex: i, answerIndex: answerIndex, property: 'correct', value: $event})"
            :label="$t('ANSWER.answer')"
            :placeholder="$t('ANSWER.your-answer')" />
        </div>
      </div>

      <div class="w-1/12 inline-block text-center flex justify-center flex-col mb-4">
        <v-icon @click.prevent="removeQuestionFromForm({ questionIndex: i })"
                :class="{'icon-danger': questions.length > 1, 'icon-disabled': questions.length < 2}"
                class="cursor-pointer"
                name="trash-alt" />
      </div>
    </div>

    <div class="w-full mb-12">
      <div class="text-right m-4">
        <button @click="addQuestion()"
                class="button sm:w-1/1 md:w-1/3">
          {{ $t('QUESTIONS.add') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { TEXT, STARS, MULTIPLE_CHOICE, VALIDATION } from '@/domain/campaign/question';
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
      validation: VALIDATION,
      options: [
        { key: STARS, translation: this.$t('QUESTIONS.stars') },
        { key: MULTIPLE_CHOICE, translation: this.$t('QUESTIONS.multiple-choice') },
        { key: VALIDATION, translation: this.$t('QUESTIONS.validation') },
        { key: TEXT, translation: this.$t('QUESTIONS.text') },
      ],
      descriptions: {
        [STARS]: this.$t('QUESTIONS.stars-description'),
        [MULTIPLE_CHOICE]: this.$t('QUESTIONS.multiple-choice-description'),
        [VALIDATION]: this.$t('QUESTIONS.validation-description'),
        [TEXT]: this.$t('QUESTIONS.text-description'),
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
