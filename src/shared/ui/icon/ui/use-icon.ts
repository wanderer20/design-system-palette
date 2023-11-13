import type { IconEmits, IconProps } from "./icon.ts";
import type {CSSProperties, SetupContext} from "vue";
import {computed, toRefs} from "vue";
import {addUnit, isUndefined} from "@/shared/lib/utils";

export const useIcon = (props: IconProps, emit: SetupContext<IconEmits>['emit']) => {
    const { size, color } = toRefs(props)

    const style = computed<CSSProperties>(() => {
        const result: Record<string, any> = {}

        if (size.value && !isUndefined(size.value)) {
            result['--size'] = addUnit(size.value)
        }

        if (color.value) {
            result['color'] = color.value
        }

        return result
    })

    return {
        style
    }
}