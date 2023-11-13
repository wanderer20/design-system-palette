import { buildProps } from "@/shared/lib";
import type { ExtractPropTypes } from "vue";

export const paletteProps = buildProps({})
export const paletteEmits = {}

export type PaletteProps = ExtractPropTypes<typeof paletteProps>
export type PaletteEmits = typeof paletteEmits