<script lang="ts" setup>
  import { provide } from "vue";

  import { TABS_PROVIDE_VALUE } from "./constants";
  import { UiTabsProps, UiTabsProvideData } from "./types";
  const props = withDefaults(defineProps<UiTabsProps>(), {
    size: "md",
    mode: "outline"
  });
  const modelValue = defineModel<string, number>({ default: "" });
  const emits = defineEmits(["change"]);
  function change(tab: string | number) {
    emits("change", tab);
  }
  provide<UiTabsProvideData>(TABS_PROVIDE_VALUE, {
    modelValue,
    size: props.size,
    mode: props.mode,
    router: props.router,
    change
  });
</script>

<template>
  <div :class="[`size-${size}`, `mode-${mode}`, { 'is-short': isShort }]" class="ui-tabs">
    <slot />
  </div>
</template>
<style lang="scss">
  .ui-tabs {
    display: flex;

    &.is-short {
      width: max-content;
    }

    &.mode-outline {
      gap: 8px;
    }

    &.mode-light {
      padding: 4px;
      border-radius: 12px;
      background-color: var(--color-background-secondary);
    }

    &.mode-dark {
      padding: 4px;
      border-radius: 12px;
      background-color: var(--color-background-contrast-secondary);
    }

    &.mode-clear {
      border-bottom: 1px solid var(--color-separator-border-primary);
      gap: 32px;
    }
  }
</style>
