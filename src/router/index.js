import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/login.vue';
import Home from '@/views/home/index.vue';
import UserManagement from '@/views/system/user_management/index.vue';
import AuthGroupManagement from '@/views/system/auth_group_management/index.vue';
import Dashboard from '@/views/dashboard/index.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    title: '首页',
                }
            },
            {
                path: 'page',
                name: 'Page',
                redirect: '/page/page_management',
                children: [
                    {
                        path: 'page_management',
                        name: 'PageManagement',
                        component: UserManagement,
                    },
                    {
                        path: 'target_management',
                        name: 'TargetManagement',
                        component: UserManagement,
                    }
                ],
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
                    },
                    {
                        path: 'auth_group_management',
                        name: 'AuthGroupManagement',
                        component: AuthGroupManagement,
                        meta: {
                            title: '用户组管理',
                        },
                    },
                    {
                        path: 'menu_management',
                        name: 'MenuManagement',
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