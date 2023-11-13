import { buildProps, definePropType } from "@/shared/lib";
import type { ExtractPropTypes } from "vue";

export const contrastCheckerResultProps = buildProps({
    modelValue: {
        type: definePropType<boolean>([Boolean]),
        required: true,
    },
    label: {
        type: definePropType<string>([String]),
        required: true,
    },
    text: {
        type: definePropType<string>([String]),
    }
} as const)
export const contrastCheckerResultEmits = {} as const

export type ContrastCheckerResultProps = ExtractPropTypes<typeof contrastCheckerResultProps>
export type ContrastCheckerResultEmits = typeof contrastCheckerResultEmits