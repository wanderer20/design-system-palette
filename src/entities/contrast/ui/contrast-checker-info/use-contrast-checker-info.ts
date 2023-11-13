import {computed, toRefs} from "vue";

import type { SetupContext } from "vue";
import type {
    ContrastCheckerInfoEmits,
    ContrastCheckerInfoProps,
    ContrastCheckerInfoResult
} from "./contrast-checker-info.ts";
import {
    contrastAPCAByHex,
    contrastAPCAFontSizes,
    contrastWCAG2ByHex,
    scoreAPCA, scoresAPCA,
    scoresWCAG2,
    scoreWCAG2
} from "@/shared/lib";

export const useContrastCheckerInfo = (props: ContrastCheckerInfoProps, emit: SetupContext<ContrastCheckerInfoEmits>['emit']) => {
    const { foreground, background, mode} = toRefs(props)

    const score = computed<number>(() => {
        let _res = 0
        if (mode.value === 'wcag2') {
            _res = contrastWCAG2ByHex(foreground.value, background.value)
        }
        if (mode.value === 'apca') {
            _res = contrastAPCAByHex(foreground.value, background.value)
        }

        return _res
    })

    const value = computed<string>(() => {
        let resultString = ''
        if (mode.value === 'wcag2') {
            resultString = `${score.value}:1`
        }
        if (mode.value === 'apca') {
            resultString = `Lc ${score.value}`
        }

        return resultString
    })
    const results = computed<ContrastCheckerInfoResult[]>(() => {
        const _res: ContrastCheckerInfoResult[] = []

        if (mode.value === 'wcag2') {
            const modes: Record<string, string> = {
                'small-text': 'Small text',
                'large-text': 'Large text',
                'ui': 'UI components'
            }

            for (const [mode, label] of Object.entries(modes)) {
                const scoreResult = scoreWCAG2(score.value, mode)
                _res.push({
                    label: label,
                    isSuccess: scoreResult !== scoresWCAG2.Fail,
                    text: scoreResult
                })
            }
        }

        if (mode.value === 'apca') {
            const fontSizes = contrastAPCAFontSizes(score.value)
            const scoreResult = scoreAPCA(score.value)

            _res.push({
                label: 'Level',
                isSuccess: scoreResult !== scoresAPCA.Fail,
                text: scoreResult
            })

            for (const font of fontSizes) {
                _res.push({
                    label: font["font-weight"],
                    isSuccess: font["font-size"] !== null,
                    text: font["font-size"] ?? 'Fail'
                })
            }
        }

        return _res
    })

    return {
        foreground,
        background,
        mode,
        value,
        results,
    }
}