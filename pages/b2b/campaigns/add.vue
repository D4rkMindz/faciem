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
        </div>

        <div class="form">
          <div v-if="questions.length"
               v-for="(question, i) in questions"
               :key="question.id"
               class="w-full flex flex-wrap">
            <div class="w-11/12 inline-block p-4 mb-4">
              <QuestionForm :value="question" />
            </div>

            <div v-if="questions.length > 1"
                 class="w-1/12 inline-block text-center flex justify-center flex-col mb-4">
              <v-icon @click="removeQuestion(i)"
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

        <div class="w-1/1 text-right m-4">
          <button @click="submitFile()"
                  :class="{'loading': loading, 'disabled': !valid}"
                  :disabled="!valid"
                  class="button">
            Save
          </button>
        </div>
      </div>
      <div class="w-1/1 md:w-1/2 mx-3">
        <Player v-if="fileValid"
                :source="source"
                :type="'video/mp4'" />
        <p v-else-if="file && !fileValid"
           class="error">
          Please submit a correct file (.mp4 or .webm allowed)
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Question } from '@/domain/campaign/question';
import FileInput from '@/components/form/FileInput';
import Player from '@/components/Player';
import QuestionForm from '@/components/Campaign/QuestionForm';

export default {
  name: 'AddCapaignPage',
  middleware: [
    'auth',
    'customer',
  ],
  components: {
    FileInput,
    Player,
    QuestionForm,
  },
  data() {
    return {
      file: null,
      loading: false,
      valid: false,
      allowedFileTypes: ['video/mp4', 'video/webm'],
      questions: [new Question()],
    };
  },
  computed: {
    source() {
      if (!this.fileValid) {
        return null;
      }
      return URL.createObjectURL(this.file);
    },
    fileValid() {
      return this.file && this.allowedFileTypes.includes(this.file.type);
    },
  },
  watch: {
    questions: {
      handler() {
        this.valid = this.fileValid && this.isFormValid();
      },
      deep: true,
    },
    file() {
      this.valid = this.fileValid && this.isFormValid();
    },
  },
  methods: {
    async submitFile() {
      const formData = new FormData();

      formData.append('video', this.file);
      formData.append('campaign_id', 1);
      formData.append('pricing_id', 1);
      formData.append('language', 'de-CH');
      formData.append('display_name', this.file.name);
      this.loading = true;
      try {
        const response = await this.$axios.post('/media',
          formData,
          {
            headers: {
              'Content-Type': 'application/octet-stream',
            },
          }
        );
        if (response) {
          // eslint-disable-next-line no-console
          console.log(response);
        }
        this.loading = false;
        this.$toast.info('File uploaded and enqueued for processing. This may take some time');
        this.file = null;
      } catch (e) {
        this.$toast.error('An error occurred');
      }
    },
    addQuestion() {
      Vue.set(this.questions, this.questions.length, new Question());
    },
    removeQuestion(index) {
      this.questions.splice(index, 1);
      // eslint-disable-next-line no-console
      console.log(this.questions);
    },
    isFormValid() {
      let formValid = true;
      const BreakException = {};
      try {
        this.questions.forEach((q) => {
          if (!q.valid) {
            throw BreakException;
          }
          q.answer.forEach((a) => {
            if (!a.valid) {
              throw BreakException;
            }
          });
        });
      } catch (e) {
        formValid = false;
      }
      return formValid;
    },
  },
};
</script>
