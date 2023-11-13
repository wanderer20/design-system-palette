import { computed, toRefs } from "vue";
import { ElMessage } from "element-plus";

import type { PaletteColorPreviewEmits, PaletteColorPreviewProps } from "./palette-color-preview.ts";
import type { SetupContext } from "vue";

import { contrastAPCAByHex, contrastWCAG2ByHex, isNeedUseWhiteForeground, scoreAPCA, scoreWCAG2 } from "@/shared/lib";
import type { ContrastData } from "@/entities/contrast";

export const usePaletteColorPreview = (props: PaletteColorPreviewProps, emit: SetupContext<PaletteColorPreviewEmits>['emit']) => {
    const {
        modelValue: color,
        contrastWith: colorContrastWith,
        contrastDirection,
        active,
        selectionMode,
    } = toRefs(props)

    const contrastData = computed<ContrastData>(() => {
        const foreground = contrastDirection.value === 'direct' ? color.value : colorContrastWith.value
        const background = contrastDirection.value === 'direct' ? colorContrastWith.value : color.value

        const wcag2Ratio = contrastWCAG2ByHex(foreground, background)
        const wcag2Score = scoreWCAG2(wcag2Ratio)

        const apcaRatio = contrastAPCAByHex(foreground, background)
        const apcaScore = scoreAPCA(apcaRatio)

        return {
            wcag2: {
                ratio: wcag2Ratio,
                score: wcag2Score,
            },
            apca: {
                ratio: apcaRatio,
                score: apcaScore,
            }
        } as ContrastData
    })

    const handleColorCopyClick = async (evt: MouseEvent) => {
        evt.preventDefault()

        if (evt.currentTarget instanceof HTMLElement) {
            evt.currentTarget.blur()
        }

        try {
            await navigator.clipboard.writeText(color.value)

            ElMessage({
                message: `Цвет ${color.value} успешно скопирован`,
                type: 'success'
            })
        } catch (err) {
            ElMessage({
                message: `Цвет ${color.value} не скопирован. Ошибка ${err}`,
                type: 'error'
            })

            console.error(err)
        }
    }

    const handleClick = (evt: MouseEvent) => {
        evt.preventDefault()

        if (evt.currentTarget instanceof HTMLElement) {
            evt.currentTarget.blur()
        }

        emit('click', evt, color.value)
    }

    return {
        color,
        colorContrastWith,
        active,
        contrastData,
        contrastDirection,
        selectionMode,
        isNeedUseWhiteForeground,
        handleColorCopyClick,
        handleClick,
    }
}