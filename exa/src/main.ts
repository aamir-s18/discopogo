import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router/router'
import VueApexCharts from "vue3-apexcharts";



import './assets/main.css'


const app = createApp(App)

app.use(router)
app.use(VueApexCharts)
app.mount('#app')
