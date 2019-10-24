<template>
  <div class="container mx-auto">
    <div class="flex flex-col">
      <div class="flex-row w-1/1 text-center p-2">
        Title of the campaign
      </div>
      <div class="flex flex-col md:flex-row ">
        <div class="sm:w-1/1 md:w-3/5 p-2">
          <player :source="source"
                  :type="type" />
        </div>
        <div class="sm:w-1/1 md:w-2/5 p-2">
          <Input v-for="question in questions"
                 :id="question.id"
                 :key="question.id"
                 v-model="question.value"
                 :label="question.label"
                 :placeholder="question.placeholder" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NetworkSpeed from 'network-speed';
import { SpeedLimits } from '~/domain/network/speed-limits';
import Player from '~/components/Player';
import Input from '~/components/form/Input';

export default {
  name: 'WatchPage',
  middleware: 'auth',
  components: { Player, Input },
  data: () => {
    return {
      speed: 0,
      type: 'video/mp4',
      host: 'https://venovum.dev',
      hash: 'ffe05fb6-c5ea-4cf0-88fd-2461d8c29cb6',
      language: 'en-GB',
      resolution: 144,
      format: 'mp4', // TODO change format to webm for chrome (browserdetection)
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
    source() {
      const host = this.host;
      const file = this.hash;
      const lang = this.language;
      const format = this.format;
      const resolution = this.resolution;
      return `${host}/media/${file}/${lang}/${resolution}/${format}`;
      // https://venovum.dev/media/4dfb5192-7440-4bdc-8a8c-d3269eff07da/de/140/mp4
    },
  },
  mounted() {
    this.testNetwork();
  },
  methods: {
    async testNetwork() {
      const baseUrl = 'http://eu.httpbin.org/stream-bytes/500000';
      const fileSize = 500000;
      const testNetworkSpeed = new NetworkSpeed();
      const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSize);
      // eslint-disable-next-line no-console
      console.log(speed);
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
