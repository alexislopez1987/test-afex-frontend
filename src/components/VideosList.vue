<template>
  <div class="container-card-video">
    <div v-for="video in videos" :key="video.video_id" class="card-video">
      <img
        :src="video.thumbnail_medium"
        alt="imagen video youtube"
        class="img_video"
        @click="
          () => {
            openVideo(video)
          }
        "
      />
      <button class="button_x" id="{{ video.video_id }}" @click="tyrDeleteVideo(video.video_id)">
        X
      </button>
      <span class="video_time">{{ video.duration }}</span>
    </div>
  </div>

  <PopUp v-if="videoToShow !== null" :TogglePopup="() => togglePopupShowVideo()">
    <div class="container-video">
      <iframe
        width="320"
        height="240"
        :src="`https://www.youtube.com/embed/${videoToShow.video_id}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; 
        autoplay; 
        clipboard-write; 
        encrypted-media; 
        gyroscope; 
        picture-in-picture;
        web-share"
        allowfullscreen
      ></iframe>
      <div class="video-description">{{ videoToShow.description }}</div>
    </div>
  </PopUp>

  <PopUp v-if="popupIsTriggered === true" :TogglePopup="() => TogglePopup()">
    <h2>¿Seguro que quieres eliminar este video?</h2>
    <div class="container-buttons">
      <button
        class="button_cancel"
        @click="
          () => {
            TogglePopup()
          }
        "
      >
        Cancelar
      </button>
      <button
        class="button_delete"
        @click="
          () => {
            deleteVideoFunc()
          }
        "
      >
        Eliminar
      </button>
    </div>
  </PopUp>
</template>

<script lang="ts">
import PopUp from '@/components/PopUp.vue'
import type iVideos from '@/dto/video.dto'
import { ref } from 'vue'
import type { Ref } from 'vue'

export default {
  props: ['videos'],
  emits: ['delete-video'],
  components: {
    PopUp
  },
  setup(_, context) {
    const popupIsTriggered: Ref<boolean> = ref(false)
    const videoIdToDelete: Ref<string> = ref('')
    const videoToShow: Ref<iVideos | null> = ref(null)

    const TogglePopup = () => {
      popupIsTriggered.value = !popupIsTriggered.value
    }

    const togglePopupShowVideo = () => {
      videoToShow.value = null
    }

    async function tyrDeleteVideo(videoId: string) {
      videoIdToDelete.value = videoId
      popupIsTriggered.value = true
    }

    async function deleteVideoFunc() {
      if (videoIdToDelete.value !== '') {
        popupIsTriggered.value = false
        context.emit('delete-video', videoIdToDelete.value)
        videoIdToDelete.value = ''
      }
    }

    function openVideo(video: iVideos) {
      videoToShow.value = video
    }

    return {
      tyrDeleteVideo,
      deleteVideoFunc,
      PopUp,
      TogglePopup,
      popupIsTriggered,
      openVideo,
      videoToShow,
      togglePopupShowVideo
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
  cursor: pointer;
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

.container-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.button_cancel {
  background-color: white;
  color: #0d6efd;
  border-radius: 12px;
  padding: 0.5rem;
  cursor: pointer;
}

.button_delete {
  background-color: #0d6efd;
  color: white;
  border-radius: 12px;
  padding: 0.5rem;
  cursor: pointer;
}

.img_video {
  cursor: pointer;
}

.container-video {
  padding-top: 5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  gap: 10px;
}

.video-description {
  overflow: auto;
  height: 250px;
  width: 250px;
}
</style>
