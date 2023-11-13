import type { SetupContext } from "vue";
import type { CreatePaletteColorEmits, CreatePaletteColorProps } from "./create-palette-color.ts";
import {computed, ref, toRefs} from "vue";
import { interpolationModes } from "@/shared/lib";
import chroma from "chroma-js";
import { CreatePaletteColorFormData } from "./create-palette-color.ts";

export const useCreatePaletteColor = (props: CreatePaletteColorProps, emit: SetupContext<CreatePaletteColorEmits>['emit']) => {
    const {
        visible: _isDialogVisible
    } = toRefs(props)

    const getDefaultFormData = (): CreatePaletteColorFormData => {
        return {
            color: chroma.random().hex(),
            interpolation: 'oklab'
        }
    }

    const isDialogVisible = computed({
        get: () => _isDialogVisible.value,
        set: (visible: boolean) => {
            emit('update:visible', visible)
        }
    })

    const formData = ref<CreatePaletteColorFormData>(getDefaultFormData())

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
        interpolationModes,
        isDialogVisible,
        handleOpenDialog,
        handleClosedDialog,
        handleBtnFormSubmitClick,
        handleBtnFormCancelClick,
    }
}