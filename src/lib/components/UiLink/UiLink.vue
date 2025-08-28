<script setup lang="ts">
  import { computed } from "vue";

  import { UiLinkProps } from "../UiLink/types";

  defineOptions({
    inheritAttrs: false
  });
  const props = withDefaults(defineProps<UiLinkProps>(), {
    mode: "primary",
    size: "lg"
  });
  const currentTag = computed(() => (props.to ? "router-link" : "a"));
</script>

<template>
  <span :class="{ 'is-disabled': disabled }" class="ui-link__wrapper">
    <component
      v-bind="{ ...$attrs }"
      class="ui-link"
      :class="[`size-${size}`, `mode-${mode}`]"
      :to="to"
      :is="currentTag"
    >
      <slot />
    </component>
  </span>
</template>

<style lang="scss">
  .ui-link {
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font-family: inherit;
    font-weight: 500;
    line-height: inherit;
    outline: none;
    text-decoration: none;
    transition: var(--transition);
    user-select: none;

    &.mode-primary {
      color: var(--color-text-accent);
    }

    &.mode-secondary {
      color: var(--color-text-secondary);
    }

    &.size-sm {
      font-size: 10px;
      line-height: 12px;
    }

    &.size-md {
      font-size: 12px;
      line-height: 16px;
    }

    &.size-lg {
      font-size: 14px;
      line-height: 20px;
    }

    &.size-xl {
      font-size: 16px;
      line-height: 20px;
    }

    &:hover {
      opacity: 0.8;
    }

    &:active,
    &:focus-visible {
      opacity: 0.6;
    }

    &__wrapper {
      &.is-disabled {
        cursor: not-allowed;

        .ui-link {
          opacity: 0.4;
          pointer-events: none;
        }
      }
    }
  }
</style>
