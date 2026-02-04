import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { createPinia } from 'pinia'
import './style.css'

const pinia = createPinia()

createApp(App)
    .use(vuetify)
    .use(pinia)
    .mount('#app')
