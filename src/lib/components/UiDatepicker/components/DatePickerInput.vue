<script lang="ts" setup>
  import { vMaska } from "maska/vue";
  import { ref, onMounted, nextTick } from "vue";

  import { UiIconButton } from "@/lib";

  interface DatePickerInputProps {
    placeholder: string;
    isError: boolean;
    maska: string;
    label: string;
    autofocus?: boolean;
  }

  defineEmits(["input"]);
  const { autofocus } = defineProps<DatePickerInputProps>();
  const inputRef = ref();
  const modelValue = defineModel();

  function clear() {
    modelValue.value = "";
    inputRef.value?.focus();
  }

  onMounted(() => {
    if (!autofocus) return;

    nextTick(() => {
      if (!inputRef.value) return;

      inputRef.value?.focus();
    });
  });
</script>
<template>
  <label>
    <span v-if="label" class="com-datepicker-input__label">{{ label }}</span>
    <div class="com-datepicker-input__wrapper" :class="{ error: isError }">
      <input
        ref="inputRef"
        @input="(e: Event) => $emit('input', (e.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        v-maska="maska"
        class="com-datepicker-input__input"
        v-model="modelValue"
      />
      <Transition name="fade">
        <UiIconButton
          v-if="modelValue"
          @click="clear"
          icon-color="var(--color-icon-tertiary)"
          icon-name="close"
          icon-type="400"
          no-size
        />
      </Transition>
    </div>
  </label>
</template>
<style lang="scss">
  .com-datepicker-input {
    &__wrapper {
      display: flex;
      width: 280px;
      height: 44px;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      border-radius: 4px 4px 0 0;
      border-bottom: 1px solid var(--color-separator-border-primary);
      background-color: var(--color-background-secondary);
      transition: var(--transition);

      &.error {
        border-color: red;
      }
    }

    &__label {
      display: inline-block;
      margin-bottom: 4px;
      color: var(--color-text-primary);
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
    }

    &__input {
      width: 100%;
      padding: 0;
      border: none;
      background-color: transparent;
      color: var(--color-text-primary);
      font-family: inherit;
      font-size: 16px;
      outline: none;

      &::placeholder {
        color: var(--color-text-tertiary);
      }
    }
  }
</style>
