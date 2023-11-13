<script setup lang="ts">
import draggable from 'vuedraggable'

import { CShadePicker } from "@/entities/shade";
import { CColorPicker } from "@/entities/color";
import { CPaletteColorPreview } from "../../ui";
import { CCreatePaletteColor } from "@/features/create-palette-color";
import { CCreatePaletteShade } from "@/features/create-palette-shade";

import { paletteEmits, paletteProps } from "./palette.ts";
import { usePalette } from "./use-palette.ts";
import { Delete } from "@element-plus/icons-vue";

const props = defineProps(paletteProps)
const emit = defineEmits(paletteEmits)

const {
  colors,
  shades,
  colorContrast,
  colorContrastVariants,
  activeColorContrastVariantCode,
  interpolationModes,
  paletteContrastDirection,
  paletteContrastDirectionVariants,
  selectedColors,
  createPaletteColorDialogVisible,
  createPaletteShadeDialogVisible,
  isSelectedMode,
  isChooseContrastMode,
  isSelectedColor,
  onUpdatePaletteColorVisible,
  onUpdateCreatePaletteShadeDialogVisible,
  handleBtnCreatePaletteColorClick,
  handleBtnCreatePaletteShadeClick,
  handleBtnRemovePaletteColorClick,
  handleBtnRemovePaletteShadeClick,
  handleBtnChooseContrastColorClick,
  handleBtnSelectedModeCloseClick,
  handlePaletteColorPreviewClick,
  handleBtnSelectedColorsRemoveClick,
  handleCreatePaletteColor,
  handleCreatePaletteShade,
} = usePalette(props, emit)
</script>

