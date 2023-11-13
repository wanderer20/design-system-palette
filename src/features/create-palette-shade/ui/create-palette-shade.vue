<script setup lang="ts">
import { createPaletteShadeEmits, createPaletteShadeProps } from "./create-palette-shade.ts";
import { useCreatePaletteShade } from "./use-create-palette-shade.ts";
import { CShadePicker } from "@/entities/shade";

const props = defineProps(createPaletteShadeProps)
const emit = defineEmits(createPaletteShadeEmits)

const {
  formData,
  isDialogVisible,
  handleOpenDialog,
  handleClosedDialog,
  handleBtnFormSubmitClick,
  handleBtnFormCancelClick
} = useCreatePaletteShade(props, emit)
</script>

<template>
  <el-dialog
      v-model="isDialogVisible"
      :destroy-on-close="true"
      title="Добавление тени"
      width="380"
      @open="handleOpenDialog"
      @closed="handleClosedDialog">
    <el-form
      :model="formData"
      label-width="120">
      <el-form-item label="Значение">
        <c-shade-picker
            class="palette-shade-data__picker"
            v-model="formData.value"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleBtnFormSubmitClick">Добавить</el-button>
        <el-button @click="handleBtnFormCancelClick">Отменить</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style lang="scss">
@use "create-palette-shade";
</style>