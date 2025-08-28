<script setup lang="ts">
  import { computed, nextTick, provide } from "vue";

  import { CHECKBOX_GROUP_PROVIDE_VALUE } from "./constants";
  import { UiCheckboxGroupProps, UiCheckboxGroupProvideData } from "./types";
  const props = withDefaults(defineProps<UiCheckboxGroupProps>(), {
    size: "md"
  });
  const emits = defineEmits<{
    change: [value: Array<string | number>];
  }>();
  const modelValue = defineModel<Array<string | number>>({ default: [] });
  provide<UiCheckboxGroupProvideData>(CHECKBOX_GROUP_PROVIDE_VALUE, {
    modelValue,
    disabled: computed(() => props.disabled),
    change,
    size: computed(() => props.size)
  });

  function change() {
    nextTick(() => {
      emits("change", modelValue.value);
    });
  }
</script>

<template>
  <div class="ui-checkbox-group">
    <slot />
  </div>
</template>

<style lang="scss">
  .ui-checkbox-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>
