<script setup lang="ts">
  import { config } from "@/lib";
</script>

<template>
  <div class="empty-content">
    <svg class="empty-content__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span class="empty-content__title">{{ config.uiTable.translations.noDataTitle }}</span>
    <p class="empty-content__description">
      {{ config.uiTable.translations.noDataDescription }}
    </p>
  </div>
</template>

<style lang="scss">
  .empty-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 24px;
    color: var(--color-text-secondary);
    background-color: var(--color-white);

    &__icon {
      width: 48px;
      height: 48px;
      color: #cbd1db;
    }

    &__title {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    &__description {
      margin: 0;
      font-size: 14px;
      font-weight: 400;
      color: var(--color-text-secondary);
    }
  }
</style>
