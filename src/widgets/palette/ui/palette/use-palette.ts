import {computed, Ref, ref, watch} from "vue";
import type { SetupContext } from "vue";

import type { PaletteEmits, PaletteProps } from "./palette.ts";
import {type Color, defaultColors, toColorModelFromHex} from "@/entities/color";
import { type Shade, defaultShades } from "@/entities/shade";
import type { PaletteColor, PaletteShade} from "../../model";
import {InterpolationMode} from "chroma-js";
import {generatePaletteColor} from "../../lib";
import {useUrlParams} from "../../hooks";
import {
    contrastAPCAByHex,
    contrastWCAG2ByHex, getRangeNumbers,
    interpolationModes,
    scoreAPCA, ScoresAPCA, scoresAPCA, ScoresWCAG2, scoresWCAG2,
    scoreWCAG2,
    transposeMatrix
} from "@/shared/lib";
import {ContrastData, ContrastDirection} from "@/entities/contrast";
import type { CreatePaletteColorFormData } from "@/features/create-palette-color";
import {CreatePaletteShadeFormData} from "@/features/create-palette-shade";

export const usePalette = (props: PaletteProps, emit: SetupContext<PaletteEmits>['emit']) => {
    const {
        colors: urlColors,
        interpolations: urlInterpolations,
        shades: urlShades,
    } = useUrlParams()


    const _colors: Ref<Color[]> = ref<Color[]>(urlColors.value.length ? urlColors.value : defaultColors)
    const _shades: Ref<Shade[]> = ref<Shade[]>(urlShades.value.length ? urlShades.value : defaultShades)
    const _interpolations: Ref<InterpolationMode[]> = ref<InterpolationMode[]>(urlInterpolations.value.length ? urlInterpolations.value : _colors.value.map((): InterpolationMode => 'oklab'))

    const colorContrastVariants = ref([
        { name: 'Белый', code: 'white', value: '#ffffff', active: true },
        { name: 'Черный', code: 'black', value: '#000000', active: false },
        { name: 'Из палитры', code: 'custom', value: '', active: false }
    ])

    const activeColorContrastVariantCode = computed({
        get: () => {
            const index = colorContrastVariants.value.findIndex(x => x.active)
            if (index !== -1)
                return colorContrastVariants.value[index].code

            return 'white'
        },
        set: (code: string) => {
            const index = colorContrastVariants.value.findIndex(x => x.code === code)

            if (index !== -1) {
                colorContrastVariants.value.forEach((x, i) => {
                    x.active = index === i
                })
            }
        }
    })


    const colorContrast = ref<string>('#ffffff')
    const createPaletteColorDialogVisible = ref<boolean>(false)
    const createPaletteShadeDialogVisible = ref<boolean>(false)

    const getActiveColorContrastValue = () => {
        const index = colorContrastVariants.value.findIndex(x => x.active)

        if (index !== -1) {
            return colorContrastVariants.value[index].value
        }

        return null
    }

    const setCustomColorContrastValue = (hex: string) => {
        const index = colorContrastVariants.value.findIndex(x => x.code === 'custom')
        if (index !== -1) {
            colorContrastVariants.value[index].value = hex
        }
    }




    const paletteContrastDirectionVariants = ref([
        { name: 'Задний фон', code: 'direct' },
        { name: 'Передний фон', code: 'reverse' }
    ])

    const paletteContrastDirection = ref<ContrastDirection>('direct')

    const selectedColors = ref<string[]>([])
    const isSelectedMode = ref<boolean>(false)
    const isChooseContrastMode = ref<boolean>(false)

    const getShades = (): Shade[] => {
        return _shades.value.map((_s) => {
            return { ..._s }
        })
    }
    const getColors = (): PaletteColor[] => {
        return _colors.value.map((_c, i) => {
            return generatePaletteColor(_c, _shades.value, _interpolations.value[i])
        })
    }

    const shades = ref<PaletteShade[]>(getShades())
    const colors = ref<PaletteColor[]>(getColors())

    const isPaletteContrastDirect = computed<boolean>(() => paletteContrastDirection.value === 'direct')


    const updateShadesContrastData = () => {
        const matrix = transposeMatrix(colors.value.map((_color, i) => {
            return _color.shades.map((_shadeColor, j) => {
                const foreground = isPaletteContrastDirect.value ? _shadeColor.hex : colorContrast.value
                const background = isPaletteContrastDirect.value ? colorContrast.value : _shadeColor.hex

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
        }))

        const isAllowedWCAG2 = (scores: ScoresWCAG2[]): boolean => !scores.includes(scoresWCAG2.Fail)
        const isAllowedAPCA = (scores: ScoresAPCA[]): boolean => !scores.includes(scoresAPCA.Fail)

        if (shades.value.length === matrix.length) {
            shades.value.forEach((shade: PaletteShade, index) => {
                const wcag2Ratios = getRangeNumbers(matrix[index].map((x) => x.wcag2?.ratio || 0))
                const wcag2Scores = matrix[index].map((x => x.wcag2?.score || scoresWCAG2.Fail))

                const apcaRatios = getRangeNumbers(matrix[index].map((x) => x.apca?.ratio || 0))
                const apcaScores = matrix[index].map((x) => x.apca?.score || scoresAPCA.Fail)

                shade.contrast = {
                    direction: paletteContrastDirection.value,
                    summary: {
                        wcag2: {
                            ratio: wcag2Ratios,
                            allowed: isAllowedWCAG2(wcag2Scores)
                        },
                        apca: {
                            ratio: apcaRatios,
                            allowed: isAllowedAPCA(apcaScores)
                        }
                    }
                }
            })
        }
    }

    const isSelectedColor = (hex: string) => {
        const index = selectedColors.value.findIndex(x => x === hex)
        return index !== -1;
    }

    const resetSelectedColors = () => {
        selectedColors.value = []
    }

    const activateSelectedMode = () => {
        resetSelectedColors()
        isSelectedMode.value = true
    }

    const deactivateSelectedMode = () => {
        resetSelectedColors()
        isSelectedMode.value = false
    }

    const activateChooseContrastMode = () => {
        resetSelectedColors()
        isChooseContrastMode.value = true
    }
    const deactivateChooseContrastMode = () => {
        resetSelectedColors()
        isChooseContrastMode.value = false
    }

    const updateColors = () => {
        colors.value.forEach((_c) => {
            _c.shades = generatePaletteColor({ hex: _c.hex }, _shades.value, _c.interpolation).shades
        })


        updateShadesContrastData()
    }

    const handleBtnCreatePaletteShadeClick = (evt: MouseEvent) => {
        evt.preventDefault()

        if (evt.currentTarget instanceof HTMLElement) {
            evt.currentTarget.blur()
        }

        createPaletteShadeDialogVisible.value = true
    }

    const onUpdateCreatePaletteShadeDialogVisible = (value: boolean) => {
        createPaletteShadeDialogVisible.value = value
    }

    const handleCreatePaletteShade = (formData: CreatePaletteShadeFormData) => {
        shades.value.push({
            value: formData.value
        })
    }

    const handleBtnCreatePaletteColorClick = (evt: MouseEvent) => {
        evt.preventDefault()

        if (evt.currentTarget instanceof HTMLElement) {
            evt.currentTarget.blur()
        }

        createPaletteColorDialogVisible.value = true
    }

    const onUpdatePaletteColorVisible = (value: boolean) => {
        createPaletteColorDialogVisible.value = value
    }

    const handleCreatePaletteColor = (formData: CreatePaletteColorFormData) => {
        colors.value.push({
            hex: formData.color,
            interpolation: formData.interpolation,
            shades: []
        })
    }

    const handleBtnRemovePaletteColorClick = (evt: MouseEvent, index: number) => {
        evt.preventDefault()

        if (evt.currentTarget instanceof HTMLElement) {
            evt.currentTarget.blur()
        }

        if (index > -1) {
            colors.value.splice(index, 1)
        }
    }

    const handleBtnRemovePaletteShadeClick = (evt: MouseEvent, index: number) => {
        evt.preventDefault()

        if (evt.currentTarget instanceof HTMLElement) {
            evt.currentTarget.blur()
        }

        if (index > -1) {
            shades.value.splice(index, 1)
        }
    }

    const handleBtnChooseContrastColorClick = (evt: MouseEvent) => {
        evt.preventDefault()

        if (evt.currentTarget instanceof HTMLElement) {
            evt.currentTarget.blur()
        }

        activateSelectedMode()
        activateChooseContrastMode()
    }

    const handleBtnSelectedModeCloseClick = (evt: MouseEvent) => {
        evt.preventDefault()

        if (evt.currentTarget instanceof HTMLElement) {
            evt.currentTarget.blur()
        }

        deactivateSelectedMode()
    }

    const handlePaletteColorPreviewClick = (evt: MouseEvent, color: string) => {
        evt.preventDefault()

        if (evt.currentTarget instanceof HTMLElement) {
            evt.currentTarget.blur()
        }

        if (isSelectedMode.value) {
            const colorIndex = selectedColors.value.findIndex(x => x === color)

            if (colorIndex === -1)
                selectedColors.value.push(color)
        }
    }

    const handleBtnSelectedColorsRemoveClick = (evt: MouseEvent, index: number) => {
        evt.preventDefault()

        if (evt.currentTarget instanceof HTMLElement) {
            evt.currentTarget.blur()
        }

        if (index > -1) {
            selectedColors.value.splice(index, 1)
        }
    }

    watch(() => isSelectedMode.value, () => {
        if (isSelectedMode.value === false && isChooseContrastMode.value === true) {
            deactivateChooseContrastMode()
        }
    }, {
        immediate: true
    })

    watch(() => [...selectedColors.value], (colors) => {
        if (isSelectedMode.value === true && isChooseContrastMode.value === true && colors.length) {
            const firstColor = colors[0]
            setCustomColorContrastValue(firstColor)
            deactivateChooseContrastMode()
            deactivateSelectedMode()
        }
    })

    watch(() => ([...shades.value.map((_s) => _s.value)]), (newShades) => {
        const shadesList = newShades.map((shade) => {
            return { value: shade }
        })

        _shades.value = shadesList
        urlShades.value = shadesList

        updateColors()
    }, {
        immediate: true,
        deep: true,
    })

    watch(() => ([...colors.value.map((_c) => _c.hex)]), (newHexes) => {
        const colorList: Color[] = newHexes.map((hex) => {
            return { hex }
        })

        _colors.value = colorList
        urlColors.value = colorList

        updateColors()
    }, {
        immediate: true,
        deep: true
    })

    watch(() => ([...colors.value.map((_c) => _c.interpolation)]), (newInterpolations) => {
        const interpolationList: InterpolationMode[] = newInterpolations.map((interpolation) => {
            return interpolation
        })

        _interpolations.value = interpolationList
        urlInterpolations.value = interpolationList

        updateColors()
    }, {
        immediate: true,
        deep: true
    })

    watch(() => colorContrastVariants.value, () => {
        const activeColorContrast = getActiveColorContrastValue()
        if (activeColorContrast !== null) {
            colorContrast.value = activeColorContrast

            updateShadesContrastData()
        }
    }, {
        immediate: true,
        deep: true,
    })

    watch(() => paletteContrastDirection.value, () => {
        updateShadesContrastData()
    }, {
        immediate: true,
    })


    return {
        colors,
        shades,
        urlColors,
        colorContrast,
        colorContrastVariants,
        activeColorContrastVariantCode,
        paletteContrastDirection,
        paletteContrastDirectionVariants,
        selectedColors,
        isSelectedMode,
        isChooseContrastMode,
        createPaletteColorDialogVisible,
        createPaletteShadeDialogVisible,
        onUpdatePaletteColorVisible,
        onUpdateCreatePaletteShadeDialogVisible,
        interpolationModes,
        isSelectedColor,
        handleBtnCreatePaletteColorClick,
        handleBtnCreatePaletteShadeClick,
        handleBtnRemovePaletteColorClick,
        handleBtnRemovePaletteShadeClick,
        handleBtnChooseContrastColorClick,
        handleBtnSelectedModeCloseClick,
        handlePaletteColorPreviewClick,
        handleBtnSelectedColorsRemoveClick,
        handleCreatePaletteColor,
        handleCreatePaletteShade,
    }
}