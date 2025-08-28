<script lang="ts" setup>
  import { computed } from "vue";

  import { SelectListItemSize, SelectListItemSizeKeys } from "../types";

  interface UiSelectListItemProps {
    isChecked: boolean;
    isNavigated: boolean;
    size?: SelectListItemSizeKeys;
  }
  const props = withDefaults(defineProps<UiSelectListItemProps>(), {
    size: "sm"
  });
  defineEmits(["check", "mouseOver"]);

  const size = computed(() => SelectListItemSize[props.size] + "px");
</script>
<template>
  <button
    class="ui-select__option"
    :class="[{ 'is-checked': isChecked }, { 'is-navigated': isNavigated }, `size-${size}`]"
  >
    <slot />
  </button>
</template>

<style lang="scss">
  .ui-select__option {
    display: grid;
    overflow: hidden;
    width: 100%;
    min-height: 44px;
    min-height: v-bind(size);
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    border: none;
    background: transparent;
    color: var(--color-text-primary);
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    gap: 12px;
    grid-template-columns: 1fr 20px;
    line-height: 20px;
    outline: none;
    text-align: left;
    text-overflow: ellipsis;
    transition: var(--transition);
    white-space: nowrap;

    & > span {
      overflow: hidden;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:hover {
      background: var(--color-background-secondary);
    }

    &.is-navigated {
      background: var(--color-background-secondary);
    }

    &.is-checked {
      background: var(--color-background-info);
    }

    & + & {
      box-shadow: 0 -1px 0 0 var(--color-separator-border-primary);
    }
  }
</style>
