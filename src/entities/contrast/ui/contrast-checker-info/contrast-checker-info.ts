import type { ExtractPropTypes } from "vue";

import { buildProps, definePropType } from "@/shared/lib";

export const contrastCheckerInfoModes = ['wcag2', 'apca'] as const

export type ContrastCheckerInfoModes = typeof contrastCheckerInfoModes[number]
export const contrastCheckerInfoProps = buildProps({
    foreground: {
        type: definePropType<string>([String]),
        required: true
    },
    background: {
        type: definePropType<string>([String]),
        default: '#FFFFFF'
    },
    mode: {
        type: definePropType<ContrastCheckerInfoModes>([String]),
        default: 'wcag2'
    }
} as const)

export const contrastCheckerInfoEmits = {} as const

export type ContrastCheckerInfoProps = ExtractPropTypes<typeof contrastCheckerInfoProps>
export type ContrastCheckerInfoEmits = typeof contrastCheckerInfoEmits

export type ContrastCheckerInfoResult = {
    label: string
    isSuccess: boolean
    text?: string
}