<script setup lang="ts">
  import UiSkeleton from "@/lib/components/UiSkeleton/UiSkeleton.vue";
</script>

<template>
  <div class="page">
    <h1 class="global-title">Skeleton</h1>

    <div class="grid">
      <div class="grid__header">Static rows</div>
      <ui-skeleton :animated="false" :rows="3" :rowHeight="20" :item-border-radius="0" :rows-gap="2" />
    </div>

    <div class="grid">
      <div class="grid__header">Container</div>
      <div class="skeleton-container">
        <ui-skeleton :rows="3" />
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Custom color</div>
      <ui-skeleton :rows="3" second-color="var(--color-background-accent)" />
    </div>
  </div>
</template>

<style lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .grid {
      display: grid;
      align-items: center;
      gap: 12px;
      grid-template-columns: 1fr;

      &__header {
        width: max-content;
        border-bottom: 1px solid;
        margin-bottom: 8px;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }

  .skeleton-container {
    padding: 24px;
    border: 1px solid #e1e8f1;
    border-radius: 16px;
    background-color: #fff;
  }
</style>
