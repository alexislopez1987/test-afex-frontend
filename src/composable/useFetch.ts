import axios from 'axios'
import type iVideos from '@/dto/video.dto'
import settings from '@/config/settings'

export default function useFetch() {
  const { signal, abort } = new AbortController()

  const baseUrl = settings.VUE_APP_BASE_URL

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  const fetchAllVideos = async () => {
    const albumUrl = `${baseUrl}/youtube-videos`
    try {
      const videoList = await axios.get<iVideos[]>(albumUrl, {
        headers,
        signal
      })
      return videoList.data
    } catch (err) {
      console.error('error en fetchAllVideos', err)
      const errMsg = err as string
      throw new Error(errMsg)
    }
  }

  const addVideoToAlbum = async (videoId: string) => {
    const videoUrl = `${baseUrl}/create-video`

    const params = {
      videoId
    }

    try {
      const videoById = await axios.post(videoUrl, params, {
        headers,
        signal
      })
      return videoById.data
    } catch (err) {
      console.error('error en addVideoToAlbum', err)
      const errMsg = err as string
      throw new Error(errMsg)
    }
  }

  /*
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
  */

  const deleteVideo = async (videoId: string) => {
    const videoUrl = `${baseUrl}/youtube-video/${videoId}`

    try {
      await axios.delete(videoUrl, {
        headers,
        signal
      })
    } catch (err) {
      console.error('error en deleteVideo', err)
      const errMsg = err as string
      throw new Error(errMsg)
    }
  }

  return {
    abort,
    fetchAllVideos,
    addVideoToAlbum,
    deleteVideo
  }
}
