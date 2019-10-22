<template>
  <div class="player">
    <video autoplay
           :src="source" />
  </div>
</template>

<script>
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
