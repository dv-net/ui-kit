<script setup lang="ts">
  defineProps<{
    text?: string;
  }>();
</script>

<template>
  <div class="tooltip-content">
    <span>{{ text }}</span>
  </div>
</template>

<style lang="scss">
  .tooltip-content {
    padding: 12px;
    border: 1px solid var(--color-separator-border-secondary);
    border-radius: 8px;
  }
</style>
