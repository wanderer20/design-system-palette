import { VueElement } from "vue";
import { LayoutTemplateEnum } from "@/app/layouts"

declare module 'vue-router' {
    interface RouteMeta {
        layout?: LayoutTemplateEnum
        layoutComponent?: VueElement
    }
}

export {}