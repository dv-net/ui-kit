<script setup lang="ts">
  import { computed } from "vue";

  import { UiIconButtonProps } from "./types";

  import { UiIcon, UiLoading } from "@/lib";

  const props = withDefaults(defineProps<UiIconButtonProps>(), {
    size: "md",
    mode: "circle",
    type: "clear",
    iconType: "400",
    iconName: "home",
    loading: false,
    noSize: false,
    href: "",
    to: "",
    nativeType: "button"
  });
  const currentTag = computed(() => (props.href ? "a" : props.to ? "router-link" : "button"));
</script>

<template>
  <component
    v-bind="$attrs"
    :to="to"
    :is="currentTag"
    :type="nativeType"
    :disabled="disabled || loading"
    class="ui-icon-button"
    :class="[
      `size-${size}`,
      `type-${type}`,
      `mode-${mode}`,
      {
        'is-loading': loading,
        'is-no-size': noSize,
        'large-icon-container': !containerSmall
      }
    ]"
  >
    <UiIcon v-show="!loading" :color="iconColor" :name="iconName" :type="iconType" :size="size" />

    <UiLoading :is-show="loading" :icon-size="size" :icon-color="iconColor" />
  </component>
</template>

<style lang="scss">
  .ui-icon-button {
    $root: &;

    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    cursor: pointer;
    outline: none;
    transition: var(--transition);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        opacity: 0.8;
      }
    }

    .ui-icon {
      flex: 1 1 100%;
      transition: var(--transition);
    }

    &:active,
    &:focus-visible {
      opacity: 0.6;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    &.mode-circle {
      border-radius: 50%;
    }

    @mixin size-props($size) {
      width: $size;
      height: $size;
      min-height: $size;
    }

    &.large-icon-container {
      &.size-xs {
        @include size-props(20px);

        &.mode-square {
          border-radius: 6px;
        }
      }

      &.size-sm {
        @include size-props(24px);

        &.mode-square {
          border-radius: 6px;
        }
      }

      &.size-md {
        @include size-props(32px);

        &.mode-square {
          border-radius: 8px;
        }
      }

      &.size-lg {
        @include size-props(40px);

        &.mode-square {
          border-radius: 10px;
        }
      }

      &.size-xl {
        @include size-props(48px);

        &.mode-square {
          border-radius: 12px;
        }
      }
    }

    &.is-no-size {
      @include size-props(unset);

      border-radius: unset;
      background-color: transparent !important;
    }

    &.type-clear {
      background-color: transparent;
      color: var(--color-icon-primary);
    }

    &.type-contrast {
      background-color: var(--color-background-contrast);
      color: var(--color-white);
    }

    &.type-accent {
      background-color: var(--color-background-accent);
      color: var(--color-white);
    }

    &.type-tint {
      background-color: var(--color-background-info);
      color: var(--color-icon-accent);
    }

    &.type-positive {
      background-color: var(--color-status-positive);
      color: var(--color-white);
    }

    &.type-positive-tint {
      background-color: var(--color-background-positive);
      color: var(--color-icon-positive);
    }

    &.type-negative {
      background-color: var(--color-status-negative);
      color: var(--color-white);
    }

    &.type-negative-tint {
      background-color: var(--color-background-negative);
      color: var(--color-icon-negative);
    }
  }
</style>
