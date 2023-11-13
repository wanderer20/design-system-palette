import chroma, { Color as ChromaColor } from 'chroma-js'
import { contrastAPCA, contrastWCAG2, getChromaColorByHex } from "@/shared/lib";
import type { Color } from "../model";

export const toColorModelFromHex = (hex: string): Color => {
    return {
        hex: hex
    }
}

export const toColorModelFromChromaColor = (chromaColor: ChromaColor): Color => {
    return {
        hex: chromaColor.hex()
    }
}

export const fromColorModelToChromaColor = (color: Color): ChromaColor => {
    return chroma(color.hex)
}

/**
 * Метод производит расчет контраста по правилу WCAG 2 на основе chroma.Color
 * @param foreground Передний цвет в формате chroma.Color
 * @param background Задний цвет в формате chroma.Color
 * @param decimals Количество знаков после запятой
 */
export const getWCAG2ContrastByChromaColor = (foreground: ChromaColor, background: ChromaColor, decimals: number = 2): number => {
    return contrastWCAG2(foreground, background, decimals)
}

/**
 * Метод производит расчет контраста по правилу WCAG 2 на основе HEX значений
 * @param foreground Передний цвет в формате HEX
 * @param background Задний цвет в формате HEX
 * @param decimals Количество знаков после запятой
 */
export const getWCAG2ContrastByHex = (foreground: string, background: string, decimals: number = 2): number => {
    const foregroundChromaColor: ChromaColor = getChromaColorByHex(foreground)
    const backgroundChromaColor: ChromaColor = getChromaColorByHex(background)
    return getWCAG2ContrastByChromaColor(foregroundChromaColor, backgroundChromaColor, decimals)
}

/**
 * Метод производит расчет контраста по APCA на основе chroma.Color
 * @param foreground Передний цвет в формате chroma.Color
 * @param background Задний цвет в формате chroma.Color
 * @param decimals Количество знаков после запятой
 */
export const getAPCAContrastByChromaColor = (foreground: ChromaColor, background: ChromaColor, decimals: number = 2): number => {
    return contrastAPCA(foreground, background, decimals)
}

/**
 * Метод производит расчет контраста по APCA на основе HEX значений
 * @param foreground Передний цвет в формате HEX
 * @param background Задний цвет в формате HEX
 * @param decimals Количество знаков после запятой
 */
export const getAPCAContrastByHex = (foreground: string, background: string, decimals: number = 2): number => {
    const foregroundChromaColor: ChromaColor = getChromaColorByHex(foreground)
    const backgroundChromaColor: ChromaColor = getChromaColorByHex(background)
    return getAPCAContrastByChromaColor(foregroundChromaColor, backgroundChromaColor, decimals)
}