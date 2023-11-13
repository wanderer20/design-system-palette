import { isUndefined } from "./types.ts";

export const isOdd = (x: number): boolean => Boolean(x % 2)
export const isEven = (x: number): boolean => !isOdd(x)

/**
 * Метод преобразует строку с диапазоном в объект с минимальной и максимальной границей.
 * Если строка пуста или в строке больше разделителей на диапазоны "-", то вернет undefined
 * @example
 * Строку '4' преобразует в { min: 4, max: 4 };
 * Строку '1-3' преобразует в { min: 1, max: 3 }
 * @param {string} str Строка с диапазоном
 */
export const getRangeFromString = (str: string): { min: number, max: number } | undefined => {
    const arRange: string[] = str.split('-')

    if (str !== '' && arRange.length > 0 && arRange.length <= 2) {
        return {
            min: Number(arRange[0]),
            max: arRange.length === 1 ? Number(arRange[0]) : Number(arRange[1])
        }
    }

    return undefined
}

/**
 * Метод проверяет находится ли число в заданном диапазоне через строку
 * @param {number} number Число для проверки
 * @param {string} range Диапазон для проверки в виде строки. Примеры: '4', '1-3'
 * @return Результат проверки. В том случае, если не получится считать диапазон из строки, то вернет false
 */
export const inTextRange = (number: number, range: string): boolean => {
    const obRange = getRangeFromString(range)

    if (!isUndefined(obRange)) {
        return number >= obRange.min && number <= obRange.max
    }

    return false
}

/**
 * Метод добавляет лидирующие нули к числу
 * @param {number} number Число
 * @param {number} size Количество лидирующих нулей
 */
export const zeroPad = (number: number, size: number): string => {
    return String(number).padStart(size, '0')
}