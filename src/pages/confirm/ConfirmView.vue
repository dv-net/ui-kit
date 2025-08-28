<script setup lang="ts">
  import UiButton from "@/lib/components/UiButton/UiButton.vue";

  import { UiConfirm } from "@/lib";

  async function confirm() {
    await new Promise((res) => {
      setTimeout(() => {
        res("success");
      }, 20000);
    });
  }
</script>

<template>
  <div class="page">
    <h1 class="global-title">Confirm</h1>

    <div class="grid">
      <div class="grid__header">Basic usage</div>
      <div>
        <UiConfirm :method="confirm" tooltip-text="Confirm" title="Confirm action" text="Are you sure?">
          <UiButton>Click me</UiButton>
        </UiConfirm>
      </div>
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
</style>
