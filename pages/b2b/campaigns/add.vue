<template>
  <div class="container mx-auto">
    <h1 class="title">
      Create campaign
    </h1>
    <div class="flex flex-col-reverse md:flex-row">
      <div class="w-1/1 md:w-1/2 mx-3">
        <p>You can always create a campaign. A campaign consists of a video and a few questions. Three questions are free, any more will cost you. Please see our pricing model for further information.</p>
        <div class="form">
          <div class="sm:w-1/1 md:w-1/2">
            <FileInput v-model="file" />
          </div>

          <div class="w-1/1 text-right">
            <button @click="submitFile()"
                    class="button">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div class="w-1/1 md:w-1/2 mx-3">
        <Player v-if="file"
                :source="source" />
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
    };
  },
  computed: {
    source() {
      return URL.createObjectURL(this.file);
    },
  },
  watch: {
    file(value) {
      this.file = null;
      this.$nextTick(function () {
        this.file = value;
      });
    },
  },
  methods: {
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
