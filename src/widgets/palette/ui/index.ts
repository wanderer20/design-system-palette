import { withInstall } from "@/shared/lib";

import Palette from './palette/palette.vue'
import PaletteColorPreview from "./palette-color-preview/palette-color-preview.vue";

export const CPalette = withInstall(Palette)
export const CPaletteColorPreview = withInstall(PaletteColorPreview)