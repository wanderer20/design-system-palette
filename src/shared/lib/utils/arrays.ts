export const unique = <T>(arr: T[]) => [...new Set(arr)]

type Many<T> = T
// TODO: rename to `ensureArray`
/** like `_.castArray`, except falsy value returns empty array. */
export const castArray = <T>(arr: Many<T>): T[] => {
    if (!arr && (arr as any) !== 0) return []
    return Array.isArray(arr) ? arr : [arr]
}

export const notEmptyArray = (arr: unknown): boolean => {
    return typeof arr != 'undefined' && Array.isArray(arr) && arr.length > 0
}

// TODO: remove import alias
// avoid naming conflicts
export { castArray as ensureArray } from 'lodash-unified'

export function getArrayByKey<T extends Object>(arr: T[], key = 'id'): Record<string | number, T> {
    const obj: Record<string, T> = {}
    arr.forEach((item: any) => {
        if (key in item) obj[ item[ key ] ] = item
    })
    return obj
}


export function getObjectByKey<T extends Record<string, any>>(arr: T[], key: keyof T = 'id', searchKeyValue: any): T | null {
    const obj = arr.find(_obj => _obj[ key ] === searchKeyValue)
    return obj || null
}


/**
 * Метод транспонирует матрицу
 * @param matrix Матрица
 */
export const transposeMatrix = <T>(matrix: T[][]): T[][] => {
    // for (let i = 0; i < matrix.length; i++) {
    // 	for (let j = 0; j < i; j++) {
    // 		[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    // 	}
    // }
    // return matrix

    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]))
}

/**
 * Метод получает диапазон значений из массива в виде строки
 * @param arr Массив
 * @param delimeter Разделитель
 */
export const getRangeNumbers = (arr: number[], delimeter: string = '..'): string => {
    let range: number[] = []

    const min = Math.min(...arr)
    const max = Math.max(...arr)

    if (!isNaN(min)) range.push(min)
    if (!isNaN(max) && !isNaN(min) && min !== max) range.push(max)

    return range.join(delimeter)
}