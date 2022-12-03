import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router/router'
import { data, Disco, fetchTasks, Task } from '@epfml/discojs'

import './assets/main.css'
export async function runClient(): Promise<void> {
    const serverUrl = new URL('', `http://localhost:8080`)
    const tasks = await fetchTasks(serverUrl)
    console.log("tasks", tasks)
}
runClient()
const app = createApp(App)

app.use(router)

app.mount('#app')
