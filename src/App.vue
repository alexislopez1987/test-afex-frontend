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
  list-style: none;
}

.container {
  box-shadow: 0 2px 8px white;
  width: 95vw;
  height: 80vh;
  margin: 3rem auto;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
}

#app {
  overflow-x: hidden;
}
</style>
