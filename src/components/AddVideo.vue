<template>
  <div class="container-form">
    <form @submit.prevent="addVideo">
      <h3 class="title">Añadir nuevo video</h3>
      <input
        type="text"
        class="text-add-video"
        id="videolink"
        v-model="enteredText"
        placeholder="Añadir"
      />
      <button class="button-add-video">Añadir</button>
      <p class="error" v-if="invalidInput !== ''">{{ invalidInput }}</p>
    </form>
  </div>
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

      context.emit('add-video', videoId.value)
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
  margin-top: 0.6rem;
}

.text-add-video {
  width: 80dvh;
  height: 2.9rem;
}

.title {
  font-weight: bold;
}

.container-form {
  text-align: center;
}
</style>
