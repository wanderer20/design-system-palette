<script setup lang="ts">
import { RouterView } from "vue-router";
import { AppLayout } from '@/app/layouts'
</script>

<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<style lang="scss">
@import "./index.scss";
</style>