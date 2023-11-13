import { useUrlSearchParams } from "@vueuse/core"
import {isEmpty, isString, isUndefined} from "@/shared/lib";
import { type Color, toColorModelFromHex } from "@/entities/color";
import type { InterpolationMode } from "chroma-js";
import type { Shade } from "@/entities/shade";
import { type Ref, ref, watch } from "vue";

export const useUrlParams = () => {
    const urlSearchParams = useUrlSearchParams()

    const {
        palette_colors,
        palette_interpolations,
        palette_shades
    } = urlSearchParams

    const colors: Ref<Color[]> = ref<Color[]>(!isUndefined(palette_colors) && isString(palette_colors) && !isEmpty(palette_colors) ?
        palette_colors.split(',').reduce((_colors: Color[], hex: string) => {
            _colors.push(toColorModelFromHex(hex))
            return _colors
        }, []) : [])

    const interpolations: Ref<InterpolationMode[]> = ref<InterpolationMode[]>(!isUndefined(palette_interpolations) && isString(palette_interpolations) && !isEmpty(palette_interpolations) ?
        palette_interpolations.split(',').reduce((_interpolations: InterpolationMode[], interpolation: string) => {
            _interpolations.push(interpolation as InterpolationMode)
            return _interpolations
        }, []) : [])

    const shades: Ref<Shade[]> = ref<Shade[]>(!isUndefined(palette_shades) && isString(palette_shades) && !isEmpty(palette_shades)?
        palette_shades.split(',').reduce((_shades: Shade[], shade: string) => {
            _shades.push({
                value: Number(shade)
            })
            return _shades
        }, []) : [])

    watch(() => colors.value, () => {
        urlSearchParams.palette_colors = colors.value.map(c => c.hex).join(',')
    }, {
        immediate: true,
        deep: true,
    })

    watch(() => interpolations.value, () => {
        urlSearchParams.palette_interpolations = interpolations.value.join(',')
    }, {
        immediate: true,
        deep: true,
    })

    watch(() => shades.value, () => {
        urlSearchParams.palette_shades = shades.value.map(s => s.value).join(',')
    }, {
        immediate: true,
        deep: true,
    })

    return {
        colors,
        interpolations,
        shades,
    }
}