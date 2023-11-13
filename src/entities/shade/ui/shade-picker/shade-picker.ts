import type { ExtractPropTypes } from "vue";
import type { ComponentSize } from "element-plus";

import { buildProps, definePropType, isNumber } from "@/shared/lib";

export const shadePickerProps = buildProps({
    modelValue: {
        type: definePropType<number>([Number]),
        required: true,
    },
    size: {
        type: definePropType<ComponentSize>([String]),
        default: 'default'
    }
} as const)
export const shadePickerEmits = {
    'update:modelValue': (value: number) => isNumber(value)
} as const

export type ShadePickerProps = ExtractPropTypes<typeof shadePickerProps>
export type ShadePickerEmits = typeof shadePickerEmits