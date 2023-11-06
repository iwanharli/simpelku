// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { LoadingPlugin } from 'vue-loading-overlay';
import PrimeVue from 'primevue/config';
// import store from './stores/store'


import App from './App.vue'
import router from './router'
import './axios'
import 'vue-loading-overlay/dist/css/index.css';
// import L from 'leaflet'

const app = createApp(App)

app.use(createPinia())
app.use(LoadingPlugin);
app.use(router);
app.use(PrimeVue);


app.mount('#app')
