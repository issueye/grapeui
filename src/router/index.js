import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/login.vue';
import Home from '@/views/home/index.vue';
import UserManagement from '@/views/system/user_management/index.vue';
import AuthGroupManagement from '@/views/system/auth_group_management/index.vue';
import Dashboard from '@/views/dashboard/index.vue';

import TargetManagement from '@/views/page_mana/target_management/index.vue';
import ResourceManagement from '@/views/page_mana/resource_management/index.vue';
import PageManagement from '@/views/page_mana/page_management/index.vue';
import HttpMessageQuery from '@/views/page_mana/http_messages/index.vue';

import { createWebHashHistory } from 'vue-router';

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
                children: [
                    {
                        path: 'page_management',
                        name: 'PageManagement',
                        component: PageManagement,
                    },
                    {
                        path: 'target_management',
                        name: 'TargetManagement',
                        component: TargetManagement,
                    },
                    {
                        path: 'resource_management',
                        name: 'ResourceManagement',
                        component: ResourceManagement,
                    },
                    {
                        path: 'http_message_query',
                        name: 'HttpMessageQuery',
                        component: HttpMessageQuery,
                    }
                ],
            },
            {
                path: 'system',
                name: 'System',
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
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') next()

    let token = localStorage.getItem('token')
    if (!token) {
        next('/login')
    } else {
        next()
    }

    if (!from.name) {
        from.name = 'Home';
        next('/')
    }
})

export default router