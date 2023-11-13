import { toRefs } from "vue";
import type { SetupContext } from "vue";

import type { ContrastCheckerResultEmits, ContrastCheckerResultProps } from "./contrast-checker-result.ts";

export const useContrastCheckerResult = (props: ContrastCheckerResultProps, emit: SetupContext<ContrastCheckerResultEmits>['emit']) => {
    const { modelValue: isSuccess, label, text } = toRefs(props)

    return {
        isSuccess,
        label,
        text
    }
}