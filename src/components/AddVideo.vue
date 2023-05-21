<template>
  <form @submit.prevent="addVideo">
    <div>
      <h5>Añadir nuevo video</h5>
      <input type="text" id="videolink" v-model="enteredText" placeholder="Añadir" />
      <button class="button-add-video" :disabled="invalidInput === ''">Añadir</button>
    </div>
    <p class="error" v-if="invalidInput !== ''">{{ invalidInput }}</p>
  </form>
</template>

<script lang="ts">
import useValidUrl from '@/composable/useValidUrl'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export default {
  emits: ['add-video'],
  setup(_, context) {
    const { validUrl, errorMsg, videoId } = useValidUrl()
    const enteredText: Ref<string> = ref('')
    const invalidInput: Ref<string> = ref('')

    watch(invalidInput, function (val) {
      if (val) {
        console.log('Input inválido')
      }
    })

    async function addVideo() {
      validUrl(enteredText.value)

      if (errorMsg.value !== '') {
        invalidInput.value = errorMsg.value
        return
      }

      context.emit('add-video', videoId)
      enteredText.value = ''
      invalidInput.value = ''
    }

    return {
      enteredText,
      invalidInput,
      addVideo
    }
  }
}
</script>

<style scoped>
.button-add-video {
  background-color: #0d6efd;
  color: white;
  font: inherit;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  margin-right: 1rem;
}

.button-add-video:hover,
.button-add-video:active {
  background-color: #ffffff;
  color: #0d6efd;
}

.error {
  background-color: red;
  color: white;
}
</style>
