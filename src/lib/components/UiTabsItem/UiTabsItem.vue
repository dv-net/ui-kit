<script lang="ts" setup>
  import { computed, inject } from "vue";

  import { UiTabsItemProps } from "./types";

  import { TABS_PROVIDE_VALUE } from "@/lib/components/UiTabs/constants";
  import { UiTabsProvideData } from "@/lib/components/UiTabs/types";
  withDefaults(defineProps<UiTabsItemProps>(), {});

  const injectValue = inject<UiTabsProvideData>(TABS_PROVIDE_VALUE);
  const tag = computed(() => (injectValue?.router ? "router-link" : "button"));
  function change(value: string | number) {
    if (injectValue?.modelValue.value) {
      injectValue.modelValue.value = value;
      injectValue.change(value);
    }
  }
</script>
<template>
  <component
    replace
    :is="tag"
    :class="[
      `size-${injectValue?.size}`,
      `mode-${injectValue?.mode}`,
      { 'is-active': injectValue?.modelValue.value === value }
    ]"
    class="ui-tabs-item__button"
    @click="change(value)"
    :to="value"
  >
    <slot />
    <span class="ui-tabs-item__badge" v-if="badge && injectValue?.mode === 'clear'">{{ badge }}</span>
  </component>
</template>
<style lang="scss">
  .ui-tabs-item {
    &__badge {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px 7px;
      border-radius: 20px;
      background-color: var(--color-icon-accent);
      color: var(--color-text-contrast);
      font-size: 10px;
      font-weight: 500;
      line-height: 12px;
      text-align: center;
    }

    &__button {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
      border: 1px solid transparent;
      border-radius: 8px;
      background-color: transparent;
      color: var(--color-text-primary);
      cursor: pointer;
      font-family: inherit;
      font-weight: 400;
      outline: none;
      text-decoration: none;
      transition: var(--transition);
      white-space: nowrap;

      &.mode-outline {
        border: 1px solid var(--color-separator-border-primary);

        &:hover,
        &:focus-visible {
          border-color: var(--color-separator-border-secondary);
        }

        &.is-active {
          border-color: var(--color-separator-border-accent);
        }
      }

      &.mode-light {
        &:not(.is-active) {
          color: var(--color-text-secondary);
        }

        &:hover,
        &:focus-visible {
          color: var(--color-text-tertiary);
        }

        &.is-active {
          background: var(--color-background-primary);
          box-shadow: 0 0 6.4px 0 rgb(0 0 0 / 9%);
        }
      }

      &.mode-dark {
        color: var(--color-text-contrast);

        &:not(.is-active) {
          background-color: var(--color-background-contrast-secondary);
        }

        &:hover,
        &:focus-visible {
          color: var(--color-text-inactive);
        }

        &.is-active {
          background: var(--color-background-contrast);
          box-shadow: 0 0 6.4px 0 rgb(0 0 0 / 9%);
        }
      }

      &.mode-clear {
        position: relative;
        display: flex;
        width: 100%;
        align-items: flex-start;
        padding: 0;
        border: none;
        color: var(--color-text-tertiary);
        gap: 8px;

        &::after {
          position: absolute;
          bottom: 0;
          display: block;
          width: 0;
          height: 1px;
          background-color: transparent;
          content: "";
          transition: var(--transition);
        }

        &:hover,
        &:focus-visible {
          color: var(--color-text-secondary);

          &::after {
            width: 100%;
            background-color: var(--color-separator-border-secondary);
          }
        }

        &.is-active {
          color: var(--color-text-primary);

          &::after {
            width: 100%;
            background-color: var(--color-separator-border-accent);
          }
        }

        &.size-md {
          height: 44px;
          font-size: 14px;
        }

        &.size-lg {
          height: 44px;
          font-size: 16px;
        }
      }

      &.size-md {
        height: 32px;
        font-size: 14px;
      }

      &.size-lg {
        height: 36px;
        font-size: 16px;
      }
    }
  }
</style>
