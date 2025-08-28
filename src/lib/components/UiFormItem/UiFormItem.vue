<script setup lang="ts">
  import { uuidv4 } from "uuidv7";
  import { computed, inject, onMounted, ref, watch } from "vue";

  import { UiFormItemProps, UiFormItemProvideData } from "./types";

  import { FORM_PROVIDE_VALUE } from "@/lib/components/UiForm/constants";
  const props = defineProps<UiFormItemProps>();
  const provideData = FORM_PROVIDE_VALUE && inject<UiFormItemProvideData>(FORM_PROVIDE_VALUE);
  const formItemRef = ref();
  const uuid = uuidv4();
  const errorMessage = computed(() => {
    if (provideData?.errors.value && props.name) {
      const errors = provideData?.errors.value[props.name];
      return errors?.length ? errors[0] : "";
    }
    return "";
  });

  function setInputId() {
    const input = formItemRef.value.querySelector("input");
    const textarea = formItemRef.value.querySelector("textarea");
    if (input) {
      input.id = uuid;
    }
    if (textarea) {
      textarea.id = uuid;
    }
  }

  watch(
    () => provideData?.model && props.name && provideData?.model[props.name],
    () => {
      if (provideData?.formSubmitCounts.value && props.name) {
        provideData?.validateField(props.name);
      }
    },
    { deep: true }
  );
  onMounted(() => {
    if (!props.id) {
      setInputId();
    }
  });
</script>

<template>
  <div ref="formItemRef" class="ui-form-item" :class="{ 'is-error': error || errorMessage }">
    <label v-if="label || $slots.label" :for="id ?? uuid">
      <span class="ui-form-item__label">
        <template v-if="label">{{ label }}</template>
        <template v-if="$slots.label">
          <slot name="label" />
        </template>
      </span>
    </label>
    <slot :id="id" />

    <div class="ui-form-item__footer">
      <template v-if="$slots.notation && !errorMessage && !error">
        <slot name="notation" />
      </template>
      <span v-if="notation && !errorMessage && !error" class="ui-form-item__notation">{{ notation }}</span>
      <span v-if="error || errorMessage" class="ui-form-item__error">{{ error || errorMessage }}</span>
    </div>
  </div>
</template>

<style lang="scss">
  .ui-form-item {
    position: relative;

    &__label {
      display: inline-block;
      margin-bottom: 8px;
      color: var(--color-text-secondary);
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
    }

    &__footer {
      min-height: 20px;
      margin-top: 4px;
      font-size: 12px;
      line-height: 16px;
    }

    &__error {
      color: var(--color-text-negative);
    }

    &__notation {
      color: var(--color-text-secondary);
    }

    &.is-error {
      .ui-drag-and-drop {
        border-color: var(--color-state-negative);
        background: var(--color-background-negative);

        &.is-focus {
          border-color: var(--color-state-accent);
          background: var(--color-background-primary);
        }

        &:hover {
          border-color: var(--color-state-secondary-hover);
        }

        &.is-disabled {
          border-color: var(--color-separator-border-primary);
          background: var(--color-background-primary);
        }
      }

      .ui-input,
      .ui-select,
      .ui-textarea {
        background: var(--color-background-negative);
        box-shadow: 0 0 0 1px var(--color-state-negative);

        &.is-focus {
          background: var(--color-background-primary);
          box-shadow: 0 0 0 1px var(--color-state-accent);
        }

        &:hover {
          box-shadow: 0 0 0 1px var(--color-state-secondary-hover);
        }

        &.is-disabled {
          background: var(--color-background-primary);
          box-shadow: 0 0 0 1px var(--color-separator-border-primary);
        }
      }
    }
  }
</style>
