import 'vue-router'

import type { DefineComponent, VueElement } from "vue";
import type { LayoutTemplateEnum } from "@/app/layouts"

export {}

declare module 'vue-router' {
    interface RouteMeta {
        layout?: LayoutTemplateEnum
        layoutComponent?: DefineComponent
    }
}
