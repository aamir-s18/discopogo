<template>
<div class="dropfield" @drop.prevent="onDrop">

    <slot>
        <div id="filediv">
            Drop your file here
        </div>        
    </slot>
</div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
const emit = defineEmits(['files-dropped'])

function onDrop(e) {
    emit('files-dropped', [...e.dataTransfer.files])
    console.log(e.dataTransfer.files[0])
    document.getElementById("filediv").textContent=e.dataTransfer.files[0].name;
}

function preventDefaults(e) {
    e.preventDefault()
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']

onMounted(() => {
    events.forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefaults)
    })
})

onUnmounted(() => {
    events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults)
    })
})
</script>

<style>
.dropfield {
    width: 100%;
    height: 300px;
    border: 2px #ccc;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    background-color: #eeefeb;
    cursor: pointer;
}
</style>
