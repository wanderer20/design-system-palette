import { withInstall } from "@/shared/lib";

import ContrastChecker from "./contrast-checker/contrast-checker.vue";
import ContrastCheckerInfo from "./contrast-checker-info/contrast-checker-info.vue";
import ContrastCheckerResult from "./contrast-checker-result/contrast-checker-result.vue";

export const CContrastChecker = withInstall(ContrastChecker)
export const CContrastCheckerInfo = withInstall(ContrastCheckerInfo)
export const CContrastCheckerResult = withInstall(ContrastCheckerResult)

export * from './contrast-checker/contrast-checker.ts'
export * from './contrast-checker-info/contrast-checker-info.ts'
export * from './contrast-checker-result/contrast-checker-result.ts'