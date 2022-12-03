import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Disco, fetchTasks } from '@epfml/discojs-node'

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
