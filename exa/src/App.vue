



<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'


</script>

<template>
  <div class="header">
    <div class="namecontainer">
      <h1 class="name">PredicTable</h1>
    </div>
    <div class="header-right">
      <a class="active" href="/">Home</a>
      <a href="/train">Train</a>
      <a href="">About</a>
    </div>
  </div>
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

.header {
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 8px 10px;
}

.namecontainer {
  display: inline-block; 
  margin-left: 10px;
  padding: 3px 0px;
  text-align: center;
}

.header-right {
  display: inline-block; 
  float: right;
  margin-right: 10px;
  
}

.header a {
  float: left;
  color: black;
  text-align: center;
  padding: 3px 0px;
  font-size: 18px;
  margin-left: 8px;
  margin-right: 15px;
  border-radius: 4px;
}

.name {
  color: darkolivegreen;
  font-family:'Trebuchet MS';
  font-size: 1.5em;
  font-weight: bold;
  margin: 0 auto;

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
