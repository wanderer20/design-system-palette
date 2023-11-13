<script setup lang="ts">
import { contrastCheckerResultEmits, contrastCheckerResultProps } from "./contrast-checker-result.ts";
import { useContrastCheckerResult } from "./use-contrast-checker-result.ts";
import { CircleCheckFilled, CircleCloseFilled } from "@element-plus/icons-vue";

const props = defineProps(contrastCheckerResultProps)
const emit = defineEmits(contrastCheckerResultEmits)

const {
  isSuccess,
  label,
  text
} = useContrastCheckerResult(props, emit)
</script>

<template>
  <div class="contrast-checker-result contrast-checker-result__wrapper">
    <div class="contrast-checker-result__label">{{ label }}</div>
    <div class="contrast-checker-result__value">
      <el-icon class="contrast-checker-result__icon" :class="{
        'contrast-checker-result__icon--success': isSuccess
      }">
        <CircleCheckFilled v-if="isSuccess" />
        <CircleCloseFilled v-else />
      </el-icon>
      <div v-if="!!text" class="contrast-checker-result__text">{{ text }}</div>
    </div>
  </div>
</template>

<style lang="scss">
@use "contrast-checker-result";
</style>