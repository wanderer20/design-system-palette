<script setup lang="ts">
import { shadePickerEmits, shadePickerProps } from "./shade-picker.ts";
import { useShadePicker } from "./use-shade-picker.ts";

const props = defineProps(shadePickerProps)
const emit = defineEmits(shadePickerEmits)

const {
  size,
  modelValue,
  handleChange,
} = useShadePicker(props, emit)
</script>

<template>
  <el-input-number
      :model-value="modelValue"
      :size="size"
      :max="100"
      :min="0"
      controls-position="right"
      @change="handleChange"
  />
</template>

<style scoped lang="scss">

</style>