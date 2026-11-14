<script setup lang="ts">
  import UiIcon from "@/lib/components/UiIcon/UiIcon.vue";

  import { wallets } from "./wallets";
</script>

<template>
  <div class="stack" :style="{ '--count': wallets.length }">
    <div v-for="(wallet, index) in wallets" :key="wallet.id" class="stack__card" :style="{ '--index': index }">
      <UiIcon type="100" :name="wallet.icon" size="sm" />
      <span class="stack__label">{{ wallet.label }}</span>
    </div>

    <div class="stack__card stack__card--front" :style="{ '--index': wallets.length }">Others</div>
  </div>
</template>

<style scoped lang="scss">
  .stack {
    display: grid;
    width: 200px;
    grid-template-columns: minmax(0, 1fr);
    place-items: end;

    &__card {
      --offset: calc(40% / var(--count) * var(--index));

      position: relative;
      z-index: var(--index);
      display: flex;
      width: 100%;
      max-width: calc(100% - var(--offset));
      align-items: center;
      padding: 6px 12px;
      border: 1px solid var(--color-separator-border-primary);
      border-radius: 8px;
      background: var(--color-white);
      color: var(--color-text-secondary);
      font-size: 14px;
      gap: 6px;
      grid-area: 1 / 1;
      transition:
        translate 0.65s cubic-bezier(0.68, -0.55, 0.27, 1.55),
        rotate 0.65s cubic-bezier(0.68, -0.55, 0.27, 1.55);
      white-space: nowrap;

      &:hover ~ & {
        rotate: calc(2deg * var(--index));
        translate: calc(var(--offset) + 35px) 0;
      }

      &--front {
        justify-content: center;
      }
    }

    &__label {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
