<template>
  <div class="container mx-auto">
    <h1 class="title">
      Create campaign
    </h1>
    <p>You can always create a campaign. A campaign consists of a video and a few questions. Three questions are free, any more will cost you. Please see our pricing model for further information.</p>
    <div class="form">
      <input id="file"
             ref="file"
             class="button"
             type="file"
             @change="handleFileUpload()" />
      <button class="button"
              @click="submitFile()">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddCapaignPage',
  middleware: [
    'auth',
    'customer',
  ],
  data() {
    return {
      file: '',
      files: [],
      all: [],
      filter: '',
    };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      const formData = new FormData();
      const $this = this;

      formData.append('video', this.file);
      formData.append('campaign_id', 1);
      formData.append('pricing_id', 1);
      formData.append('language', 'de-CH');
      formData.append('display_name', this.file.name);

      this.$axios.post('/media',
        formData,
        {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        }
      )
        .then(function () {
          $this.$toast.info('File uploaded and enqueued for processing. This may take some time');
          $this.$refs.file.value = null;
        })
        .catch(function (e) {
          if (e.response.status !== 401) {
            $this.$toast.error('An error occurred');
          }
        });
    },
  },
};
</script>

<style scoped>

</style>
