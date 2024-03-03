import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/login.vue';
import Home from '@/views/home/index.vue';
import UserManagement from '@/views/system/user_management/index.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                meta: {
                    title: '首页',
                }
            },
            {
                path: 'system',
                name: 'System',
                redirect: '/system/user_management',
                children: [
                    {
                        path: 'user_management',
                        name: 'UserManagement',
                        component: UserManagement,
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router