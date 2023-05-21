<template>
  <div>
    <videos-list :videos="filteredVideos"></videos-list>
    <add-video @add-video="addVideo"></add-video>
  </div>
</template>

<script lang="ts">
import type iVideos from '@/dto/video.dto'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

import VideosList from './VideosList.vue'
import AddVideo from './AddVideo.vue'

export default {
  components: {
    VideosList,
    AddVideo
  },
  setup() {
    const videosToShow: iVideos[] = []
    videosToShow.push({ id: '1', text: 'video 1' })
    videosToShow.push({ id: '2', text: 'video 2' })

    const videos: Ref<iVideos[]> = ref(videosToShow)

    const filteredVideos = computed(function () {
      return videos.value.filter(
        (video) => !video.text.includes('Angular') && !video.text.includes('React')
      )
    })

    function addVideo(text: string) {
      const newVideo: iVideos = {
        id: new Date().toISOString(),
        text: text
      }
      videos.value.push(newVideo)
    }

    return {
      filteredVideos,
      addVideo
    }
  }
}
</script>
