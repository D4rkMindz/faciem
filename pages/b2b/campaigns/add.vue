<template>
  <div class="container mx-auto">
    <h1 class="title">
      {{ $t('CAMPAIGN.create') }}
    </h1>
    <p class="text-sm font-">
      {{ $t('CAMPAIGN.create-description') }}
    </p>
    <div class="flex flex-col w-2/3 mx-auto mb-3">
      <v-input id="name"
               :value="name"
               @input="setName($event)"
               @validate="validateName($event)"
               :errors="nameErrors"
               :label="$t('QUESTIONS.name')"
               :placeholder="$t('QUESTIONS.my-campaign')" />

      <v-input id="description"
               :value="description"
               @input="setDescription($event)"
               @validate="validateDescription($event)"
               :errors="descriptionErrors"
               :label="$t('QUESTIONS.description')"
               :placeholder="$t('QUESTIONS.about')" />
    </div>

    <div class="w-full text-right m-4">
      <button @click="addQuestionForm()"
              :class="{'disabled': availableLocales.length < 1}"
              class="button">
        {{ $t('QUESTIONS.add-form') }}
      </button>
    </div>

    <div class="flex flex-row flex-wrap">
      <!-- TODO increase the number of lg:w-1/2 to lg:w-1/3 in the next div when more languages are added-->
      <div v-for="(questionForm, i) in questionForms"
           class="w-full lg:w-1/2 mb-5">
        <div class="bg-gray-100 rounded-md shadow-md mx-3 p-4">
          <div class="mt-2">
            <QuestionsForm
              :key="i"
              :locales="locales"
              :used-locales="usedLocales"
              :initial-locale="questionForm.locale"
              @locale="questionForm.locale = $event"
              @media="questionForm.mediaFile = $event" />
            <button @click="removeQuestionForm(i)"
                    class="button">
              {{ $t('QUESTIONS.remove-form') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="w-1/1 text-right m-4">
      <button @click="save()"
              :class="{'loading': saving, 'disabled': !valid}"
              :disabled="!valid || saving"
              class="button">
        {{ $t('FORM.save') }}
      </button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import QuestionsForm from '@/components/campaign/QuestionsForm';
import { LOCALES } from '@/domain/profile/locale';
import { MediaFile } from '@/domain/file/MediaFile';
const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('forms/campaign/create');
const questionsStore = createNamespacedHelpers('forms/questions');
const answerOptionsStore = createNamespacedHelpers('forms/answer-options');
const videosStore = createNamespacedHelpers('forms/media/video');
export default {
  name: 'AddCapaignPage',
  middleware: [
    'auth',
    'campaign/create',
  ],
  components: {
    QuestionsForm,
  },
  data() {
    return {
      saving: false,
      locales: [
        { key: LOCALES.DE, translation: 'Deutsch' },
        { key: LOCALES.EN, translation: 'English' },
      ],
      questionForms: [{ locale: LOCALES.DEFAULT, mediaFile: new MediaFile(null, LOCALES.DEFAULT) }],
    };
  },
  computed: {
    usedLocales() { return this.questionForms.map(f => f.locale); },
    availableLocales() { return this.locales.filter(l => !this.usedLocales.includes(l.key)); },
    name() { return this.getName(); },
    nameErrors() { return this.getNameErrors(); },
    description() { return this.getDescription(); },
    descriptionErrors() { return this.getDescriptionErrors(); },
    valid() {
      return this.isValid();
    },
  },
  methods: {
    ...mapGetters([
      'isValid',
      'getState',
      'getName',
      'getNameErrors',
      'getDescription',
      'getDescriptionErrors',
      'getCampaignId',
    ]),
    ...mapMutations([
      'setName',
      'setDescription',
    ]),
    ...mapActions([
      'saveCampaign',
      'validateName',
      'validateDescription',
    ]),
    ...questionsStore.mapGetters(['getByLocale']),
    ...questionsStore.mapActions(['saveQuestions', 'removeQuestionAndAssociatedAnswerOptions']),
    ...answerOptionsStore.mapActions(['saveAnswerOptions']),
    ...videosStore.mapActions(['saveVideoFiles']),
    async save() {
      this.saving = true;
      await this.saveCampaign();
      if (this.getCampaignId()) {
        await this.saveQuestions(this.getCampaignId());
        await this.saveAnswerOptions();
        const videoFiles = this.questionForms.map(f => f.mediaFile);
        await this.saveVideoFiles(videoFiles);
      }
      this.saving = false;
    },
    addQuestionForm() {
      const locale = this.availableLocales[0].key;
      this.questionForms.push({ locale: locale, mediaFile: new MediaFile(null, locale) });
    },
    removeQuestionForm(index) {
      const form = this.questionForms[index];
      const locale = form.locale;
      this.getByLocale(locale).forEach((q) => {
        this.removeQuestionAndAssociatedAnswerOptions(q.id);
      });
      this.questionForms.splice(index, 1);
    },
  },
  head() {
    return {
      title: 'VENOVUM | ' + this.$t('HEAD.CAMPAIGNS-ADD.title'),
    };
  },
};
</script>
