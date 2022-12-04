<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ChartsContainer from './components/ChartsContainer.vue'
import DropField from './components/DropField.vue';

</script>

<template>
  <header>
    <h1>👋 Hey foodlab alpine! </h1>   
  </header>

    <ChartsContainer />
    <DropField />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

</style>
