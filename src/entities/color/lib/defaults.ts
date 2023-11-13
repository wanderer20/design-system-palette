import type { Color } from '../model'
import { toColorModelFromHex } from "./functions.ts";

const defaultHexes: string[] = [
    '#FE6F5C',
    '#F8D147',
    '#56D25B',
    '#0088CB',
    '#387AE6',
    '#66788E',
    '#808080',
]

export const defaultColors: Color[] = defaultHexes.map((hex: string) => toColorModelFromHex(hex))