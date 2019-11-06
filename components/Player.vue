<template>
  <div class="player">
    <video ref="video"
           class="video-js vjs-big-play-centered" />
  </div>
</template>

<script>
import videojs from 'video.js';

export default {
  name: 'Player',
  props: {
    source: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      player: null,
      options: {
        autoplay: true,
        controls: true,
        loadingSpinner: false,
        fluid: true,
        sources: [
          {
            src: this.source,
            type: this.type,
          },
        ],
        controlBar: {
          children: {
            PlayToggle: {
              replay: false,
            },
            VolumePanel: true,
            RemainingTimeDisplay: true,
            FullscreenToggle: true,
          },
        },
      },
    };
  },
  mounted() {
    this.setup();
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    setup() {
      this.player = videojs(this.$refs.video, this.options, function () {
        videojs.log('Ready');
        this.play();
        // todo add play button component that plays and pauses the video.
      });
      this.player.on('play', function () {
      });
      this.player.on('ended', function () {
        this.controlBar.dispose();
        this.bigPlayButton.dispose();
        // eslint-disable-next-line no-console
        console.log('ended');
      });
    },
  },
};
</script>

<style scoped>
  .player {
    width: 100%;
    height: 100%;
    background-color: #efefef;
    background-image: url('/img/loading.svg');
    background-position: center;
    background-repeat:no-repeat;
    background-size: 5rem;
    border-radius: 5px;
  }
  video {
    width: 100%;
    border-radius: 5px;
  }
</style>
