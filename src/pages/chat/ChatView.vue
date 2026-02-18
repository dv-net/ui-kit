<script setup lang="ts">
  import { UiChat } from "@/lib";
</script>

<template>
  <div class="page">
    <h1 class="global-title">Chat</h1>
    <UiChat>
    </UiChat>
  </div>
</template>

<style scoped lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
</style>
