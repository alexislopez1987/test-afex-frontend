<template>
  <div class="container-card-video">
    <div v-for="video in videos" :key="video.video_id" class="card-video">
      <img :src="video.thumbnail_medium" alt="imagen video youtube" />
      <button class="button_x" id="{{ video.video_id }}" @click="deleteVideo(video.video_id)">
        x
      </button>
      <span class="video_time">{{ video.duration }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['videos'],
  setup() {
    async function deleteVideo(videoId: string) {
      //TODO: abrir popup de confirmacion
      console.log(`abrir popup para borrar video con id ${videoId}`)
    }

    return {
      deleteVideo
    }
  }
}
</script>

<style scoped>
.container-card-video {
  padding-top: 5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  row-gap: 10px;
  column-gap: 10px;
}

.card-video {
  position: relative;
}

.button_x {
  position: absolute;
  top: 0;
  right: 0;
  background-color: black;
  color: white;
  width: 1.5rem;
}

.video_time {
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: black;
  color: white;
  width: 2.5rem;
  margin-bottom: 0.5rem;
}
</style>
