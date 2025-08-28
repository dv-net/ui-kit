<script setup lang="ts">
  import { computed } from "vue";

  const modelValue = defineModel<number>({ default: 0 });

  const progressBarStyle = computed(() => {
    const normValue = Math.min(modelValue.value, 100);
    return `width: ${normValue}%`;
  });
</script>

<template>
  <div class="ui-progress-bar">
    <div class="ui-progress-bar-inner" :style="progressBarStyle"></div>
  </div>
</template>

<style lang="scss">
  .ui-progress-bar {
    overflow: hidden;
    height: 12px;
    border-radius: 6px;
    background: #ebf0f5;

    &-inner {
      height: 100%;
      background: linear-gradient(90deg, #1968e5 -0.93%, #1968e5 -0.92%, rgb(25 104 229 / 0%) 100%, #1968e5 100.01%);
      transition: width 0.5s ease-in-out;
    }
  }
</style>
