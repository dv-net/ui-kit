<script setup lang="ts">
  import UiIcon from "@/lib/components/UiIcon/UiIcon.vue";

  import { config, UiInput } from "@/lib";

  defineProps<{
    placeholder?: string;
  }>();

  const modelValue = defineModel<string>({ default: null });
</script>

<template>
  <div class="select-search">
    <div class="select-search__wrapper">
      <UiInput
        ref="inputRef"
        class="select-search__input"
        v-model="modelValue"
        :placeholder="config.uiSelect.translations.searchInputPlaceholder"
        clearable
      >
        <template #append>
          <UiIcon name="search" type="400" size="sm" />
        </template>
      </UiInput>
    </div>
  </div>
</template>

<style lang="scss">
  .select-search {
    padding: 8px 16px;

    &__wrapper {
      display: flex;
      height: 44px;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      border-radius: 8px 8px 0 0;
      border-bottom: 1px solid var(--color-text-inactive);
      background: var(--color-background-secondary);
      cursor: text;
    }

    &__input {
      flex-grow: 1;
      flex-shrink: 1;
      background: transparent;
      box-shadow: none !important;
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;

      &.is-disabled {
        background: transparent;
      }

      &::placeholder {
        color: var(--color-text-tertiary);
      }
    }

    .select-search__icon {
      color: var(--color-text-tertiary);
    }
  }
</style>
