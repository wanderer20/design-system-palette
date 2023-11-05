import type { RouteRecordRaw } from "vue-router";

export const routes: Readonly<RouteRecordRaw[]> = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/pages/home'),
        meta: {

        }
    }
]