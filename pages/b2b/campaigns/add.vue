<template>
  <div class="container mx-auto">
    <h1 class="title">
      Create campaign
    </h1>
    <div class="flex flex-col-reverse md:flex-row">
      <div class="w-1/1 md:w-1/2 mx-3">
        <p>You can always create a campaign. A campaign consists of a video and a few questions. Three questions are free, any more will cost you. Please see our pricing model for further information.</p>
        <div class="form">
          <div class="sm:w-1/1 md:w-2/3">
            <FileInput v-model="file" />
          </div>

          <div class="w-1/1 text-right">
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
import Player from '@/components/Player';

export default {
  name: 'AddCapaignPage',
  middleware: [
    'auth',
    'customer',
  ],
  components: {
    FileInput,
    Player,
  },
  data() {
    return {
      file: null,
      loading: false,
      allowedFileTypes: ['video/mp4', 'video/webm'],
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
      debugger;
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
        this.$refs.file.value = null;
      } catch (e) {
        if (e.response.status !== 401) {
          this.$toast.error('An error occurred');
        }
      }
    },
  },
};
</script>

<style scoped>

</style>
