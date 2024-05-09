import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'
import '@/assets/css/style.css'
import '@/assets/css/vars.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



// vxe table
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import svgIcon from "@/components/SvgIcon/index.vue";
import 'virtual:svg-icons-register';

import BsHeader from '@/components/bs_header/index.vue';
import BsMain from '@/components/bs_main/index.vue';
import BsDialog from '@/components/bs_dialog/index.vue';
import BsUpload from '@/components/bs_upload/index.vue';
import BsResources from '@/components/bs_resources/index.vue';

import router from './router/index';

import App from './App.vue'

const pinia = createPinia()
pinia.use(
    createPersistedState({
        auto: true,
    })
)

let app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.use(VXETable)
app.component('svg-icon', svgIcon)
app.component('BsHeader', BsHeader)
app.component('BsMain', BsMain)
app.component('BsDialog', BsDialog)
app.component('BsUpload', BsUpload)
app.component('BsResources', BsResources)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
