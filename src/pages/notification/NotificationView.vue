<script setup lang="ts">
  import UiButton from "@/lib/components/UiButton/UiButton.vue";

  import UiNotification from "@/lib/composables/useNotification/useNotification.ts";
</script>

<template>
  <div class="page">
    <h1 class="global-title">Notification</h1>

    <div class="flex">
      <UiButton
        type="negative"
        @click="
          UiNotification(
            'Hello, I am notification <p style=color:red;>123</p> asdasd Eat more of these soft French rolls, and have some tea'
          )
        "
      >
        Error
      </UiButton>

      <UiButton
        type="primary"
        @click="
          UiNotification(
            'Hello, I am notification <p style=color:green;>123</p> asdasd Eat more of these soft French rolls, and have some tea',
            'success'
          )
        "
      >
        Success
      </UiButton>

      <UiButton
        type="secondary"
        @click="
          UiNotification(
            'Hello, I am notification <p style=color:lightgreen;>123</p> asdasd Eat more of these soft French rolls, and have some tea',
            'info',
            true,
            'Custom info title'
          )
        "
      >
        Info
      </UiButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .flex {
      display: flex;
      gap: 12px;
    }
  }
</style>
