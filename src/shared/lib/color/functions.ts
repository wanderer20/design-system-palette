import chroma, { Color as ChromaColor } from "chroma-js";

export const getChromaColorByHex = (hex: string): ChromaColor => chroma(hex)

export const getLuminanceByHex = (hex: string): number => {
    const c: ChromaColor = getChromaColorByHex(hex)
    return c.luminance()
}

export const isNeedUseWhiteForeground = (hex: string): boolean => {
    const l = getLuminanceByHex(hex)
    return l < 0.3
}

export const isValidHex = (hex: string): boolean => chroma.valid(hex)