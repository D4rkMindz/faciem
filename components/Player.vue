<template>
  <div class="player">
    <video ref="video"
           class="video-js vjs-big-play-centered vjs-waiting" />
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
      setupComplete: false,
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
    const $this = this;
    this.player = videojs(this.$refs.video, this.options, function () {
      this.addClass('vjs-waiting');
      this.one('timeupdate', () => {
        this.removeClass('vjs-waiting');
      });
    });
    this.player.on('ended', function () {
      this.controlBar.dispose();
      this.bigPlayButton.dispose();
      this.exitFullscreen();
      $this.$emit('ended', { source: this.source });
    });
    this.setupComplete = true;
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style scoped>
  .player {
    width: 100%;
    height: auto;
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
