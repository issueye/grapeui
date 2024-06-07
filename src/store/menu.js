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

        const indexTabbar = ref()
        const navBar = ref([
            {
                index: '/',
                title: '首页',
            }
        ])

        /**
         * 添加标签
         * @param {*} data 
         */
        const setNavBar = (data) => {
            const tab = navBar.value.find(e => e.index == data.index)
            if (!tab) {
                navBar.value.push(data)
            }

            indexTabbar.value = data.title;
        }

        /**
         * 移除标签
         * @param {*} data 
         */
        const removeBar = (data) => {
            const tab = navBar.value.find(e => e.index == data.index)
            if (tab) {
                navBar.value.filter(e => e.index !== data.index)
            }
        }

        return {
            // 属性
            isCollapse,
            menuWidth,
            collapseLeft,
            collapseRotate,

            indexTabbar,
            navBar,

            // 方法
            changeCollapse,
            setNavBar,
            removeBar,
        }
    },
    {
        persist: {
            key: 'menu_store',
            storage: localStorage,
        },
    })