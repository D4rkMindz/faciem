<template>
  <div class="container mx-auto">
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
      all: [],
      filter: '',
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
          this.all = response.data.media_list;
          // eslint-disable-next-line no-console
          console.log(this.all);
          this.files = this.all;
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    search() {
      // eslint-disable-next-line no-console
      console.log('yolo');
      const $this = this;
      $this.files = this.all;
      if (this.filter) {
        const res = $this.files.filter((value) => {
          const escaped = $this.filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(escaped, 'i');
          const campaign = regex.test(value.campaign_name);
          const file = regex.test(value.file_name);
          const language = regex.test(value.language_name);
          const quality = regex.test(value.quality);

          return (campaign || file || language || quality);
        });

        this.files = res;
      }
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
