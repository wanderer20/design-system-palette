import { computed, ref, toRefs } from "vue";
import type { SetupContext } from "vue";
import type { DropdownInstance } from "element-plus";
import type { ColorPickerEmits, ColorPickerProps } from "./color-picker.ts";

type VueColorKitColor = {
    hex: string,
    hsv: {
        h: number,
        s: number,
        v: number,
    },
    rgba: {
        r: number,
        g: number,
        b: number,
        a: number,
    }
}

export const useColorPicker = (props: ColorPickerProps, emit: SetupContext<ColorPickerEmits>['emit']) => {
    const {
        modelValue,
        size,
    } = toRefs(props)
    const dropdownRef = ref<DropdownInstance | undefined>(undefined)

    const isDropdownVisible = ref<boolean>(false)

    const inputValue = computed({
        get: () => modelValue.value,
        set: (val: string) => emit('update:modelValue', val)
    })

    const handleChangeColor = (pickerColor: VueColorKitColor) => {
        inputValue.value = pickerColor.hex
    }

    const handleChangeValue = (_value: string | number) => {
        inputValue.value = _value.toString()
    }

    const handleDropdownVisibleChange = (visible: boolean) => {
        isDropdownVisible.value = visible
    }

    return {
        size,
        inputValue,
        dropdownRef,
        isDropdownVisible,
        handleChangeColor,
        handleChangeValue,
        handleDropdownVisibleChange,
    }
}