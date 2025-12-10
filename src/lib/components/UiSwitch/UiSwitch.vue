<script setup lang="ts">
  import { UiSwitchProps } from "./types";

  import { UiLoading } from "@/lib";

  const modelValue = defineModel<boolean>({
    default: false
  });
  const props = withDefaults(defineProps<UiSwitchProps>(), {
    disabled: false,
    loading: false
  });

  const emits = defineEmits(["change"]);

  async function changeHandler() {
    if (props.disabled || props.loading) {
      return;
    }
    if (!props.beforeChange) {
      modelValue.value = !modelValue.value;
    } else {
      await props.beforeChange();
    }
    emits("change", modelValue.value);
  }
</script>

<template>
  <label @click.prevent="changeHandler" class="ui-switch" :class="{ 'is-disabled': disabled, 'is-loading': loading }">
    <input :checked="modelValue" :disabled="disabled || loading" class="ui-switch__input" type="checkbox" />
    <span class="ui-switch__dot">
      <UiLoading icon-color="#fff" :is-show="loading" />
    </span>
    <span class="ui-switch__slider"></span>
    <div v-if="label || text" class="ui-switch__label">
      <h4>{{ label }}</h4>
      <p>{{ text }}</p>
    </div>
  </label>
</template>

<style lang="scss">
  .ui-switch {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 8px;

    &__label {
      user-select: none;

      h4 {
        margin: 0;
        font-weight: 500;
        line-height: 16px;
      }

      p {
        margin: 0;
        color: var(--color-text-secondary);
        font-size: 12px;
        line-height: 16px;
      }
    }

    &__input {
      position: absolute;
      width: 0;
      height: 0;
      opacity: 0;
    }

    &__dot {
      position: absolute;
      z-index: 1;
      top: calc(50% - 10px);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--color-background-contrast);
      transition: var(--transition);

      .ui-icon {
        scale: 0.8;
      }
    }

    &__slider {
      display: inline-block;
      width: 36px;
      height: 16px;
      border-radius: 17px;
      background-color: var(--color-background-tertiary);
      transition: var(--transition);

      &::after {
        position: absolute;
        z-index: -1;
        top: -12px;
        left: -10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--color-background-tertiary);
        content: "";
        opacity: 0;
        transition: var(--transition);
      }
    }

    &.is-disabled,
    &.is-loading {
      cursor: not-allowed;

      .ui-switch__slider {
        background-color: var(--color-state-secondary-disabled);
      }

      .ui-switch__dot {
        background-color: var(--color-state-neutral-disabled);
      }

      .ui-switch__label {
        * {
          color: var(--color-text-inactive);
        }
      }
    }

    &:not(.is-disabled, .is-loading):hover {
      .ui-switch__slider {
        background-color: var(--color-state-secondary-hover);
      }
    }

    input:checked + .ui-switch__dot {
      background: var(--color-background-accent);
      transform: translateX(16px);
    }

    input:checked + .ui-switch__dot + .ui-switch__slider::after {
      transform: translateX(16px);
    }

    input:focus-visible + .ui-switch__dot + .ui-switch__slider::after {
      opacity: 0.4;
    }
  }
</style>
