import DefaultTemplate from './default.vue'


export const DefaultLayout = DefaultTemplate

export enum LayoutTemplateEnum {
    default = 'default'
}

export const LayoutTemplateToFileMap: Record<LayoutTemplateEnum, string> = {
    default: 'default.vue'
}

export const getLayoutByTemplate = (template: LayoutTemplateEnum): string => {
    return LayoutTemplateToFileMap[template]
}