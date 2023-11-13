<script setup lang="ts">
import { ColorPicker } from "vue-color-kit";
import { colorPickerEmits, colorPickerProps } from "./color-picker.ts";
import { useColorPicker } from "./use-color-picker.ts";

const props = defineProps(colorPickerProps)
const emit = defineEmits(colorPickerEmits)

const {
  size,
  inputValue,
  dropdownRef,
  isDropdownVisible,
  handleChangeColor,
  handleChangeValue,
  handleDropdownVisibleChange,
} = useColorPicker(props, emit)
</script>

<template>
  <el-dropdown
      ref="dropdownRef"
      class="color-picker color-picker__wrapper"
      trigger="click"
      popper-class="color-picker__popper"
      @visible-change="handleDropdownVisibleChange">
    <div class="color-picker__content" :class="`color-picker__content--size-${size}`">
      <div class="color-picker__preview" :style="{
        'background-color': inputValue
      }"></div>
      <div class="color-picker__value">
        <el-input
            v-model="inputValue"
            class="color-picker__input"
            :size="size"
            @change="handleChangeValue"
        />
      </div>
    </div>
    <template #dropdown>
      <div class="color-picker__dropdown-inner">
        <color-picker
            v-if="isDropdownVisible"
            class="color-picker__picker"
            theme="light"
            :color="inputValue"
            @changeColor="handleChangeColor"
        />
      </div>
    </template>
  </el-dropdown>
</template>

<style lang="scss">
@use "color-picker";
</style>