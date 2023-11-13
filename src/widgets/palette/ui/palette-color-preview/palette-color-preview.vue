<script setup lang="ts">
import { paletteColorPreviewEmits, paletteColorPreviewProps } from "./palette-color-preview.ts";
import { usePaletteColorPreview } from "./use-palette-color-preview.ts";
import {CContrastChecker} from "@/entities/contrast";
import {scoresAPCA, scoresWCAG2, scoreWCAG2} from "@/shared/lib";

const props = defineProps(paletteColorPreviewProps)
const emit = defineEmits(paletteColorPreviewEmits)

const {
  color,
  colorContrastWith,
  active,
  contrastData,
  contrastDirection,
  selectionMode,
  isNeedUseWhiteForeground,
  handleColorCopyClick,
  handleClick,
} = usePaletteColorPreview(props, emit)
</script>

<template>
  <el-popover
      width="500"
      popper-class="palette-color-preview__popover"
      :show-after="500">
    <template #reference>
      <div
          class="palette-color-preview palette-color-preview__wrapper"
          :class="{
            'palette-color-preview__wrapper--active': active,
            'palette-color-preview__wrapper--selection-mode': selectionMode,
            'palette-color-preview__wrapper--dark-background': isNeedUseWhiteForeground(color)
          }"
          :style="{
            '--color': color
          }"
          @click="handleClick">
        <div class="palette-color-preview__inner">
          <div class="palette-color-preview__tools">
            <el-button icon="CopyDocument" size="small" @click="handleColorCopyClick"></el-button>
          </div>
          <div class="palette-color-preview__hex">{{ color }}</div>

          <div class="palette-color-preview__contrast-data">
            <div class="palette-color-preview-contrast-list__list">
              <el-tooltip
                  content="WCAG 2 contrast"
                  placement="top">
                <div class="palette-color-preview-contrast-list__item">
                  <div class="palette-color-preview-contrast-item__wrapper">
                    <div v-if="contrastData.wcag2?.score !== scoresWCAG2.Fail" class="palette-color-preview-contrast-item__score">{{ contrastData.wcag2?.score }}</div>
                    <div class="palette-color-preview-contrast-item__ratio">{{ contrastData.wcag2?.ratio }}</div>
                  </div>
                </div>
              </el-tooltip>

              <el-tooltip
                  content="APCA contrast"
                  placement="top">
                <div class="palette-color-preview-contrast-list__item">
                  <div class="palette-color-preview-contrast-item__wrapper">
                    <div v-if="contrastData.apca?.score !== scoresAPCA.Fail" class="palette-color-preview-contrast-item__score">{{ contrastData.apca?.score }}</div>
                    <div class="palette-color-preview-contrast-item__ratio">{{ contrastData.apca?.ratio }}</div>
                  </div>
                </div>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="palette-color-preview-popover__wrapper">
      <c-contrast-checker
          v-model="color"
          :with-color="colorContrastWith"
          :direction="contrastDirection"
      />
    </div>
  </el-popover>
</template>

<style lang="scss">
@use "palette-color-preview";
</style>