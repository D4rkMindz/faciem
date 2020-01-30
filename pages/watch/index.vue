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
          <div v-if="!showPlayer && !source"
               class="text-center">
            <h3>Loading ...</h3>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="!showPlayer && source"
               class="sm:w-1/1 md:w-3/5 p-2 ml-auto mr-auto">
            <Input v-for="question in questions"
                   :id="question.id"
                   :key="question.id"
                   v-model="question.value"
                   :label="question.label"
                   :placeholder="question.placeholder" />

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
import Input from '@/components/form/Input';
import { WATCH_STATE } from '@/store/watch/media';
const mediaStore = createNamespacedHelpers('watch/media');
// const questionsStore = createNamespacedHelpers('watch/questoins');

export default {
  name: 'WatchPage',
  middleware: 'auth',
  components: { Player, Input },
  data: () => {
    return {
      speed: 0,
      type: 'video/mp4',
      host: 'https://venovum.dev',
      hash: null,
      source: null,
      language: 'de',
      resolution: 144,
      format: 'mp4', // TODO change format to webm for chrome (browserdetection)
      showPlayer: true,
      nextIsDisabled: true,
      questions: [{
        id: 'q1',
        type: 'input',
        label: 'Question 1',
        placeholder: 'Type something here',
        required: true,
        value: '',
      }, {
        id: 'q2',
        type: 'input',
        label: 'Question 2',
        placeholder: 'Type something here',
        required: true,
        value: '',
      }, {
        id: 'q3',
        type: 'input',
        label: 'Question 3',
        placeholder: 'Type something here',
        required: true,
        value: '',
      }],
    };
  },
  computed: {
    mediaState() { return this.getState(); },
  },
  watch: {
    mediaState() {
      if (this.mediaState === WATCH_STATE.LOADED) {
        this.hash = this.getMedia().hash;

        const host = this.host;
        const file = this.hash;
        const lang = this.language;
        const format = this.format;
        const resolution = this.resolution;
        this.source = `${host}/media/${file}/${lang}/${resolution}/${format}`;
        this.showPlayer = true;
        return;
      }
      this.source = null;
    },
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
    answer() {

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
