import { buildProps, definePropType, isBoolean } from "@/shared/lib";
import type { ExtractPropTypes } from "vue";
import type { InterpolationMode } from "chroma-js";

export type CreatePaletteColorFormData = {
    color: string,
    interpolation: InterpolationMode
}

export const createPaletteColorProps = buildProps({
    visible: {
        type: definePropType<boolean>([Boolean]),
        required: true,
    }
} as const)
export const createPaletteColorEmits = {
    'update:visible': (value: boolean) => isBoolean(value),
    'form:submit': (formData: CreatePaletteColorFormData) => true
} as const

export type CreatePaletteColorProps = ExtractPropTypes<typeof createPaletteColorProps>
export type CreatePaletteColorEmits = typeof createPaletteColorEmits