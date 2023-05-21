<template>
  <section class="container">
    <h2>Mis Videos</h2>
    <ul>
      <li v-for="video in videos" :key="video.id">{{ video.text }}</li>
    </ul>
  </section>
</template>

<script lang="ts">
export default {
  props: ['videos']
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin: 1rem 0;
  border: 1px solid #ccc;
}
</style>
