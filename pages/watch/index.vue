<template>
  <div class="container mx-auto">
    <div class="flex flex-col">
      <div class="flex-row w-1/1 text-center p-2">
        Title of the campaign
      </div>
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
            <h3>Loading ...</h3>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="!showPlayer && !source"
               class="text-center">
            <h3>Loading ...</h3>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="!showPlayer && source"
               class="sm:w-1/1 md:w-3/5 p-2 ml-auto mr-auto">
            {{ questionsState }}

            <div class="text-right">
              <button :disabled="nextIsDisabled"
                      :class="{'opacity-50 cursor-not-allowed': (nextIsDisabled === true)}"
                      @click="answer"
                      class="button">
                Send answers
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import NetworkSpeed from 'network-speed';
import { createNamespacedHelpers } from 'vuex';
import { SpeedLimits } from '~/domain/network/speed-limits';
import Player from '@/components/Player';
import { WATCH_STATE } from '@/store/watch/media';
import { QUESTIONS_STATE } from '@/store/watch/questions';
const questionsStore = createNamespacedHelpers('watch/questions');
const mediaStore = createNamespacedHelpers('watch/media');

export default {
  name: 'WatchPage',
  middleware: 'auth',
  components: { Player },
  data: () => {
    return {
      speed: 0,
      type: 'video/mp4',
      host: 'https://venovum.dev',
      hash: null,
      source: null,
      language: 'de',
      resolution: null,
      format: 'mp4', // TODO change format to webm for chrome (browserdetection)
      showPlayer: true,
      nextIsDisabled: true,
    };
  },
  computed: {
    mediaState() { return this.getState(); },
    questions() { return this.getQuestions(); },
    questionsState() { return this.getQuestionsState(); },
  },
  watch: {
    resolution() {
      if (this.mediaState === WATCH_STATE.LOADED && this.resolution) {
        this.setSource();
      }
    },
    source() {
      if (this.mediaState === WATCH_STATE.LOADED && this.questionsState === QUESTIONS_STATE.INITIAL) {
        // eslint-disable-next-line no-console
        console.log('loading questions for ', this.getMedia().campaign_id);
        this.getQuestionsForMedia(this.getMedia().campaign_id);
      }
    },
    mediaState() {
      if (this.mediaState === WATCH_STATE.LOADED && this.resolution) {
        this.setSource();
      }
      this.source = null;
    },
  },
  destroyed() {
    // eslint-disable-next-line no-console
    console.log('resetting');
    this.$store.commit('watch/questions/reset', null);
    this.$store.commit('watch/media/reset', null);
  },
  mounted() {
    this.loadNextMedia();
    this.testNetwork();
  },
  methods: {
    ...mediaStore.mapActions([
      'loadNextMedia',
    ]),
    ...mediaStore.mapGetters([
      'getMedia',
      'getState',
    ]),
    ...questionsStore.mapActions([
      'getQuestionsForMedia',
    ]),
    ...questionsStore.mapGetters([
      'getQuestions',
      'getQuestionsState',
    ]),
    answer() {
      if (this.questionsState === QUESTIONS_STATE.INITIAL) {
        return;
      }

      // eslint-disable-next-line no-console
      console.log('log');
    },
    async testNetwork() {
      const baseUrl = 'http://eu.httpbin.org/stream-bytes/500000';
      const fileSize = 500000;
      const testNetworkSpeed = new NetworkSpeed();
      const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSize);
      this.speed = speed;

      let resolution = 144;
      if (speed.kbps <= SpeedLimits.LOW) {
        resolution = 144;
      }
      if (speed.kbps > SpeedLimits.LOW && speed.kbps <= SpeedLimits.FWQVGA) {
        resolution = 240;
      }
      if (speed.kbps > SpeedLimits.FWQVGA && speed.kbps <= SpeedLimits.nHD) {
        resolution = 360;
      }
      if (speed.kbps > SpeedLimits.nHD && speed.kbps > SpeedLimits.FWVGA) {
        resolution = 480;
      }
      if (speed.kbps > SpeedLimits.FWVGA && speed.kbps <= SpeedLimits.HD) {
        resolution = 720;
      }
      if (speed.kbps > SpeedLimits.HD) {
        resolution = 1080;
      }

      this.resolution = resolution;
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
