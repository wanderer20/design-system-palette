// Адаптация из vue-router
// Смотреть: https://github.com/vuejs/router/blob/main/packages/router/src/RouterLink.ts

import type { RouteLocation, RouteLocationNormalized, RouteParamValue, RouteRecord } from "vue-router";
import { isArray, isEquivalentArray } from "../../types";

export function activeRecordIndex(route: RouteLocation, currentRoute: RouteLocation) {
    const {matched} = route
    const {length} = matched
    const routeMatched: RouteRecord | undefined = matched[ length - 1 ]

    const currentMatched = currentRoute.matched

    if (!routeMatched || !currentMatched.length) return -1

    const index = currentMatched.findIndex(
        isSameRouteRecord.bind(null, routeMatched)
    )
    if (index > -1) return index

    const parentRecordPath = getOriginalPath(
        matched[ length - 2 ] as RouteRecord | undefined
    )

    return (
        length > 1 &&
        getOriginalPath(routeMatched) === parentRecordPath &&
        currentMatched[ currentMatched.length - 1 ].path !== parentRecordPath
            ? currentMatched.findIndex(
                isSameRouteRecord.bind(null, matched[ length - 2 ])
            )
            : index
    )

}

/**
 * Метод проверяет на соответствие двух RouteRecord по алиасу
 * @param a Первый {@link RouteRecord}
 * @param b Второй {@link RouteRecord}
 */
export function isSameRouteRecord(a: RouteRecord, b: RouteRecord): boolean {
    return (a.aliasOf || a) === (b.aliasOf || b)
}

/**
 * Метод получает оригинальный путь беря за основу алиас
 * @param record
 */
function getOriginalPath(record: RouteRecord | undefined): string {
    return record ? (record.aliasOf ? record.aliasOf.path : record.path) : ''
}

export function includesParams(outer: RouteLocation['params'], inner: RouteLocation['params']): boolean {
    for (const key in inner) {
        const innerValue = inner[ key ]
        const outerValue = outer[ key ]
        if (typeof innerValue === 'string') {
            if (innerValue !== outerValue) return false
        } else {
            if (
                !isArray(outerValue) ||
                outerValue.length !== innerValue.length ||
                innerValue.some((value, i) => value !== outerValue[ i ])
            )
                return false
        }
    }

    return true
}

export function isSameRouteLocationParams(
    a: RouteLocationNormalized['params'],
    b: RouteLocationNormalized['params']
): boolean {
    if (Object.keys(a).length !== Object.keys(b).length) return false

    for (const key in a) {
        if (!isSameRouteLocationParamsValue(a[ key ], b[ key ])) return false
    }

    return true
}

export function isSameRouteLocationParamsValue(
    a: RouteParamValue | readonly RouteParamValue[],
    b: RouteParamValue | readonly RouteParamValue[],
): boolean {
    return isArray(a) ?
        isEquivalentArray(a, b) :
        isArray(b) ?
            isEquivalentArray(b, a) :
            a === b
}
