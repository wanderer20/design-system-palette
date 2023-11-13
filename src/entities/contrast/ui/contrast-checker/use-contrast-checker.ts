import type { SetupContext } from "vue";
import type { ContrastCheckerEmits, ContrastCheckerProps } from "./contrast-checker.ts";
import { computed, toRefs } from "vue";
import { scoreWCAG2, contrastAPCAByHex, contrastWCAG2ByHex, isNeedUseWhiteForeground} from "@/shared/lib";

export const useContrastChecker = (props: ContrastCheckerProps, emit: SetupContext<ContrastCheckerEmits>['emit']) => {
    const {
        modelValue,
        withColor,
        direction
    } = toRefs(props)

    const isDirect = computed<boolean>(() => direction.value === 'direct')


    const firstColor = computed<string>(() => isDirect.value ? modelValue.value : withColor.value)
    const secondColor = computed<string>(() => isDirect.value ? withColor.value : modelValue.value)

    const wcag2Ratio = computed<number>(() => contrastWCAG2ByHex(firstColor.value, secondColor.value))
    const apcaRatio = computed<number>(() => contrastAPCAByHex(firstColor.value, secondColor.value))

    return {
        firstColor,
        secondColor,
        direction,
        wcag2Ratio,
        apcaRatio,
        scoreWCAG2,
        isNeedUseWhiteForeground,
    }
}