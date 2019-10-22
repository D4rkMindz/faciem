<template>
  <div class="container mx-auto">
    <H1>Media upload</H1>
    <label>File
      <input id="file"
             ref="file"
             type="file"
             @change="handleFileUpload()" />
    </label>
    <button class="button"
            @click="submitFile()">
      Submit
    </button>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  middleware: [
    'auth',
    'customer',
  ],
  data() {
    return {
      file: '',
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

      this.$axios.post('/media/upload',
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
        .catch(function () {
          $this.$toast.error('An error occurred');
        });
    },
  },
};
</script>
