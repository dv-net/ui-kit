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
    <div class="ui-icon-button__hover-effect" />
  </component>
</template>

<style lang="scss">
  .ui-icon-button {
    $root: &;

    --ui-icon-button-effect-opacity: 0.06;
    --ui-icon-button-effect-color: currentColor;

    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    cursor: pointer;
    outline: none;
    overflow: hidden;
    transition: var(--transition);

    .ui-icon {
      flex: 1 1 100%;
      transition: var(--transition);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    &__hover-effect {
      position: absolute;
      z-index: 2;
      border-radius: inherit;
      pointer-events: none;
      overflow: hidden;
      inset: 0;
      isolation: isolate;

      &::after,
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        aspect-ratio: 1/1;
        inset-inline-start: 50%;
        inset-block-start: 50%;
        translate: -50% -50%;
        z-index: -1;
        background: var(--ui-icon-button-effect-color);
        border-radius: 50%;
        scale: 0 0;
        opacity: var(--ui-icon-button-effect-opacity);
      }

      &::before {
        transition-duration: 0.25s, 0.25s;
      }
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:disabled):not(.is-loading) {
        .ui-icon-button__hover-effect {
          &::after {
            transition:
              scale 0.5s ease,
              opacity 0.5s ease 0.25s;
            scale: 1 1;
            opacity: 0;
          }
        }
      }
    }

    &:active:not(:disabled):not(.is-loading),
    &:focus-visible:not(:disabled):not(.is-loading) {
      .ui-icon-button__hover-effect {
        &::before {
          transition:
            scale 0.5s ease,
            opacity 0.5s ease 0.25s;
          scale: 1 1;
          opacity: 0;
        }

        &::after {
          display: none;
        }
      }
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
      --ui-icon-button-effect-opacity: 0.06;
      --ui-icon-button-effect-color: currentColor;
    }

    &.type-contrast {
      background-color: var(--color-background-contrast);
      color: var(--color-white);
      --ui-icon-button-effect-opacity: 0.1;
      --ui-icon-button-effect-color: var(--color-white, #fff);
    }

    &.type-accent {
      background-color: var(--color-background-accent);
      color: var(--color-white);
      --ui-icon-button-effect-opacity: 0.1;
      --ui-icon-button-effect-color: var(--color-white, #fff);
    }

    &.type-tint {
      background-color: var(--color-background-info);
      color: var(--color-icon-accent);
      --ui-icon-button-effect-opacity: 0.06;
      --ui-icon-button-effect-color: var(--color-state-accent, currentColor);
    }

    &.type-positive {
      background-color: var(--color-status-positive);
      color: var(--color-white);
      --ui-icon-button-effect-opacity: 0.1;
      --ui-icon-button-effect-color: var(--color-white, #fff);
    }

    &.type-positive-tint {
      background-color: var(--color-background-positive);
      color: var(--color-icon-positive);
      --ui-icon-button-effect-opacity: 0.06;
      --ui-icon-button-effect-color: currentColor;
    }

    &.type-negative {
      background-color: var(--color-status-negative);
      color: var(--color-white);
      --ui-icon-button-effect-opacity: 0.08;
      --ui-icon-button-effect-color: var(--color-white, #fff);
    }

    &.type-negative-tint {
      background-color: var(--color-background-negative);
      color: var(--color-icon-negative);
      --ui-icon-button-effect-opacity: 0.06;
      --ui-icon-button-effect-color: currentColor;
    }
  }
</style>
