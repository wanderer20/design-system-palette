<script setup lang="ts">
import { createPaletteColorEmits, createPaletteColorProps } from "./create-palette-color.ts";
import { useCreatePaletteColor } from "./use-create-palette-color.ts";
import { CColorPicker } from "@/entities/color";

const props = defineProps(createPaletteColorProps)
const emit = defineEmits(createPaletteColorEmits)

const {
  formData,
  interpolationModes,
  isDialogVisible,
  handleOpenDialog,
  handleClosedDialog,
  handleBtnFormSubmitClick,
  handleBtnFormCancelClick,
} = useCreatePaletteColor(props, emit)
</script>

<template>
  <el-dialog
      v-model="isDialogVisible"
      :destroy-on-close="true"
      title="Добавление цвета"
      width="380"
      @open="handleOpenDialog"
      @closed="handleClosedDialog">
    <el-form
        :model="formData"
        label-width="120">
      <el-form-item label="Цвет">
        <c-color-picker
            v-model="formData.color" />
      </el-form-item>
      <el-form-item label="Интерполяция">
        <el-select v-model="formData.interpolation">
          <el-option
              v-for="interpolationMode in interpolationModes"
              :key="interpolationMode"
              :value="interpolationMode">
            {{ interpolationMode }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
            type="primary"
            @click="handleBtnFormSubmitClick">
          Добавить
        </el-button>
        <el-button
            @click="handleBtnFormCancelClick">
          Отменить
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style lang="scss">
@use "create-palette-color";
</style>