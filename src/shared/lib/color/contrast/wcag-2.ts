import type { Color as ChromaColor } from "chroma-js"
import { getChromaColorByHex } from "../functions.ts";

export const scoresWCAG2 = {
    "AAA": "AAA",
    "AA": "AA",
    "A": "A",
    "Fail": "Fail",
} as const


export type ScoresWCAG2 = typeof scoresWCAG2[keyof typeof scoresWCAG2]

/**
 * Метод производит расчет контраста по правилу WCAG 2
 * @param foreground Передний цвет
 * @param background Задний цвет
 * @param decimals Количество знаков после запятой
 */
export const contrastWCAG2 = (foreground: ChromaColor, background: ChromaColor, decimals: number = 2): number => {
    const decimalNumber = Math.pow(10, decimals)
    const l1 = foreground.luminance()
    const l2 = background.luminance()
    const ratio = l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05)

    return Math.round((ratio + Number.EPSILON) * decimalNumber) / decimalNumber
}

export const contrastWCAG2ByHex = (foreground: string, background: string, decimals: number = 2) => {
    const foregroundColor: ChromaColor = getChromaColorByHex(foreground)
    const backgroundColor: ChromaColor = getChromaColorByHex(background)
    return contrastWCAG2(foregroundColor, backgroundColor, decimals)
}

/**
 * Метод возвращает доступность контраста
 * @param ratio Контраст WCAG 2
 * @param mode
 * @return AAA, AA, A, Fail
 */
export const scoreWCAG2 = (ratio: number, mode: string = 'small-text'): ScoresWCAG2 => {
    if (mode === 'small-text') {
        if (ratio >= 7.0) {
            return scoresWCAG2.AAA
        } else if (ratio >= 4.5) {
            return scoresWCAG2.AA
        } else if (ratio >= 3.0) {
            return scoresWCAG2.A
        } else {
            return scoresWCAG2.Fail
        }
    }

    if (mode === 'large-text') {
        if (ratio >= 4.5) {
            return scoresWCAG2.AAA
        } else if (ratio >= 3.0) {
            return scoresWCAG2.AA
        } else {
            return scoresWCAG2.Fail
        }
    }

    if (ratio >= 3.0) {
        return scoresWCAG2.AA
    } else {
        return scoresWCAG2.Fail
    }
}