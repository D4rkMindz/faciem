<template>
  <div class="container mx-auto">
    <div class="flex flex-col">
      <div class="flex flex-col">
        <transition name="fade">
          <div v-if="showPlayer && source"
               class="w-1/1 p-2">
            <player :source="source"
                    :type="type"
                    @ended="showPlayer = false" />
          </div>
        </transition>
        <transition name="fade">
          <div v-if="showPlayer && !source"
               class="text-center">
            <h3>{{ message }}</h3>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="!showPlayer && !source"
               class="text-center">
            <h3>{{ message }}</h3>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="!showPlayer && source"
               class="sm:w-1/1 md:w-3/5 p-2 ml-auto mr-auto">
            <AnswerForm />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import AnswerForm from '@/components/campaign/AnswerForm';
import { WATCH_STATE } from '@/store/watch/media';
import { QUESTIONS_STATE } from '@/store/watch/questions';
import { ResolutionEvaluator } from '@/domain/network/resolution-evaluator';
const questionsStore = createNamespacedHelpers('watch/questions');
const mediaStore = createNamespacedHelpers('watch/media');

export default {
  name: 'WatchPage',
  middleware: 'auth',
  components: {
    AnswerForm,
  },
  data: () => {
    return {
      maxTimeout: 5000,
      message: 'Loading ...',
      type: 'video/mp4',
      host: 'https://venovum.dev',
      hash: null,
      source: null,
      language: 'de',
      resolution: null,
      format: 'mp4', // TODO change format to webm for chrome (browserdetection)
      showPlayer: true,
    };
  },
  computed: {
    mediaState() { return this.getState(); },
    questions() { return this.getQuestions(); },
    questionsState() { return this.getQuestionsState(); },
  },
  watch: {
    resolution(n, o) {
      if (this.mediaState === WATCH_STATE.LOADED && this.resolution) {
        this.setSource();
      }
    },
    source() {
      if (this.mediaState === WATCH_STATE.LOADED && (this.questionsState === QUESTIONS_STATE.INITIAL || this.questionsState === QUESTIONS_STATE.ERROR)) {
        this.getQuestionsForMedia(this.getMedia().campaign_id);
      }
    },
    mediaState: {
      immediate: true,
      handler() {
        if (this.mediaState === WATCH_STATE.INITIAL) {
          this.next();
        }
        if (this.mediaState === WATCH_STATE.LOADED && this.resolution) {
          this.setSource();
        }
        if (this.mediaState === WATCH_STATE.ALL_WATCHED) {
          this.message = this.$t('ERRORS.all-campaigns-watched');
        }
        this.source = null;
      },
    },
    questionsState: {
      immediate: true,
      handler() {
        if (this.questionsState === QUESTIONS_STATE.SAVED) {
          this.reset();
        }
      },
    },
  },
  destroyed() {
    this.reset();
  },
  async mounted() {
    this.resolution = await new ResolutionEvaluator().getBestResolution();
  },
  methods: {
    ...mediaStore.mapActions([
      'loadNextMedia',
    ]),
    ...mediaStore.mapGetters([
      'getMedia',
      'getState',
    ]),
    ...mediaStore.mapMutations([
      'setState',
    ]),
    ...questionsStore.mapActions([
      'getQuestionsForMedia',
    ]),
    ...questionsStore.mapGetters([
      'getQuestions',
      'getQuestionsState',
    ]),
    async next() {
      this.loadNextMedia();
      this.resolution = await new ResolutionEvaluator().getBestResolution();
    },
    setSource() {
      if (this.source !== null) {
        return;
      }
      this.hash = this.getMedia().hash;

      const host = this.host;
      const file = this.hash;
      const lang = this.language;
      const format = this.format;
      const resolution = this.resolution;
      this.source = `${host}/media/${file}/${lang}/${resolution}/${format}`;
      this.showPlayer = true;
    },
    reset() {
      this.$store.commit('watch/questions/reset', null);
      this.$store.commit('watch/media/reset', null);
      this.source = null;
      this.resolution = null;
    },
  },
  head() {
    return {
      title: 'VENOVUM | ' + this.$t('HEAD.WATCH.title'),
    };
  },
};
</script>

<style>
  .fade-enter-active{
    transition: opacity 1.5s;
  }
  .fade-leave-active {
    opacity: 0;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
