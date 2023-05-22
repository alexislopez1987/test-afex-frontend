<template>
  <div class="container-card-video">
    <div v-for="video in videos" :key="video.video_id" class="card-video">
      <img :src="video.thumbnail_medium" alt="imagen video youtube" />
      <button class="button_x" id="{{ video.video_id }}" @click="tyrDeleteVideo(video.video_id)">
        X
      </button>
      <span class="video_time">{{ video.duration }}</span>
    </div>
  </div>

  <Popup v-if="popupIsTriggered === true" :TogglePopup="() => TogglePopup()">
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
  </Popup>
</template>

<script lang="ts">
import PopUp from '@/components/PopUp.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'

export default {
  props: ['videos'],
  emits: ['delete-video'],
  setup(_, context) {
    const popupIsTriggered: Ref<boolean> = ref(false)
    const videoIdToDelete: Ref<string> = ref('')

    const TogglePopup = () => {
      popupIsTriggered.value = !popupIsTriggered.value
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

    return {
      tyrDeleteVideo,
      deleteVideoFunc,
      PopUp,
      TogglePopup,
      popupIsTriggered
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

.container-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
}

.button_cancel {
  background-color: white;
  color: #0d6efd;
  border-radius: 12px;
}

.button_delete {
  background-color: #0d6efd;
  color: white;
  border-radius: 12px;
}
</style>
