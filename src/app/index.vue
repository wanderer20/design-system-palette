<script setup lang="ts">
import { RouterView } from "vue-router";
import { AppLayout } from '@/app/layouts'
</script>

<template>
  <suspense>
    <app-layout>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </app-layout>
  </suspense>
</template>

<style lang="scss">
@import "./index.scss";
</style>