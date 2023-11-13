import { computed, ref, toRefs } from "vue";

import type { SetupContext } from "vue";
import type {
    CreatePaletteShadeEmits,
    CreatePaletteShadeFormData,
    CreatePaletteShadeProps
} from "./create-palette-shade.ts";

export const useCreatePaletteShade = (props: CreatePaletteShadeProps, emit: SetupContext<CreatePaletteShadeEmits>['emit']) => {
    const {
        modelValue: _dialogVisible
    } = toRefs(props)

    const getDefaultFormData = (): CreatePaletteShadeFormData => {
        return {
            value: 0
        }
    }

    const isDialogVisible = computed<boolean>({
        get: () => _dialogVisible.value,
        set: (visible: boolean) => {
            emit('update:modelValue', visible)
        }
    })

    const formData = ref<CreatePaletteShadeFormData>(getDefaultFormData())

    const closeDialog = () => {
        isDialogVisible.value = false
    }

    const handleOpenDialog = () => {
        formData.value = getDefaultFormData()
    }

    const handleClosedDialog = () => {
        closeDialog()
    }

    const handleBtnFormSubmitClick = (evt: MouseEvent) => {
        evt.preventDefault()

        if (evt.currentTarget instanceof HTMLElement) {
            evt.currentTarget.blur()
        }

        emit('form:submit', formData.value)
        closeDialog()
    }

    const handleBtnFormCancelClick = (evt: MouseEvent) => {
        evt.preventDefault()

        if (evt.currentTarget instanceof HTMLElement) {
            evt.currentTarget.blur()
        }

        closeDialog()
    }

    return {
        formData,
        isDialogVisible,
        handleOpenDialog,
        handleClosedDialog,
        handleBtnFormSubmitClick,
        handleBtnFormCancelClick,
    }
}