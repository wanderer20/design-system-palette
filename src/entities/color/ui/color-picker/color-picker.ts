import type { ExtractPropTypes } from "vue";
import { buildProps, definePropType, isString } from "@/shared/lib";
import type { ComponentSize } from "element-plus";

export const colorPickerProps = buildProps({
    modelValue: {
        type: definePropType<string>([String]),
        required: true,
    },
    size: {
        type: definePropType<ComponentSize>([String]),
        default: 'default'
    }
} as const)
export const colorPickerEmits = {
    'update:modelValue': (value: string) => isString(value)
} as const

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export type ColorPickerEmits = typeof colorPickerEmits