import { isClient } from '@vueuse/core'
import { isNumber, isObject, isString, isStringNumber } from '../types.ts'
import { camelize } from '../strings.ts'
import { entriesOf, keysOf } from '../objects.ts'
import { debugWarn } from '../error.ts'
import type { CSSProperties } from 'vue'

const SCOPE = 'utils/dom/style'

export const classNameToArray = (cls = '') =>
    cls.split(' ').filter((item) => !!item.trim())

export const hasClass = (el: Element, cls: string): boolean => {
    if (!el || !cls) return false
    if (cls.includes(' ')) throw new Error('className should not contain space.')
    return el.classList.contains(cls)
}

export const addClass = (el: Element, cls: string) => {
    if (!el || !cls.trim()) return
    el.classList.add(...classNameToArray(cls))
}

export const removeClass = (el: Element, cls: string) => {
    if (!el || !cls.trim()) return
    el.classList.remove(...classNameToArray(cls))
}

export const getStyle = (
    element: HTMLElement,
    styleName: keyof CSSProperties
): string => {
    if (!isClient || !element || !styleName) return ''

    let key = camelize(styleName)
    if (key === 'float') key = 'cssFloat'
    try {
        const style = (element.style as any)[ key ]
        if (style) return style
        const computed: any = document.defaultView?.getComputedStyle(element, '')
        return computed ? computed[ key ] : ''
    } catch {
        return (element.style as any)[ key ]
    }
}

export const setStyle = (
    element: HTMLElement,
    styleName: CSSProperties | keyof CSSProperties,
    value?: string | number
) => {
    if (!element || !styleName) return

    if (isObject(styleName)) {
        entriesOf(styleName).forEach(([prop, value]: Array<any>) =>
            setStyle(element, prop, value)
        )
    } else {
        const key: any = camelize(styleName)
        element.style[ key ] = value as any
    }
}

export const removeStyle = (
    element: HTMLElement,
    style: CSSProperties | keyof CSSProperties
) => {
    if (!element || !style) return

    if (isObject(style)) {
        keysOf(style).forEach((prop) => removeStyle(element, prop))
    } else {
        setStyle(element, style, '')
    }
}

export function addUnit(value?: string | number, defaultUnit = 'px') {
    if (!value) return ''
    if (isNumber(value) || isStringNumber(value)) {
        return `${value}${defaultUnit}`
    } else if (isString(value)) {
        return value
    }
    debugWarn(SCOPE, 'binding value must be a string or number')
}

/**
 * Метод получает значение переменной в CSS
 * @param name
 */
export function getCSSVariable(name: string): string | undefined {
    return typeof window !== "undefined" ? window.getComputedStyle(document.documentElement).getPropertyValue(name) : undefined
}