<template>
  <div class="palette palette__wrapper">
    <div class="palette__tools">

      <div class="palette-tool-actions__wrapper">
        <el-button
            class="palette-tool-actions__button"
            @click="handleBtnCreatePaletteColorClick">
          Добавить цвет
        </el-button>
        <el-button
            class="palette-tool-actions__button"
            @click="handleBtnCreatePaletteShadeClick">
          Добавить тень
        </el-button>
      </div>

      <c-create-palette-color
          :visible="createPaletteColorDialogVisible"
          @form:submit="handleCreatePaletteColor"
          @update:visible="onUpdatePaletteColorVisible"
      />

      <c-create-palette-shade
          v-model="createPaletteShadeDialogVisible"
          @form:submit="handleCreatePaletteShade"
      />

      <div class="palette-tool-contrast-setting__wrapper">
        <div class="palette-tool-contrast-setting__group">
          <div class="palette-tool-contrast-setting__label">
            Контрастный цвет
          </div>
          <div class="palette-tool-contrast-setting__option">
            <el-radio-group
                class="palette-tool-contrast__group"
                v-model="activeColorContrastVariantCode">
              <el-radio-button
                  class="palette-tool-contrast__button"
                  v-for="_c in colorContrastVariants"
                  :label="_c.code"
                  :name="_c.code">
                <div class="palette-tool-contrast__preview" :style="{
            '--color': _c.value
          }"></div>
                <div class="palette-tool-contrast__name">
                  {{ _c.name }}
                </div>
                <el-button
                    class="palette-tool-contrast__choose-button"
                    v-if="_c.code === 'custom'"
                    size="small"
                    @click="handleBtnChooseContrastColorClick"
                >
                  Выбрать
                </el-button>
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <div class="palette-tool-contrast-setting__group">
          <div class="palette-tool-contrast-setting__label">
            поставить на
          </div>
          <div class="palette-tool-contrast-setting__option">
            <el-radio-group
                class="palette-tool-contrast-direction__group"
                v-model="paletteContrastDirection">
              <el-radio-button
                  class="palette-tool-contrast-direction__button"
                  v-for="_d in paletteContrastDirectionVariants"
                  :label="_d.code"
                  :name="_d.code">
                {{ _d.name }}
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>

      </div>
    </div>

    <div class="palette__grid" :style="{
      '--num-of-colors': colors.length,
      '--num-of-shades': shades.length,
    }">
      <div class="palette__sidebar">
        <div class="palette__header-cell">
          <div class="palette__color-cell"></div>
          <div class="palette__interpolation-cell">Интерполяция</div>
        </div>


        <draggable
            v-model="shades"
            class="palette__shades"
            tag="div"
            :animation="300"
            item-key="id"
            handle=".handle">
          <template #item="{ element: shade, index }">
            <div class="palette__shade-cell" :key="index">
              <div class="palette__shade-cell-draggable handle draggable-line" :style="{
                '--columns': 2,
                '--rows': 5,
                '--size': '5px'
              }"></div>
              <div class="palette-shade-control-cell__wrapper">

                <div class="palette-shade-data__wrapper">
                  <div class="palette-shade-data__header">
                    <div class="palette-shade-data__index">{{ index + 1 }}.</div>
                    <c-shade-picker
                        class="palette-shade-data__picker"
                        v-model="shade.value"
                        size="small"
                    />

                    <el-button class="palette-shade-data__remove-btn" @click="handleBtnRemovePaletteShadeClick($event, index)" link>
                      <el-icon><Delete /></el-icon>
                    </el-button>
                  </div>
                  <div v-if="shade.contrast" class="palette-shade-data__contrast">
                    <div v-if="shade.contrast.summary" class="palette-shade-contrast-summary__wrapper">
                      <div class="palette-shade-contrast-summary__list">
                        <div v-if="shade.contrast.summary.wcag2" class="palette-shade-contrast-summary__item">
                          <div class="palette-shade-contrast-summary-item__wrapper">
                            <div class="palette-shade-contrast-summary-item__label">WCAG 2</div>
                            <div class="palette-shade-contrast-summary-item__value" :class="{
                              'palette-shade-contrast-summary-item__value--allowed': shade.contrast.summary.wcag2.allowed
                            }">{{ shade.contrast.summary.wcag2.ratio }}</div>
                          </div>
                        </div>

                        <div v-if="shade.contrast.summary.apca" class="palette-shade-contrast-summary__item">
                          <div class="palette-shade-contrast-summary-item__wrapper">
                            <div class="palette-shade-contrast-summary-item__label">APCA</div>
                            <div class="palette-shade-contrast-summary-item__value" :class="{
                              'palette-shade-contrast-summary-item__value--allowed': shade.contrast.summary.apca.allowed
                            }">{{ shade.contrast.summary.apca.ratio }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </template>
        </draggable>
      </div>
      <div class="palette__content">
        <draggable
            class="palette__header"
            v-model="colors"
            tag="div"
            :animation="300"
            item-key="id"
            handle=".handle">
          <template #item="{ element: color, index }">
            <div class="palette__header-cell"
                 :key="index">
              <div class="palette__color-cell">
                <div class="palette__header-cell-draggable handle draggable-line" :style="{
                '--columns': 8,
                '--size': '5px'
              }"></div>

                <div class="palette-color-data__wrapper">
                  <div class="palette-color-data__header">
                    <c-color-picker
                        class="palette-color-data__picker"
                        v-model="color.hex"
                        size="small"
                    />
                    <el-button class="palette-color-data__remove-btn" @click="handleBtnRemovePaletteColorClick($event, index)" link>
                      <el-icon><Delete /></el-icon>
                    </el-button>
                  </div>
                </div>

              </div>
              <div class="palette__interpolation-cell">
                <el-select
                    v-model="color.interpolation"
                    size="small">
                  <el-option
                    v-for="interpolationMode in interpolationModes"
                    :key="interpolationMode"
                    :value="interpolationMode">
                    {{ interpolationMode }}
                  </el-option>
                </el-select>
              </div>
            </div>
          </template>
        </draggable>

        <div class="palette__colors">
          <div
              v-for="(color, i) in colors"
              :key="i"
              class="palette-grid-color__column">
            <div
                v-for="(shade, j) in color.shades"
                :key="j"
                class="palette-grid-color__cell">
              <c-palette-color-preview
                  :modelValue="shade.hex"
                  :contrast-with="colorContrast"
                  :contrast-direction="paletteContrastDirection"
                  :selection-mode="isSelectedMode"
                  :active="isSelectedColor(shade.hex)"
                  @click="handlePaletteColorPreviewClick"
              />
            </div>
          </div>
        </div>

      </div>
    </div>

    <transition name="palette-choose-tool">
      <div v-if="isSelectedMode" class="palette-choose-tool__wrapper">
        <div class="palette-choose-tool__inner">
          <div class="palette-choose-tool__content">
            <div class="palette-choose-tool__label">Выбрано: {{ selectedColors.length }}</div>
            <el-scrollbar
                class="palette-choose-tool__colors"
                view-class="palette-choose-tool__colors-view"
            >
              <div
                  v-for="(color, index) in selectedColors"
                  class="palette-choose-tool-color__wrapper">
                <div
                    class="palette-choose-tool-color__preview"
                    :style="{
                    '--color': color
                  }"></div>
                <div class="palette-choose-tool-color__hex">{{ color }}</div>
                <el-button
                    icon="Delete"
                    class="palette-choose-tool-color__remove-btn"
                    size="small"
                    link
                    @click="handleBtnSelectedColorsRemoveClick($event, index)">
                </el-button>
              </div>
            </el-scrollbar>
          </div>
          <div class="palette-choose-tool__tools">
            <el-button
                icon="Close"
                class="palette-choose-tool-color__remove-btn"
                link
                @click="handleBtnSelectedModeCloseClick">
            </el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
@use "palette";
</style>