<script setup lang="ts">
import { CContrastCheckerResult } from "../../ui";

import { contrastCheckerInfoEmits, contrastCheckerInfoProps } from "./contrast-checker-info.ts";
import { useContrastCheckerInfo } from "./use-contrast-checker-info.ts";

const props = defineProps(contrastCheckerInfoProps)
const emit = defineEmits(contrastCheckerInfoEmits)

const {
  foreground,
  background,
  mode,
  value,
  results,
} = useContrastCheckerInfo(props, emit)
</script>

<template>
  <div class="contrast-checker-info contrast-checker-info__wrapper">
    <div class="contrast-checker-info__inner">
      <div class="contrast-checker-info__header">
        <div class="contrast-checker-info__title">
          {{ mode === 'wcag2' ? 'WCAG 2 contrast' : 'APCA contrast'}}
        </div>
        <div class="contrast-checker-info__preview">
          <div class="contrast-checker-info-preview contrast-checker-info-preview__wrapper">
            <div class="contrast-checker-info-preview__block" :style="{
              '--text-color': foreground,
              '--background-color': background
            }">
              Aa
            </div>
            <div class="contrast-checker-info-preview__value">{{ value }}</div>
          </div>
        </div>
      </div>
      <div class="contrast-checker-info__body">
        <div v-if="results" class="contrast-checker-info__results">

          <div class="contrast-checker-info-results__list">
            <div v-for="result in results" class="contrast-checker-info-results__item">
              <c-contrast-checker-result :label="result.label" v-model="result.isSuccess" :text="result?.text" />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "contrast-checker-info";
</style>