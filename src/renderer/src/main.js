import '@renderer/assets/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')
