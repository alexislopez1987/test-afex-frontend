<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <button class="popup-close" @click="TogglePopup()">X</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['TogglePopup']
}
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);

  display: flex;
  align-items: center;
  justify-content: center;
}

.popup .popup-inner {
  background: #fff;
  padding: 32px;
  position: relative;
}

.popup-close {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  color: black;
  width: 2rem;
  font-weight: bold;
  background-color: white;
  border: 0;
  cursor: pointer;
}
</style>
