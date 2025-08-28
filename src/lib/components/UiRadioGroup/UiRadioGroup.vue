<script setup lang="ts">
  import { computed, provide } from "vue";

  import { RADIO_GROUP_PROVIDE_VALUE } from "./constants";
  import { UiRadioGroupProps, UiRadioGroupProvideData } from "./types";
  const props = withDefaults(defineProps<UiRadioGroupProps>(), {
    size: "md"
  });
  const emits = defineEmits<{
    change: [value: string | number];
  }>();

  const modelValue = defineModel<string | number>({ default: "" });
  provide<UiRadioGroupProvideData>(RADIO_GROUP_PROVIDE_VALUE, {
    modelValue,
    disabled: computed(() => props.disabled),
    change,
    size: computed(() => props.size)
  });

  function change(value: string | number) {
    emits("change", value);
  }
</script>

<template>
  <div class="ui-radio-group">
    <slot />
  </div>
</template>

<style lang="scss">
  .ui-radio-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>
