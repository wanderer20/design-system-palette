import { isArray, isObject, isString } from '@vue/shared'
import { isNil } from 'lodash-unified'

export {
    isArray,
    isFunction,
    isObject,
    isString,
    isDate,
    isPromise,
    isSymbol,
} from '@vue/shared'

export { isVNode } from 'vue'


export const isNumber = (val: unknown): val is number => typeof val === "number" && val === val

export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'

export const isUndefined = (val: any): val is undefined => val === undefined

export const isEmpty = (val: unknown) =>
    (!val && val !== 0) ||
    (isArray(val) && val.length === 0) ||
    (isObject(val) && !Object.keys(val).length)

export const isElement = (e: unknown): e is Element => {
    if (typeof Element === 'undefined') return false
    return e instanceof Element
}

export const isPropAbsent = (prop: unknown): prop is null | undefined => {
    return isNil(prop)
}

export const isStringNumber = (val: string): boolean => {
    if (!isString(val)) {
        return false
    }
    return !Number.isNaN(Number(val))
}

/**
 * Метод проверяет два массива на соответствие друг другу.
 * @param a Массив значений
 * @param b Массив значений или одиночное значение
 */
export const isEquivalentArray = <T>(a: readonly T[], b: readonly T[] | T): boolean => {
    return isArray(b) ?
        a.length === b.length && a.every((value, i) => value === b[ i ]) :
        a.length === 1 && a[ 0 ] === b
}
