import type { SetupContext } from 'vue'
import type { ShadePickerProps, ShadePickerEmits } from "./shade-picker.ts";
import { toRefs } from "vue";
import { isNumber } from "@/shared/lib";

export const useShadePicker = (props: ShadePickerProps, emit: SetupContext<ShadePickerEmits>['emit']) => {
    const {
        modelValue,
        size
    } = toRefs(props)

    const handleChange = (currentValue: number | undefined, oldValue: number | undefined) => {
        if (isNumber(currentValue))
            emit('update:modelValue', currentValue)
        else if (isNumber(oldValue))
            emit('update:modelValue', oldValue)
    }

    return {
        size,
        modelValue,
        handleChange
    }
}