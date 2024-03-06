import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'
import '@/assets/css/style.css'
import '@/assets/css/vars.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { createPinia } from 'pinia'
import svgIcon from "@/components/SvgIcon/index.vue";
import 'virtual:svg-icons-register'

import router from './router/index';

import App from './App.vue'

const pinia = createPinia()

let app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.component('svg-icon', svgIcon)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
