/**
 * Метод округляет число
 * @param num Число, которое нужно округлить
 * @param decimals Количество знаков после запятой
 */
export const round = (num: number, decimals: number = 0): number => {
    const decimalNumber = Math.pow(10, decimals)
    return Math.round((num + Number.EPSILON) * decimalNumber) / decimalNumber
}