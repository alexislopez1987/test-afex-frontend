<template>
  <div v-if="loading === true">Loading...</div>
  <div v-else>
    <add-video @add-video="addVideo"></add-video>
    <videos-list :videos="videos"></videos-list>
    <div v-if="error !== null">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue'
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
    const { error, loading, fetchAllVideos, addVideoToAlbum } = useFetch()
    const videos: Ref<iVideos[]> = ref([])

    onMounted(async () => {
      const videosLoaded = await fetchAllVideos()

      if (videosLoaded) {
        videos.value = videosLoaded
      } else {
        videos.value = []
      }
    })

    /*
    const filteredVideos = computed(function () {
      return videos.value.filter(
        (video) => !video.text.includes('Angular') && !video.text.includes('React')
      )
    })
    */

    async function addVideo(videoId: string) {
      loading.value = true

      try {
        await addVideoToAlbum(videoId)
      } catch (err) {
        const errMsg = err as string
        error.value = errMsg
      }

      if (error.value === '') {
        const newVideos = await fetchAllVideos()
        if (newVideos === undefined) {
          videos.value = []
        } else {
          videos.value = newVideos
        }
      }

      loading.value = false
    }

    return {
      addVideo,
      loading,
      error,
      videos
    }
  }
}
</script>

<style scoped></style>
