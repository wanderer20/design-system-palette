import type { PaletteColor } from "../model/palette.ts";
import chroma, { InterpolationMode } from "chroma-js";
import type { Shade } from "@/entities/shade";
import type { Color } from "@/entities/color";
import { toColorModelFromChromaColor } from "@/entities/color";

export const generatePaletteColor = (color: Color, shades: Shade[], interpolation: InterpolationMode = 'rgb'): PaletteColor => {
    const _shades: Color[] = shades.map((shade) => {
        const { value } = shade
        const f = chroma.scale([
            'black',
            color.hex,
            'white'
        ]).mode(interpolation).correctLightness(true)
        const _color = f(value / 100)

        return toColorModelFromChromaColor(_color)
    })

    return {
        hex: color.hex,
        interpolation: interpolation,
        shades: _shades
    }
}