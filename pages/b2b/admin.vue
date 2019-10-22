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
    <div class="flex flex-col">
      <div v-for="uploadedFile in files"
           :key="uploadedFile.id"
           class="sm:w-1/1 p-2">
        <hr />
        <h6>{{ uploadedFile.campaign_name }} ({{ uploadedFile.language_name }}) - {{ uploadedFile.quality }}p</h6>
        <p>{{ uploadedFile.campaign_start }} - {{ uploadedFile.campaign_end }} ({{ uploadedFile.hash }}, {{ uploadedFile.file_name }})</p>
        <p class="text-muted">
          Diese Date wurde bereits verarbeitet
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');

export default {
  name: 'AdminPage',
  middleware: [
    'auth',
    'customer',
  ],
  data() {
    return {
      file: '',
      files: [],
    };
  },
  mounted() {
    this.loadFiles();
  },
  methods: {
    ...mapGetters(['getUserId']),
    async loadFiles() {
      try {
        const userId = this.getUserId();
        const response = await this.$axios.get('/users/' + userId + '/media');
        if (response.status === 200) {
          this.files = response.data.media_list;
          // eslint-disable-next-line no-console
          console.log(this.files);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
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
          $this.$toast.error('An error occurred');
        });
    },
  },
};
</script>
