import type {RouteLocationNormalized} from "vue-router";
import { LayoutTemplateEnum, getLayoutByTemplate } from "@/app/layouts";

export async function loadLayoutMiddleware(route: RouteLocationNormalized): Promise<void> {
    const { layout } = route.meta
    const layoutTemplate: LayoutTemplateEnum = layout || LayoutTemplateEnum.default
    const fileName = getLayoutByTemplate(layoutTemplate)

    const component = await import(`../../../layouts/templates/${fileName}`)

    route.meta.layoutComponent = component.default
}