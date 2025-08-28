<script lang="ts" setup>
  import { provide } from "vue";

  import { COLLAPSE_PROVIDE_VALUE } from "@/lib/components/UiCollapse/constants";
  import { UiCollapseProvideData,UiCollapsProps } from "@/lib/components/UiCollapse/types";
  const props = withDefaults(defineProps<UiCollapsProps>(), {
    mode: "default",
    multiple: true
  });
  const modelValue = defineModel<string | number | unknown[] | undefined>();

  provide<UiCollapseProvideData>(COLLAPSE_PROVIDE_VALUE, {
    modelValue,
    mode: props.mode,
    multiple: props.multiple
  });
</script>

<template>
  <div class="ui-collapse">
    <slot />
  </div>
</template>
