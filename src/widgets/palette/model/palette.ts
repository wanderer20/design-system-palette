import type { Color } from "@/entities/color";
import type { Shade } from "@/entities/shade";
import type { InterpolationMode } from "chroma-js";
import type { ContrastDirection } from "@/entities/contrast";

export type PaletteColor = Color & {
    interpolation: InterpolationMode
    shades: Color[]
}

export type PaletteShade = Shade & {
    contrast?: {
        direction?: ContrastDirection
        summary?: {
            wcag2?: {
                ratio: string,
                allowed: boolean,
            },
            apca?: {
                ratio: string,
                allowed: boolean,
            }
        }
    }
}

export type Palette = {
    colors: PaletteColor[]
    shades: PaletteShade[]
}