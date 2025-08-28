<script setup lang="ts">
  import { defineAsyncComponent, markRaw,ref, watch } from "vue";

  import { UiIconProps } from "./types";

  const props = withDefaults(defineProps<UiIconProps>(), {
    size: "md",
    color: "inherit"
  });

  const currentIcon = ref();
  watch(
    [() => props.type, () => props.name],
    () => {
      currentIcon.value = markRaw(
        defineAsyncComponent(() => import(`../../assets/icons/${props.type}/${props.name}.svg?component`))
      );
    },
    {
      immediate: true
    }
  );
</script>

<template>
  <component :is="currentIcon" class="ui-icon" :class="[`size-${size}`, {'not-social': type != 'social'}]" :style="{ color: color }" />
</template>

<style lang="scss">
  .ui-icon {
    display: inline-flex;

    &.not-social path {
      fill: currentcolor;
    }

    &.size-fill {
      width: 100%;
      height: 100%;
    }

    &.size-xs {
      width: 12px;
      min-width: 12px;
      height: 12px;
      min-height: 12px;
    }

    &.size-sm {
      width: 16px;
      min-width: 16px;
      height: 16px;
      min-height: 16px;
    }

    &.size-md {
      width: 20px;
      min-width: 20px;
      height: 20px;
      min-height: 20px;
    }

    &.size-lg {
      width: 24px;
      min-width: 24px;
      height: 24px;
      min-height: 24px;
    }

    &.size-xl {
      width: 32px;
      min-width: 32px;
      height: 32px;
      min-height: 32px;
    }

    &.size-xxl {
      width: 40px;
      min-width: 40px;
      height: 40px;
      min-height: 40px;
    }
  }
</style>
