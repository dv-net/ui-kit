<script setup lang="ts">
  import { UISkeletonProps } from "./types";

  withDefaults(defineProps<UISkeletonProps>(), {
    animated: true,
    rows: 5,
    rowHeight: 40,
    itemBorderRadius: 4,
    rowsGap: 8,
    firstColor: "var(--color-background-secondary)",
    secondColor: "var(--color-background-tertiary)"
  });
</script>

<template>
  <div :class="['ui-skeleton', { animated }]" :style="{ gap: `${rowsGap}px` }">
    <div
      v-for="item in rows"
      :key="item"
      class="ui-skeleton__item"
      :style="{ height: `${rowHeight}px`, borderRadius: `${itemBorderRadius}px` }"
    />
  </div>
</template>

<style lang="scss">
  .ui-skeleton {
    display: flex;
    width: 100%;
    flex-direction: column;

    &__item {
      border-radius: 4px;
      background: v-bind(firstColor);
    }

    &.animated {
      .ui-skeleton__item {
        animation: ui-skeleton-animation 1.4s ease infinite;
        background: linear-gradient(90deg, v-bind(firstColor) 25%, v-bind(secondColor) 37%, v-bind(firstColor) 63%);
        background-size: 400% 100%;
      }
    }
  }

  @keyframes ui-skeleton-animation {
    0% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0 50%;
    }
  }
</style>
