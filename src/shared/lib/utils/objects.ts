import { get, set } from 'lodash-unified'
import type { Entries } from 'type-fest'
import type { Arrayable } from './typescript.ts'
import { isArray } from "./types.ts";

export const keysOf = <T>(arr: T) => isArray(arr) ? Object.keys(arr) as Array<keyof T> : []
export const entriesOf = <T>(arr: T) => isArray(arr) ? Object.entries(arr) as Entries<T> : []
export { hasOwn } from '@vue/shared'

export const notEmptyObject = (obj: unknown): boolean => {
    return typeof obj === 'object' && Object.keys(obj || {}).length > 0
}
export const getProp = <T = any>(
    obj: Record<string, any>,
    path: Arrayable<string>,
    defaultValue?: any
): { value: T } => {
    return {
        get value() {
            return get(obj, path, defaultValue)
        },
        set value(val: any) {
            set(obj, path, val)
        },
    }
}
