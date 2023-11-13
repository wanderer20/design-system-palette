import { calcAPCA } from "apca-w3"
import { getChromaColorByHex } from "../functions.ts";
import type { Color as ChromaColor } from "chroma-js"

export const fontAPCAContrastTableSizes = [
    '12px',
    '14px',
    '15px',
    '16px',
    '18px',
    '21px',
    '24px',
    '28px',
    '32px',
    '36px',
    '42px',
    '48px',
    '60px',
    '72px',
    '96px',
]

export const fontAPCAContrastTableWeights = [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
]
export const fontAPCAContrastTable = [
    [       0,      0,      0,      0,      0,      0,      0,      0,      0   ],
    [       0,      0,      0,      100,    100,    90,     75,     0,      0   ],
    [       0,      0,      0,      100,    90,     75,     70,     0,      0   ],
    [       0,      0,      0,      90,     75,     70,     60,     60,     0   ],
    [       0,      0,      100,    75,     70,     60,     55,     55,     55  ],
    [       0,      0,      90,     70,     60,     55,     50,     50,     50  ],
    [       0,      0,      75,     60,     55,     50,     45,     45,     45  ],
    [       0,      100,    70,     55,     50,     45,     43,     43,     43  ],
    [       0,      90,     65,     50,     45,     43,     40,     40,     40  ],
    [       0,      75,     60,     45,     43,     40,     38,     38,     38  ],
    [       100,    70,     55,     43,     40,     38,     35,     35,     35  ],
    [       90,     60,     50,     40,     38,     35,     33,     33,     33  ],
    [       75,     55,     45,     38,     35,     33,     30,     30,     30  ],
    [       60,     50,     40,     35,     33,     30,     30,     30,     30  ],
    [       50,     45,     35,     33,     30,     30,     30,     30,     30  ],
]

export const scoresAPCA = {
    "Gold": "Gold",
    "Silver": "Silver",
    "Bronze": "Bronze",
    "Fail": "Fail",
} as const

export type ScoresAPCA = typeof scoresAPCA[keyof typeof scoresAPCA]

/**
 * Метод производит расчет контраста по APCA
 * @param foreground Передний цвет
 * @param background Задний цвет
 * @param decimals Количество знаков после запятой
 */
export const contrastAPCA = (foreground: ChromaColor, background: ChromaColor, decimals: number = 2): number => {
    const decimalNumber = Math.pow(10, decimals)
    return Math.round((Number(calcAPCA(foreground.hex(), background.hex())) + Number.EPSILON) * decimalNumber) / decimalNumber
}

export const contrastAPCAByHex = (foreground: string, background: string, decimals: number = 2): number => {
    const foregroundColor: ChromaColor = getChromaColorByHex(foreground)
    const backgroundColor: ChromaColor = getChromaColorByHex(background)
    return contrastAPCA(foregroundColor, backgroundColor, decimals)
}

/**
 * Метод возвращает уровень контраста по APCA
 * @param _ratio Контраст
 * @return Bronze, Silver, Gold, Fail
 */
export const scoreAPCA = (_ratio: number): ScoresAPCA => {
    const ratio = Math.abs(_ratio)
    if (ratio >= 90) {
        return scoresAPCA.Gold
    } else if (ratio >= 75) {
        return scoresAPCA.Silver
    } else if (ratio >= 60) {
        return scoresAPCA.Bronze
    } else {
        return scoresAPCA.Fail
    }
}

export const contrastAPCAFontSizeByWeight = (lightnessContrast: number, fontWeight: string) => {
    const columnIndex = fontAPCAContrastTableWeights.findIndex((_fontWeight) => _fontWeight === fontWeight)

    if (columnIndex > -1) {
        const weightScores = fontAPCAContrastTable.map((row) => row[columnIndex])
        const sizeIndex = weightScores.findIndex((score) => score !== 0 && score >= lightnessContrast)

        if (sizeIndex > -1) {
            return fontAPCAContrastTableSizes[sizeIndex]
        }
    }

    return null
}

export const contrastAPCAFontSizes = (lightnessContrast: number) => {
    return fontAPCAContrastTableWeights.map((fontWeight) => {
        return {
            'font-weight': fontWeight,
            'font-size': contrastAPCAFontSizeByWeight(lightnessContrast, fontWeight)
        }
    })
}