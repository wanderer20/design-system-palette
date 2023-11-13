import { buildProps, definePropType } from "@/shared/lib";
import type { ExtractPropTypes } from "vue";
import type { ContrastDirection } from "../../model";


export const contrastCheckerProps = buildProps({
    modelValue: {
        type: definePropType<string>([String]),
        required: true
    },
    withColor: {
        type: definePropType<string>([String]),
        default: '#FFFFFF'
    },
    direction: {
        type: definePropType<ContrastDirection>([String]),
        default: 'direct'
    }
} as const)
export const contrastCheckerEmits = {} as const


export type ContrastCheckerProps = ExtractPropTypes<typeof contrastCheckerProps>
export type ContrastCheckerEmits = typeof contrastCheckerEmits