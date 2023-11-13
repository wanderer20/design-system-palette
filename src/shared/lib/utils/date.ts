import { zeroPad } from "./numbers.ts";
import { inRange } from "lodash";

/**
 * Метод получает предыдущий день (текущего года)
 * @param dayAndMonth
 */
export const getYesterday = (dayAndMonth: string) => {
    const arDayAndMonth: string[] = dayAndMonth.split('.')

    if (arDayAndMonth.length === 2) {
        const day: number = Number(arDayAndMonth[0])
        const month: number = Number(arDayAndMonth[1])


        console.log(`${day} - ${month}`)

        const date = new Date()
        date.setMonth(month-1, day)
        console.log(date)

        // TODO: сделать високосный год с 28/29 февраля
        date.setDate(date.getDate() - 1)
        console.log(date)

        return [
            zeroPad(date.getDate(), 2),
            zeroPad(date.getMonth()+1, 2)
        ].join('.')
    }

    return undefined
}

/**
 * Метод преобразовывает строку с датой в число для сравнения
 * @example Строка '01.02.2022' преобразуется в число 20220201; '01.02' в 201
 * @param {string} date Строка с датой
 */
export const convertDateToNumber = (date: string) => {
    const arDate = date.split('.').map(item => {
        return item.length < 2 ? zeroPad(Number(item), 2) : item
    }).reverse()

    return Number(arDate.join(''))
}

export const inStringRangeOfDaysAndMonths = (target: string, start: string, end: string) => {
    console.log(`${start} - ${target} - ${end}`)
    const targetNumber = convertDateToNumber(target)
    const startNumber = convertDateToNumber(start)
    const endNumber = convertDateToNumber(end)

    // TODO: ситуация когда между 10.12 - 19.01 (1210 - 119), нужно добавить к концу 31.12 (1231), и тогда сравнивать, то же касается прибавки к таргету (если он январский)
    console.log(`${startNumber} - ${targetNumber} - ${endNumber}`)
    return targetNumber >= startNumber && startNumber <= endNumber
}