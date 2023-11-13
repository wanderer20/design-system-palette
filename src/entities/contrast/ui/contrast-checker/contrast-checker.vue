<script setup lang="ts">
import { CIcon } from '@/shared/ui/icon'
import { IClose, ICheck } from '@/shared/ui/icon-pack'

import { contrastCheckerEmits, contrastCheckerProps } from "./contrast-checker.ts";
import { useContrastChecker } from "./use-contrast-checker.ts";
import { scoresWCAG2 } from "@/shared/lib";

import { CContrastCheckerResult, CContrastCheckerInfo } from "../../ui";

const props = defineProps(contrastCheckerProps)
const emit = defineEmits(contrastCheckerEmits)

const {
  firstColor,
  secondColor,
  direction,
  isNeedUseWhiteForeground,
} = useContrastChecker(props, emit)
</script>

<template>
  <div class="contrast-checker contrast-checker__wrapper">
    <div class="contrast-checker__init-data">

      <div class="contrast-checker-color-list__list">
        <div class="contrast-checker-color-list__item">
          <div class="contrast-checker-color-item__wrapper">
            <div class="contrast-checker-color-item__label">Передний фон</div>
            <div class="contrast-checker-color-item__value">
              <div class="contrast-checker-color-item__preview" :style="{
              '--color': firstColor
            }"></div>
              <div class="contrast-checker-color-item__text">
                {{ firstColor }}
              </div>
            </div>
          </div>
        </div>
        <div class="contrast-checker-color-list__item">
          <div class="contrast-checker-color-item__wrapper">
            <div class="contrast-checker-color-item__label">Задний фон</div>
            <div class="contrast-checker-color-item__value">
              <div class="contrast-checker-color-item__preview" :style="{
              '--color': secondColor
            }"></div>
              <div class="contrast-checker-color-item__text">
                {{ secondColor }}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="contrast-checker__info">
      <div class="contrast-checker-info__list">
        <div class="contrast-checker-info__item">
          <c-contrast-checker-info :foreground="firstColor" :background="secondColor" mode="wcag2" />
        </div>
        <div class="contrast-checker-info__item">
          <c-contrast-checker-info :foreground="firstColor" :background="secondColor" mode="apca" />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
@use "contrast-checker";
</style>