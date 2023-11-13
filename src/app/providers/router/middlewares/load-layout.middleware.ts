import type { RouteLocationNormalized } from "vue-router";
import { LayoutTemplateEnum, getLayoutByTemplate } from "@/app/layouts";
import type { DefineComponent } from "vue";

export async function loadLayoutMiddleware(route: RouteLocationNormalized): Promise<void> {
    const { layout } = route.meta
    const layoutTemplate: LayoutTemplateEnum = layout || LayoutTemplateEnum.default
    const fileName = getLayoutByTemplate(layoutTemplate)
    // Можно было бы оставить как есть default.vue, но динамические импорты должны быть с расширением
    // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
    const fileNameWithoutExtension = fileName.split('.vue')[0]

    const component: DefineComponent = await import(`../../../layouts/templates/${fileNameWithoutExtension}.vue`)

    route.meta.layoutComponent = component.default
}