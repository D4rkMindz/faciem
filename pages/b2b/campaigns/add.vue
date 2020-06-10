<template>
  <div class="container mx-auto">
    <h1 class="title">
      {{ $t('CAMPAIGN.create') }}
    </h1>
    <p class="text-sm font-">
      {{ $t('CAMPAIGN.create-description') }}
    </p>
    <div class="flex flex-col-reverse md:flex-row bg-gray-100 rounded-md shadow-md">
      <div class="w-1/1 md:w-1/2 mx-3">
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
        <div class="sm:w-1/1 m-4">
          <file-input v-model="file" />

          <div v-if="!fileValid"
               class="text-center error text-xs">
            {{ fileError }}
          </div>
        </div>

        <div class="form mt-12">
          <QuestionsForm />
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
      <div v-if="!saved"
           class="w-1/1 md:w-1/2 mx-3">
        <player v-if="file && fileValid"
                :source="source"
                :type="'video/mp4'" />
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { ALLOWED_FILE_TYPES } from '@/domain/file/allowed-file-types';
import QuestionsForm from '@/components/campaign/QuestionsForm';
import { CAMPAIGN_CREATE_STATES } from '@/store/forms/campaign/create';
const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('forms/campaign/create');
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
      file: null,
      fileValid: false,
      fileError: '',
    };
  },
  computed: {
    name() { return this.getName(); },
    nameErrors() { return this.getNameErrors(); },
    description() { return this.getDescription(); },
    descriptionErrors() { return this.getDescriptionErrors(); },
    valid() {
      return this.isValid() && this.fileValid;
    },
    source() {
      if (this.file) {
        return URL.createObjectURL(this.file);
      }

      return null;
    },
    saving() {
      return this.getState() === CAMPAIGN_CREATE_STATES.SAVING;
    },
    saved() {
      return this.getState() === CAMPAIGN_CREATE_STATES.SAVED;
    },
  },
  watch: {
    file() {
      this.fileValid = true;

      if (!this.file || !ALLOWED_FILE_TYPES.includes(this.file.type)) {
        this.fileError = 'Please use only allowed file types (.mp4, .webm)';
        this.fileValid = false;
      }
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
    ]),
    ...mapMutations([
      'setName',
      'setDescription',
    ]),
    ...mapActions([
      'saveForm',
    ]),
    save() {
      this.saveForm({ file: this.file });
    },
  },
  head() {
    return {
      title: 'VENOVUM | ' + this.$t('HEAD.CAMPAIGNS-ADD.title'),
    };
  },
};
</script>
