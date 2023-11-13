import type { ExtractPropTypes } from "vue";

import { buildProps, definePropType } from "@/shared/lib";
import type { ContrastDirection } from "@/entities/contrast";

export const paletteColorPreviewProps = buildProps({
    modelValue: {
        type: definePropType<string>([String]),
        required: true
    },
    contrastWith: {
        type: definePropType<string>([String]),
        default: '#FFFFFF'
    },
    contrastDirection: {
        type: definePropType<ContrastDirection>([String]),
        default: 'direct'
    },
    selectionMode: {
        type: definePropType<boolean>([Boolean]),
        default: false,
    },
    active: {
        type: definePropType<boolean>([Boolean]),
    }
} as const)
export const paletteColorPreviewEmits = {
    'click': (evt: MouseEvent, hex: string) => evt instanceof MouseEvent
} as const

export type PaletteColorPreviewProps = ExtractPropTypes<typeof paletteColorPreviewProps>
export type PaletteColorPreviewEmits = typeof paletteColorPreviewEmits