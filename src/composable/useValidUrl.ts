import { ref } from 'vue'
import type { Ref } from 'vue'

export default function useValidUrl() {
  const errorMsg: Ref<string> = ref('')
  const videoId: Ref<string> = ref('')

  const validUrl = (url: string) => {
    if (!url) {
      errorMsg.value = `Url esta vacía. Favor ingresarla`
      return
    }

    if (!url.includes('youtube.com') || !url.includes('youtu.be')) {
      errorMsg.value = `Url ${url} no es válida`
      return
    }

    if (!url.includes('?v=')) {
      errorMsg.value = `Url ${url} no es válida. No tiene id`
      return
    }

    const indexEquals = url.lastIndexOf('=')
    videoId.value = url.substring(indexEquals + 1)
  }

  return {
    validUrl,
    errorMsg,
    videoId
  }
}
