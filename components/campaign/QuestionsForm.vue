<template>
  <div>
    <div>SELECT LOCALE</div>
    <div v-if="questions.length"
         v-for="(question, i) in getByLocale(locale)"
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
          @input="setQuestionValue({id: question.id, property: 'value', value: $event})"
          @validate="validateQuestion({ id: question.id })"
          :label="$t('QUESTIONS.question')"
          :placeholder="$t('QUESTIONS.add')" />
        <answer-option-form :question="question" />
      </div>

      <div class="w-1/12 inline-block text-center flex justify-center flex-col mb-4">
        <v-icon @click.prevent="removeQuestionFromForm({ id: i })"
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
import AnswerOptionForm from '@/components/campaign/AnswerOptionForm';
import { TEXT, STARS, MULTIPLE_CHOICE, VALIDATION } from '@/domain/campaign/question';
import {
  CAMPAIGN_CREATE_STATES,
} from '@/store/forms/campaign/create';
import {
  TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS,
  TYPES_THAT_REQUIRE_NO_QUESTION,
  TYPES_THAT_REQUIRE_QUESTION,
} from '@/store/forms/questions';
import { LOCALES } from '@/domain/profile/locale';
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('forms/questions');

export default {
  name: 'QuestionsForm',
  components: { AnswerOptionForm },
  data() {
    return {
      locale: LOCALES.DEFAULT,
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
    questions() { return this.getQuestions(); },
    state() { return this.getState(); },
  },
  mounted() {
    this.setState(CAMPAIGN_CREATE_STATES.UNTOUCHED);
  },
  methods: {
    ...mapGetters([
      'getQuestions',
      'getByLocale',
      'getState',
    ]),
    ...mapMutations([
      'setState',
      'addQuestion',
      'removeQuestion',
      'setQuestion',
      'setQuestionValue',
    ]),
    ...mapActions([
      'validateQuestion',
    ]),
    setType(index, type) {
      const question = this.getQuestions()[index];
      if (TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS.includes(type) && question.answers.length === 0) {
        this.addAnswer({ questionId: question.id, locale: this.locale });
      }
      if (!TYPES_THAT_REQUIRE_MULTIPLE_ANSWERS.includes(type)) {
        this.setQuestionValue({ id: question.id, property: 'answers', value: [] });
      }
      if (TYPES_THAT_REQUIRE_NO_QUESTION.includes(type)) {
        this.setQuestionValue({ id: question.id, property: 'valid', value: true });
        this.setQuestionValue({ id: question.id, property: 'value', value: null });
        this.setQuestionValue({ id: question.id, property: 'errors', value: [] });
      }

      this.setQuestionValue({ id: question.id, property: 'type', value: type });
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
