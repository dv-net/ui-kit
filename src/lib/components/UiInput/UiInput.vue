<script setup lang="ts">
  import UiIconButton from "../UiIconButton/UiIconButton.vue";

  import { onMounted, ref } from "vue";

  import type { InputProps } from "./types";
  const props = withDefaults(defineProps<InputProps>(), {
    size: "md",
    type: "text",
    indexTab: "0",
    autocomplete: "off",
    step: "any"
  });

  const emits = defineEmits<{
    change: [void];
    clear: [void];
    blur: [void];
    input: [string];
  }>();
  const modelValue = defineModel<string | null | number | undefined>("modelValue", { default: null });

  const isFocus = ref(false);
  const isShowPassword = ref(false);
  const inputRef = ref();
  const appendRef = ref();
  const prependRef = ref();

  const readonlyInteractiveAllowedKeys = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Tab",
    "Home",
    "End",
    "Shift",
    "Control",
    "Alt",
    "Meta",
    "Escape"
  ];

  function onBlur() {
    isFocus.value = false;
    inputRef.value?.blur();
    emits("blur");
  }

  function onClear() {
    modelValue.value = props.isEmptyValueNull ? null : "";
    emits("clear");
  }

  function onInput(e: Event) {
    if (props.isEmptyValueNull && (e.target as HTMLInputElement).value === "") {
      modelValue.value = null;
    }
    emits("input", (e.target as HTMLInputElement).value);
  }

  function onFocus() {
    if (props.disabled || props.readonly) return;
    isFocus.value = true;
    inputRef.value?.focus();
  }

  function onKeydown(e: KeyboardEvent) {
    if (!props.readonlyInteractive || e.ctrlKey || e.metaKey) return;
    if (!readonlyInteractiveAllowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  }

  function onBeforeInput(e: Event) {
    if (!props.readonlyInteractive) return;
    e.preventDefault();
  }

  function onPaste(e: ClipboardEvent) {
    if (!props.readonlyInteractive) return;
    e.preventDefault();
  }

  defineExpose({
    focus: () => inputRef.value?.focus()
  });

  onMounted(() => {
    if (appendRef.value && props.disabled) {
      appendRef.value.querySelectorAll("button").forEach((item: HTMLButtonElement) => (item.disabled = true));
    }
    if (prependRef.value && props.disabled) {
      prependRef.value.querySelectorAll("button").forEach((item: HTMLButtonElement) => (item.disabled = true));
    }
  });
</script>

<template>
  <div
    class="ui-input"
    tabindex="-1"
    :class="[
      size,
      { 'is-focus': isFocus },
      { 'is-filled': filled },
      { 'is-disabled': disabled },
      { 'is-inside': inside },
      { 'not-empty': !!modelValue }
    ]"
    @click="onFocus"
  >
    <div v-if="$slots.prepend" ref="prependRef" class="ui-input__prepend">
      <slot name="prepend" />
    </div>
    <div class="ui-input__inner" tabindex="-1">
      <span v-if="inside" class="ui-input__label">{{ placeholder }}</span>

      <input
        ref="inputRef"
        v-model.trim="modelValue"
        class="ui-input__input"
        :type="showPassword ? (isShowPassword ? 'text' : 'password') : type"
        :placeholder="inside ? '' : placeholder"
        :disabled="disabled"
        @keydown="onKeydown"
        @beforeinput="onBeforeInput"
        @paste="onPaste"
        @blur="onBlur"
        @focus="onFocus"
        @change="$emit('change')"
        @input="onInput"
        @keydown.esc="inputRef?.blur()"
        :readonly="readonly"
        :autofocus="autofocus"
        :tabindex="indexTab"
        :autocomplete="autocomplete"
        :name="name"
        :step="step"
      />
    </div>

    <div ref="appendRef" class="ui-input__append">
      <Transition v-if="clearable" name="fade">
        <UiIconButton
          v-show="clearable && modelValue"
          no-size
          size="sm"
          icon-color="var(--color-icon-tertiary)"
          @click="onClear"
          icon-name="close"
          icon-type="400"
          tabindex="-1"
        />
      </Transition>
      <Transition v-if="showPassword" name="fade">
        <UiIconButton
          v-show="showPassword && modelValue"
          @click.stop="isShowPassword = !isShowPassword"
          :icon-name="isShowPassword ? 'visibility' : 'visibility-off'"
          icon-type="400"
          icon-color="var(--color-icon-secondary)"
          no-size
          size="sm"
          tabindex="-1"
        />
      </Transition>

      <slot name="append" />
    </div>
  </div>
</template>

<style lang="scss">
  @use "./style/index";
</style>
