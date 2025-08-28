<script setup lang="ts">
  import UiButton from "@/lib/components/UiButton/UiButton.vue";

  import UiNotification from "@/lib/composables/useNotification/useNotification.ts";
</script>

<template>
  <div class="page">
    <h1 class="global-title">Notification</h1>

    <div class="grid">
      <div class="grid__header">Basic</div>
      <UiButton
        mode="neutral"
        @click="
          UiNotification(
            'Hello, I am notification <p style=color:red;>123</p> asdasd Eat more of these soft French rolls, and have some tea'
          )
        "
        >Show</UiButton
      >
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
