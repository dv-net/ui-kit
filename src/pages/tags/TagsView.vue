<script setup lang="ts">
  import UiTag from "@/lib/components/UiTag/UiTag.vue";
</script>

<template>
  <div class="page">
    <h1 class="global-title">Tags</h1>
    <div class="grid">
      <div class="grid__header">Mode/Size</div>
      <div class="grid__header">Small (20px)</div>
      <div class="grid__header">Medium (24px)</div>
      <div class="grid__header">Medium (32px)</div>

      <div class="grid__row">Positive</div>
      <UiTag size="sm" mode="positive" text="Long tag" />
      <UiTag size="md" mode="positive" text="Long tag" />
      <UiTag size="lg" mode="positive" text="Long tag" />
      <div class="grid__row">Warning</div>
      <UiTag size="sm" mode="warning" text="Long tag" />
      <UiTag size="md" mode="warning" text="Long tag" />
      <UiTag size="lg" mode="warning" text="Long tag" />
      <div class="grid__row">Negative</div>
      <UiTag size="sm" mode="negative" text="Long tag" />
      <UiTag size="md" mode="negative" text="Long tag" />
      <UiTag size="lg" mode="negative" text="Long tag" />
      <div class="grid__row">Accent</div>
      <UiTag size="sm" mode="accent" text="Long tag" />
      <UiTag size="md" mode="accent" text="Long tag" />
      <UiTag size="lg" mode="accent" text="Long tag" />
      <div class="grid__row">Neutral</div>
      <UiTag size="sm" mode="neutral" text="Long tag" />
      <UiTag size="md" mode="neutral" text="Long tag" />
      <UiTag size="lg" mode="neutral" text="Long tag" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .grid {
      display: grid;
      max-width: 700px;
      align-items: center;
      gap: 12px;
      grid-template-columns: repeat(4, auto);

      &__header {
        font-weight: bold;
      }

      &__row {
        font-weight: bold;
      }
    }
  }
</style>
