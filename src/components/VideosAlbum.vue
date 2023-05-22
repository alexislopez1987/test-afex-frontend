<template>
  <div v-if="loading === true">Loading...</div>
  <div v-else>
    <add-video @add-video="addVideo"></add-video>
    <div class="error-msg" v-if="error !== ''">{{ error }}</div>
    <div class="success-msg" v-if="successMsg !== ''">{{ successMsg }}</div>
    <div class="info-msg" v-if="infoMsg !== ''">{{ infoMsg }}</div>
    <videos-list :videos="videos" @delete-video="deleteVideoById"></videos-list>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'

import VideosList from './VideosList.vue'
import AddVideo from './AddVideo.vue'
import useFetch from '@/composable/useFetch'
import type iVideos from '@/dto/video.dto'

export default {
  components: {
    VideosList,
    AddVideo
  },
  setup() {
    const { fetchAllVideos, addVideoToAlbum, deleteVideo } = useFetch()
    const videos: Ref<iVideos[]> = ref([])
    const loading: Ref<boolean> = ref(false)
    const error: Ref<string> = ref('')
    const successMsg: Ref<string> = ref('')
    const infoMsg: Ref<string> = ref('')

    onMounted(async () => {
      await reloadVideos()
    })

    async function addVideo(videoId: string) {
      loading.value = true

      try {
        await addVideoToAlbum(videoId)
        showSuccessMsg(`Video con id ${videoId} agregado correctamente`)
      } catch (err) {
        const errMsg = err as string
        error.value = errMsg
      }

      if (error.value === '') {
        await reloadVideos()
      }

      loading.value = false
    }

    async function deleteVideoById(videoId: string) {
      loading.value = true
      try {
        await deleteVideo(videoId)
        await reloadVideos()
        showSuccessMsg(`Video con id ${videoId} borrado correctamente`)
      } catch (err) {
        const errMsg = err as string
        error.value = errMsg
      } finally {
        loading.value = false
      }
    }

    async function reloadVideos() {
      loading.value = true

      try {
        const newVideos = await fetchAllVideos()
        if (newVideos.length === 0) {
          showInfoMsg('No se encontraron videos')
        } else {
          showInfoMsg('Videos cargados correctamente')
        }
        videos.value = newVideos
      } catch (err) {
        console.log('error leyendo videos', err)
        const errMsg = err as string
        error.value = errMsg
      } finally {
        loading.value = false
      }
    }

    function showSuccessMsg(msg: string) {
      successMsg.value = msg

      setTimeout(() => {
        successMsg.value = ''
      }, 3000)
    }

    function showInfoMsg(msg: string) {
      infoMsg.value = msg

      setTimeout(() => {
        infoMsg.value = ''
      }, 3000)
    }

    return {
      addVideo,
      deleteVideoById,
      loading,
      error,
      videos,
      successMsg,
      infoMsg
    }
  }
}
</script>

<style scoped>
.error-msg {
  margin-top: 0.5rem;
  background-color: red;
  color: white;
  width: 90%;
}

.success-msg {
  margin-top: 0.5rem;
  background-color: #208637;
  color: white;
  width: 90%;
}

.info-msg {
  margin-top: 0.5rem;
  background-color: #0d6efd;
  color: white;
  width: 90%;
}
</style>
