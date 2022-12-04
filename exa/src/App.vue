



<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'


</script>

<template>
  <div class="container is-max-desktop">

    <HelloWorld />

    <RouterView v-slot="{ Component }">
      <Component :is="Component"> </Component>
      <!-- <Transition name="route" mode="out-in">
        <Component :is="Component"> </Component>
      </Transition> -->
    </RouterView>
    <div class="columns">
      <div class="column is-full">
        <p class="mt-6 mb-4 has-text-centered">Made with <a href="">🪩</a> in Lausanne.</p>
      </div>

    </div>
  </div>

</template>

<style scoped>
#rigth {
  position: absolute;
  top: 0;
  right: 0;
}

.center {
  text-align: center;
}

a {
  position: relative;
  color: #000;
  text-decoration: none;
}

a:hover {
  color: #000;
}

a::before {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #000;
  transform: scaleX(0);
  transform-origin: top left;
  transition: transform 0.3s ease;
}

a:hover::before {
  transform: scaleX(1);
}

a:visited {
  color: black;
}

.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
