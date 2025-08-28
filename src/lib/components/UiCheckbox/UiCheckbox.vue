<script setup lang="ts">
  import { computed, inject, watch } from "vue";

  import { CHECKBOX_GROUP_PROVIDE_VALUE } from "../UiCheckboxGroup/constants";
  import { UiCheckboxGroupProvideData } from "../UiCheckboxGroup/types";
  import { UiCheckboxProps } from "./types";

  import { UiIcon } from "@/lib";
  const props = withDefaults(defineProps<UiCheckboxProps>(), {
    size: "md",
    indeterminate: false,
    value: "",
    isSelectedAll: false
  });
  const emits = defineEmits<{
    change: [boolean];
  }>();
  const injectValue = inject<UiCheckboxGroupProvideData | null>(CHECKBOX_GROUP_PROVIDE_VALUE, null);
  const modelValue = defineModel<boolean>({ default: false });
  const sizeValue = computed(() => injectValue?.size?.value ?? props.size);
  const disabledValue = computed(() => injectValue?.disabled?.value ?? props.disabled);

  function changeHandler() {
    emits("change", modelValue.value);
    if (!injectValue || props.isSelectedAll) return;

    if (injectValue.modelValue.value.includes(props.value)) {
      injectValue.modelValue.value = injectValue.modelValue.value.filter((item) => item !== props.value);
    } else {
      injectValue.modelValue.value.push(props.value);
    }
    injectValue.change(props.value);
  }

  function setModelValueFromInjectValue() {
    if (!injectValue || props.isSelectedAll) return;
    modelValue.value = !!injectValue?.modelValue.value.includes(props.value);
  }

  watch(() => injectValue, setModelValueFromInjectValue, { deep: true, immediate: true });
</script>

<template>
  <label :class="{ 'is-disabled': disabledValue }" class="ui-checkbox">
    <input
      :disabled="disabledValue"
      class="ui-checkbox__input"
      :class="{ indeterminate }"
      type="checkbox"
      @change="changeHandler"
      v-model="modelValue"
    />
    <div class="ui-checkbox__checkbox-wrapper">
      <div :class="[`size-${sizeValue}`]" class="ui-checkbox__checkbox-outer">
        <div class="ui-checkbox__checkbox-inner">
          <UiIcon :name="indeterminate ? 'minus' : 'done'" type="400" color="var(--color-white)" :size="sizeValue" />
        </div>
      </div>
    </div>
    <div v-if="$slots.default" class="ui-checkbox__label">
      <div class="ui-checkbox__title">
        <slot />
      </div>
      <div v-if="$slots.subtitle" class="ui-checkbox__subtitle">
        <slot name="subtitle"></slot>
      </div>
    </div>
  </label>
</template>

<style lang="scss">
  .ui-checkbox {
    display: inline-flex;
    align-items: center;
    color: var(--color-text-primary);
    cursor: pointer;
    gap: 8px;

    &__label {
      width: max-content;
    }

    &__checkbox-wrapper {
      position: relative;
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

    &__checkbox-outer {
      display: flex;
      border-radius: 4px;
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

    &__checkbox-inner {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }

    &__input {
      position: absolute;
      z-index: 1;
      width: 0;
      height: 0;
      opacity: 0;

      &:focus-visible + .ui-checkbox__checkbox-wrapper::after {
        background-color: var(--color-state-secondary-disabled);
      }

      &:checked,
      &.indeterminate {
        & + .ui-checkbox__checkbox-wrapper .ui-checkbox__checkbox-outer {
          background-color: var(--color-state-accent);
          box-shadow: 0 0 0 1px var(--color-state-accent) inset;
        }
      }

      &:checked:disabled,
      &.indeterminate:disabled {
        & + .ui-checkbox__checkbox-wrapper .ui-checkbox__checkbox-outer {
          background-color: var(--color-state-accent-disabled);
          box-shadow: 0 0 0 1px var(--color-state-accent-disabled) inset;
        }
      }
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
        .ui-checkbox__checkbox-wrapper {
          background-color: transparent;
        }
      }
    }

    &:hover {
      position: relative;
      z-index: 1;

      .ui-checkbox__checkbox-wrapper::after {
        background-color: var(--color-state-secondary-disabled);
      }
    }
  }
</style>
