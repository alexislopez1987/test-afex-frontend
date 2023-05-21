<template>
  <div>
    <div v-if="loading === true">Loading...</div>
    <div v-else>
      <add-video @add-video="addVideo"></add-video>
      <videos-list :videos="videos"></videos-list>
      <div v-if="error !== null">{{ error }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Ref } from 'vue'

import VideosList from './VideosList.vue'
import AddVideo from './AddVideo.vue'
import useFetch from '@/composable/useFetch'

export default {
  components: {
    VideosList,
    AddVideo
  },
  setup() {
    const { data, error, loading, fetchAllVideos, addVideoToAlbum } = useFetch()

    /*
    const videosToShow: iVideos[] = []
    videosToShow.push({ id: '1', text: 'video 1' })
    videosToShow.push({ id: '2', text: 'video 2' })
    */

    //const videos: Ref<iVideos[]> = ref(videosToShow)
    //const videos: Ref<iVideos[]> = ref([])

    onMounted(async () => {
      await fetchAllVideos()
    })

    /*
    const filteredVideos = computed(function () {
      return videos.value.filter(
        (video) => !video.text.includes('Angular') && !video.text.includes('React')
      )
    })
    */

    async function addVideo(videoId: string) {
      await addVideoToAlbum(videoId)

      if (!error) {
        await fetchAllVideos()
      }
    }

    return {
      addVideo,
      loading,
      error,
      videos: data
    }
  }
}
</script>
