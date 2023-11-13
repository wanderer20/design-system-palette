import { withInstall } from "@/shared/lib";

import Palette from "./palette/palette.vue";
import PaletteColorPreview from "./palette-color-preview/palette-color-preview.vue";
import { Component } from "vue";

export const CPalette = withInstall(Palette as Component)
export const CPaletteColorPreview = withInstall(PaletteColorPreview as Component)