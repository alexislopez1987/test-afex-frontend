import axios from 'axios'
import type iVideos from '@/dto/video.dto'
import { ref } from 'vue'
import type { Ref } from 'vue'

export default function useFetch() {
  const data: Ref<iVideos[]> = ref([])
  const error: Ref<string | null> = ref(null)
  const loading: Ref<boolean> = ref(false)
  const { signal, abort } = new AbortController()

  const baseUrl = `http://localhost:8095/v1`

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  const fetchAllVideos = async () => {
    loading.value = true
    const albumUrl = `${baseUrl}/album`
    try {
      const videoList = await axios.get<iVideos[]>(albumUrl, {
        headers,
        signal
      })
      return videoList.data
    } catch (err) {
      console.error('error en fetch', err)
      const errMsg = err as string
      error.value = errMsg
    } finally {
      loading.value = false
    }
  }

  const addVideoToAlbum = async (videoId: string) => {
    loading.value = true
    const videoUrl = `${baseUrl}/youtube-video/${videoId}`

    const params: iVideos = {
      id: videoId
    }

    try {
      const videoById = await axios.post(videoUrl, params, {
        headers,
        signal
      })
      return videoById.data
    } catch (err) {
      console.error('error en fetch', err)
      const errMsg = err as string
      error.value = errMsg
    } finally {
      loading.value = false
    }
  }

  const fetchVideoById = async (videoId: string) => {
    loading.value = true
    const videoUrl = `${baseUrl}/youtube-video/${videoId}`
    try {
      const videoById = await axios.get<iVideos>(videoUrl, {
        headers,
        signal
      })
      return videoById.data
    } catch (err) {
      console.error('error en fetch', err)
      const errMsg = err as string
      error.value = errMsg
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    error,
    loading,
    abort,
    fetchAllVideos,
    addVideoToAlbum
  }
}
