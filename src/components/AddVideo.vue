<template>
  <section class="container">
    <form @submit.prevent="addVideo">
      <div>
        <label for="videotext">Video</label>
        <input type="text" id="videotext" v-model="enteredText" />
      </div>
      <p v-if="invalidInput">Favor agregar un video válido (no vacio).</p>
      <button>Agregar Video</button>
    </form>
  </section>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export default {
  emits: ['add-video'],
  setup(_, context) {
    const enteredText: Ref<string> = ref('')
    const invalidInput: Ref<boolean> = ref(false)

    watch(invalidInput, function (val) {
      if (val) {
        console.log('Input inválido')
      }
    })

    function addVideo() {
      invalidInput.value = false
      if (enteredText.value === '') {
        invalidInput.value = true
        return
      }
      context.emit('add-video', enteredText.value)
      enteredText.value = ''
    }

    return {
      enteredText,
      invalidInput,
      addVideo
    }
  }
}
</script>
