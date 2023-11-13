import { buildProps, definePropType, isBoolean } from "@/shared/lib";
import type { ExtractPropTypes } from "vue";

export type CreatePaletteShadeFormData = {
    value: number
}

export const createPaletteShadeProps = buildProps({
    modelValue: {
        type: definePropType<boolean>([Boolean]),
        required: true
    }
} as const)
export const createPaletteShadeEmits = {
    'update:modelValue': (value: boolean) => isBoolean(value),
    'form:submit': (formData: CreatePaletteShadeFormData) => true
} as const

export type CreatePaletteShadeProps = ExtractPropTypes<typeof createPaletteShadeProps>
export type CreatePaletteShadeEmits = typeof createPaletteShadeEmits