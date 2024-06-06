import { defineStore } from 'pinia'
import { ref } from 'vue'

const collapse = '184.5px'
const expand = '60px'


export const useMenuStore = defineStore(
    'menu',
    () => {
        const isCollapse = ref(false)
        const menuWidth = ref('200px')
        const collapseLeft = ref(collapse)
        const collapseRotate = ref('none')

        const changeCollapse = () => {
            isCollapse.value = !isCollapse.value;

            if (isCollapse.value) {
                menuWidth.value = '64px'
                collapseLeft.value = expand
                collapseRotate.value = 'rotate(180deg)'
            } else {
                menuWidth.value = '200px'
                collapseLeft.value = collapse
                collapseRotate.value = 'none'
            }
        }

        const navBar = ref([
            {
                index: '/',
                title: '首页',
            }
        ])

        return {
            // 属性
            isCollapse,
            menuWidth,
            collapseLeft,
            collapseRotate,

            navBar,

            // 方法
            changeCollapse,
        }
    },
    {
        persist: {
            key: 'menu_store',
            storage: localStorage,
        },
    })