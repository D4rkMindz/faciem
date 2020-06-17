<template>
  <div>
    <div class="w-full">
      <v-select
        :options="availableLocales"
        v-model="locale"
        :label="$t('QUESTIONS.locale')"
        class="mt-6" />
    </div>

    <div class="flex flex-row w-full mt-2 px-2">
      <file-input :title="$t('FILEINPUT.select-file')"
                  v-model="mediaFile.file"
                  class="w-full" />

      <div v-if="!mediaFile.valid"
           class="text-center error text-xs">
        {{ fileError }}
      </div>
    </div>

    <div class="flex flex-row w-full min-h-player my-3 bg-gray-800 text-white rounded-md justify-center items-center">
      <player v-if="mediaFile.file && mediaFile.valid"
              :source="source"
              :type="'video/mp4'" />
      <div v-else
           class="flex justify-center items-center text-center">
        {{ $t('ERRORS.no-file-selected') }}
      </div>
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
          :value="question.text"
          @input="setQuestionValue({id: question.id, property: 'text', value: $event})"
          @validate="validateQuestion(question.id)"
          :label="$t('QUESTIONS.question')"
          :placeholder="$t('QUESTIONS.add')"
          class="w-full" />
        <answer-option-form :question="question" />
      </div>

      <div class="w-1/12 inline-block text-center flex justify-center flex-col mb-4">
        <v-icon @click.prevent="removeQuestionFromForm({ id: question.id })"
                :class="{'icon-danger': questions.length > 1, 'icon-disabled': questions.length < 2}"
                class="cursor-pointer"
                name="trash-alt" />
      </div>
    </div>

    <div class="w-full mb-12">
      <div class="text-right m-4">
        <button @click="addQuestion(locale)"
                class="button">
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
import { MediaFile } from '@/domain/file/MediaFile';
import { ALLOWED_FILE_TYPES } from '@/domain/file/allowed-file-types';
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('forms/questions');

export default {
  name: 'QuestionsForm',
  components: { AnswerOptionForm },
  props: {
    initialLocale: {
      type: String,
      required: true,
    },
    locales: {
      type: Array,
      required: true,
    },
    usedLocales: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      locale: this.initialLocale,
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
      mediaFile: new MediaFile(null, LOCALES.DEFAULT),
      fileError: null,
    };
  },
  computed: {
    availableLocales() {
      const locales = this.locales.filter(l => !this.usedLocales.includes(l.key));
      const currentLocaleIndex = this.locales.map(l => l.key).indexOf(this.locale);
      const currentLocale = this.locales[currentLocaleIndex];
      locales.push(currentLocale);

      return locales;
    },

    questions() { return this.getByLocale()(this.locale); },
    state() { return this.getState(); },
    source() {
      if (this.mediaFile.file) {
        return URL.createObjectURL(this.mediaFile.file);
      }
      return null;
    },
  },
  watch: {
    locale() {
      this.$emit('locale', this.locale);
    },
    mediaFile: {
      deep: true,
      handler() {
        let valid = true;
        if (!this.mediaFile.file || !ALLOWED_FILE_TYPES.includes(this.mediaFile.file.type)) {
          this.fileError = this.$t('ERRORS.invalid-filetype');
          valid = false;
        }
        this.mediaFile.valid = valid;

        this.$emit('media', this.mediaFile);
      },
    },
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
      'setQuestion',
      'setQuestionValue',
    ]),
    ...mapActions([
      'validateQuestion',
      'changeQuestionType',
      'removeQuestionAndAssociatedAnswerOptions',
    ]),
    setType(index, type) {
      const question = this.questions[index];
      if (TYPES_THAT_REQUIRE_NO_QUESTION.includes(type)) {
        this.setQuestionValue({ id: question.id, property: 'valid', value: true });
        this.setQuestionValue({ id: question.id, property: 'text', value: null });
        this.setQuestionValue({ id: question.id, property: 'errors', value: [] });
      }

      // TODO continue here by validating if there are any loose answers (not related to any question, wrong question type)
      this.changeQuestionType({ id: question.id, type: type });
    },
    removeQuestionFromForm(id) {
      if (this.questions.length < 2) {
        return;
      }
      this.removeQuestionAndAssociatedAnswerOptions(id);
    },
    id(name) {
      return name + '-' + Math.round(Math.random() * 100);
    },
  },
};
</script>

<style>
.min-h-player {
  min-height: 20vh;
  height: auto;
}
</style>
