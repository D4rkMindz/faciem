<template>
  <div class="container mx-auto">
    <h1 class="title">
      Create campaign
    </h1>
    <div class="flex flex-col-reverse md:flex-row">
      <div class="w-1/1 md:w-1/2 mx-3">
        <p>You can always create a campaign. A campaign consists of a video and a few questions. Three questions are free, any more will cost you. Please see our pricing model for further information.</p>
        <div class="form">
          <div class="my-12">
            <div v-for="question in questions"
                 class="w-1/1 m-4">
              <Select :options="options"
                      v-model="question.type"
                      label="Question Type" />
              <Input @validate="validateQuestion(question)"
                     :errors="question.errors"
                     v-model="question.value"
                     label="Question"
                     placeholder="Add a question" />
            </div>

            <div class="w-1/1 text-right m-4">
              <button @click="addQuestion()"
                      class="button sm:w-1/1 md:w-1/3">
                Add Question
              </button>
            </div>
          </div>

          <div class="sm:w-1/1 md:w-2/3 m-4">
            <FileInput v-model="file" />
          </div>
          <div class="w-1/1 text-right m-4">
            <button @click="submitFile()"
                    :class="{'loading': loading, 'disabled': !formValid}"
                    :disabled="!formValid"
                    class="button">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div class="w-1/1 md:w-1/2 mx-3">
        <Player v-if="fileValid"
                :source="source"
                :type="file.type" />
        <p v-else-if="file && !fileValid"
           class="error">
          Please submit a correct file (.mp4 or .webm allowed)
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import FileInput from '@/components/form/FileInput';
import Input from '@/components/form/Input';
import Player from '@/components/Player';
import Select from '@/components/form/Select';

export default {
  name: 'AddCapaignPage',
  middleware: [
    'auth',
    'customer',
  ],
  components: {
    Input,
    FileInput,
    Player,
    Select,
  },
  data() {
    return {
      file: null,
      loading: false,
      options: ['Question', 'Approval'],
      allowedFileTypes: ['video/mp4', 'video/webm'],
      questions: [
      ],
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
    formValid() {
      return this.fileValid;
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
    validateQuestion(question) {
      question.errors = [];
      if (question.value.trim().length <= 3) {
        question.errors.push('Please enter at least a 3 characters long question');
      }
    },
    addQuestion() {
      this.questions.push(
        { value: '', language: 'en-US', errors: [], type: 'question' },
      );
    },
  },
};
</script>
