<template>
  <div class="container mx-auto">
    <h1 class="title">
      Create campaign
    </h1>
    <div class="flex flex-col-reverse md:flex-row">
      <div class="w-1/1 md:w-1/2 mx-3">
        <p>You can always create a campaign. A campaign consists of a video and a few questions. Three questions are free, any more will cost you. Please see our pricing model for further information.</p>

        <div class="sm:w-1/1 m-4">
          <FileInput v-model="file" />

          <div v-if="!fileValid"
               class="text-center error text-xs">
            {{ fileError }}
          </div>
        </div>

        <div class="form">
          <QuestionsForm />
        </div>

        <div class="w-1/1 text-right m-4">
          <button @click="save()"
                  :class="{'loading': loading, 'disabled': !valid}"
                  :disabled="!valid"
                  class="button">
            Save
          </button>
        </div>
      </div>
      <div class="w-1/1 md:w-1/2 mx-3">
        <Player v-if="file && fileValid"
                :source="source"
                :type="'video/mp4'" />
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import FileInput from '@/components/form/FileInput';
import Player from '@/components/Player';
import { ALLOWED_FILE_TYPES } from '@/domain/file/allowed-file-types';
import QuestionsForm from '@/components/campaign/QuestionsForm';
const { mapGetters, mapActions } = createNamespacedHelpers('forms/campaign/create');
export default {
  name: 'AddCapaignPage',
  middleware: [
    'auth',
    'customer',
  ],
  components: {
    FileInput,
    Player,
    QuestionsForm,
  },
  data() {
    return {
      file: null,
      fileValid: false,
      fileError: '',
      loading: false,
    };
  },
  computed: {
    valid() {
      return this.isValid() && this.fileValid;
    },
    source() {
      if (this.file) {
        return URL.createObjectURL(this.file);
      }

      return null;
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
    ]),
    ...mapActions([
      'saveForm',
    ]),
    save() {
      this.saveForm();
    //   const formData = new FormData();
    //
    //   // formData.append('video', this.file);
    //   formData.append('campaign_id', id);
    //   formData.append('pricing_id', 1);
    //   formData.append('language', 'de-CH');
    //   formData.append('display_name', this.file.name);
    //   formData.append('questions', JSON.stringify(this.questions));
    //   const data = {
    //     pricing_id: 1,
    //     language: 'de-CH',
    //     display_name: this.file.name,
    //   };
    //   this.loading = true;
    //   const url = `/users/${this.getUserId()}/campaigns`;
    //   try {
    //     const response = await this.$axios.post(
    //       url,
    //       formData,
    //       {
    //         headers: {
    //           'Content-Type': 'application/octet-stream',
    //         },
    //       }
    //     );
    //     if (response) {
    //       // eslint-disable-next-line no-console
    //       console.log(response);
    //     }
    //     this.loading = false;
    //     this.$toast.info('File uploaded and enqueued for processing. This may take some time');
    //     // TODO upload file to server
    //     // this.file = null;
    //   } catch (e) {
    //     this.$toast.error('An error occurred');
    //   }
    },
    // addQuestion() {
    //   Vue.set(this.questions, this.questions.length, new Question());
    // },
    // removeQuestion(index) {
    //   this.questions.splice(index, 1);
    //   // eslint-disable-next-line no-console
    //   console.log(this.questions);
    // },
    // isFormValid() {
    //   let formValid = true;
    //   const BreakException = {};
    //   try {
    //     this.questions.forEach((q) => {
    //       if (!q.valid) {
    //         throw BreakException;
    //       }
    //       q.answer.forEach((a) => {
    //         if (!a.valid) {
    //           throw BreakException;
    //         }
    //       });
    //     });
    //   } catch (e) {
    //     formValid = false;
    //   }
    //   return formValid;
    // },
  },
};
</script>
