<script setup lang="ts"></script>

<template>
  <div class="container">
    <videos-album></videos-album>
  </div>
</template>

<script>
import VideosAlbum from './components/VideosAlbum.vue'

export default {
  components: {
    VideosAlbum
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: sans-serif;
}

.container {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  max-width: 25rem;
  margin: 3rem auto;
  padding: 1rem;
  border-radius: 12px;
}
</style>
