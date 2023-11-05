import { routes } from "@/pages";
import { createRouter, createWebHistory } from "vue-router";
import { loadLayoutMiddleware } from './middlewares'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(loadLayoutMiddleware)