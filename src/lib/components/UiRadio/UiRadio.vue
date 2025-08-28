<script setup lang="ts">
  import { inject } from "vue";

  import { RADIO_GROUP_PROVIDE_VALUE } from "../UiRadioGroup/constants";
  import { UiRadioGroupProvideData } from "../UiRadioGroup/types";
  import { UiRadioProps } from "./types";
  const props = withDefaults(defineProps<UiRadioProps>(), {
    size: "md"
  });

  const injectValue = inject<UiRadioGroupProvideData>(RADIO_GROUP_PROVIDE_VALUE);
  function changeHandler() {
    if (injectValue) {
      injectValue.modelValue.value = props.value;
    }

    injectValue?.change(injectValue?.modelValue.value);
  }
</script>

<template>
  <label :class="{ 'is-disabled': injectValue?.disabled?.value ?? props.disabled }" class="ui-radio">
    <input
      :disabled="injectValue?.disabled?.value ?? props.disabled"
      class="ui-radio__input"
      type="radio"
      @change="changeHandler"
      :checked="injectValue?.modelValue.value === props.value"
    />
    <div class="ui-radio__radio-wrapper">
      <div :class="[`size-${injectValue?.size?.value ?? props.size}`]" class="ui-radio__radio-outer">
        <div class="ui-radio__radio-inner"></div>
      </div>
    </div>
    <div v-if="$slots.default" class="ui-radio__label">
      <div class="ui-radio__title">
        <slot />
      </div>
      <div v-if="$slots.subtitle" class="ui-radio__subtitle">
        <slot name="subtitle"></slot>
      </div>
    </div>
  </label>
</template>

<style lang="scss">
  .ui-radio {
    display: inline-flex;
    align-items: center;
    color: var(--color-text-primary);
    cursor: pointer;
    gap: 8px;

    &__radio-wrapper {
      position: relative;
      display: inline-block;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: transparent;
      transition: var(--transition);

      &::after {
        position: absolute;
        z-index: -1;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        content: "";
        transition: var(--transition);
      }
    }

    &__radio-outer {
      display: flex;
      padding: 4px;
      border-radius: 50%;
      background-color: var(--color-white);
      box-shadow: 0 0 0 1px var(--color-separator-border-primary) inset;
      transition: var(--transition);

      &.size-sm {
        width: 16px;
        height: 16px;
      }

      &.size-md {
        width: 20px;
        height: 20px;
      }
    }

    &__radio-inner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    &__input {
      position: absolute;
      z-index: 1;
      width: 0;
      height: 0;
      opacity: 0;

      &:focus-visible + .ui-radio__radio-wrapper::after {
        background-color: var(--color-state-secondary-disabled);
      }

      &:checked + .ui-radio__radio-wrapper .ui-radio__radio-outer {
        box-shadow: 0 0 0 1px var(--color-state-accent) inset;
      }

      &:checked:disabled + .ui-radio__radio-wrapper .ui-radio__radio-outer {
        box-shadow: 0 0 0 1px var(--color-state-accent-disabled) inset;
      }

      &:checked + .ui-radio__radio-wrapper .ui-radio__radio-inner {
        background-color: var(--color-state-accent);
      }

      &:checked:disabled + .ui-radio__radio-wrapper .ui-radio__radio-inner {
        background-color: var(--color-state-accent-disabled);
      }
    }

    &__label {
      width: max-content;
      user-select: none;
    }

    &__title {
      font-size: 14px;
      font-weight: 500;
      line-height: 16px;
      transition: var(--transition);
    }

    &__subtitle {
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      transition: var(--transition);
    }

    &.is-disabled {
      color: var(--color-text-inactive);
      cursor: not-allowed;

      &:hover {
        .ui-radio__radio-wrapper {
          background-color: transparent;
        }
      }
    }

    &:hover {
      .ui-radio__radio-wrapper::after {
        background-color: var(--color-state-secondary-disabled);
      }
    }
  }
</style>
