import { buildProps, definePropType } from "@/shared/lib/utils";
import type { ExtractPropTypes } from 'vue'
import type Icon from './icon.vue'

export const iconProps = buildProps({
    size: {
        type: definePropType<number | string>([Number, String]),
        default: 24
    },
    color: {
        type: String,
        default: 'currentColor'
    }
} as const)

export const iconEmits = {}

export type IconProps = ExtractPropTypes<typeof iconProps>
export type IconEmits = typeof iconEmits
export type IconInstance = InstanceType<typeof Icon>