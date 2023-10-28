// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './axios'
// import store from './vuex'

// new Vue({
//     router,
//     store,
//     render: h => h(App),
// }).$mount('#app')


const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(store)

app.mount('#app')
