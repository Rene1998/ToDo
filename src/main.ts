import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import App from './plugins/App.vue'
import router from './plugins/app/router'
import store from './plugins/app/store'

createApp(App)
	.use(store)
	.use(router)
	.mount('#app')
