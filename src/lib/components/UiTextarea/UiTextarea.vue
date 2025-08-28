<script setup lang="ts">
  import UiCopyText from "../UiCopyText/UiCopyText.vue";

  import { nextTick, onMounted, ref } from "vue";

  import { UiTextareaProps } from "@/lib/components/UiTextarea/type.ts";

  const props = withDefaults(defineProps<UiTextareaProps>(), {
    size: "md",
    placeholder: "",
    label: "",
    filled: false,
    error: false,
    disabled: false,
    copy: false,
    rows: 1
  });
  const emits = defineEmits(["input", "blur", "focus", "change"]);
  const modelValue = defineModel<string | null>({ default: null });
  const isFocus = ref(false);
  const textareaRef = ref();

  function resize() {
    if (textareaRef.value && props.size == "auto") {
      textareaRef.value.style.height = "1em";
      textareaRef.value.style.height = textareaRef.value.scrollHeight + "px";
    }
  }

  function onBlur() {
    isFocus.value = false;
    emits("blur");
    resize();
  }

  function onInput(e: Event) {
    if (props.isEmptyValueNull && (e.target as HTMLTextAreaElement).value === "") {
      modelValue.value = null;
    }
    resize();
    emits("input", (e.target as HTMLInputElement).value);
  }

  function onFocus() {
    isFocus.value = true;
    emits("focus");
    resize();
  }

  function onKeyup() {
    resize();
  }

  function onChange() {
    emits("change");
  }

  defineExpose({
    focus: () => textareaRef.value?.focus()
  });
  onMounted(() => {
    nextTick(resize);
  });
</script>

<template>
  <label
    class="ui-textarea"
    :class="[
      size,
      { 'is-focus': isFocus },
      { filled: filled },
      { 'is-maxlength': maxLength },
      { 'is-disabled': disabled }
    ]"
  >
    <slot name="prepend" />
    <textarea
      :maxlength="maxLength"
      :id="id"
      ref="textareaRef"
      v-model="modelValue"
      class="ui-textarea__textarea"
      :placeholder="$slots.placeholder ? '' : placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
      @change="onChange"
      @keyup="onKeyup"
      @keydown.esc="textareaRef?.blur()"
      :rows="rows"
    />
    <slot name="append" />
    <div v-if="copy && modelValue" class="ui-textarea__copy" :class="{ 'is-disabled': disabled }">
      <UiCopyText colorIcon="var(--color-icon-tertiary)" sizeIcon="sm" :copiedText="modelValue" />
    </div>
    <div v-if="maxLength" class="ui-textarea__maxlength">{{ modelValue?.length }} / {{ maxLength }}</div>
    <div v-if="$slots.placeholder && !modelValue && !isFocus" class="ui-textarea__placeholder-block">
      <slot name="placeholder"></slot>
    </div>
  </label>
</template>

<style lang="scss">
  @use "./style/index";
</style>
