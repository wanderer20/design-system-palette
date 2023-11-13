<script setup lang="ts">
import { iconEmits, iconProps } from "./icon.ts";
import { useIcon } from "./use-icon.ts";

defineOptions({
  name: 'Icon',
  inheritAttrs: false,
})

const props = defineProps(iconProps)
const emit = defineEmits(iconEmits)

const { style } = useIcon(props, emit)
</script>

<template>
  <i class="icon" :style="style" v-bind="$attrs">
    <slot />
  </i>
</template>

<style lang="scss">
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  --size: 24px;

  svg {
    width: var(--size);
    height: var(--size);
  }

  &.is-loading {
    animation: rotating 2s linear infinite;
  }
}

@include keyframes(rotating) {
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg)}
}
</style>