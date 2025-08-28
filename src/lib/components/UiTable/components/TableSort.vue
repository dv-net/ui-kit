<script setup lang="ts">
  import { UiIcon } from "@/lib";
  import { UiTableSortOrder } from "@/lib/components/UiTable/types.ts";

  const modelValue = defineModel<UiTableSortOrder>({ default: null });
  const emits = defineEmits(["sort"]);

  function sort() {
    if (!modelValue.value || modelValue.value === "asc") {
      emits("sort", "desc");
    } else if (modelValue.value === "desc") {
      emits("sort", "asc");
    }
  }
</script>

<template>
  <button class="ui-table-sort" @click="sort">
    <slot />
    <UiIcon type="400" name="filter" :class="[modelValue]" />
  </button>
</template>

<style lang="scss">
  .ui-table-sort {
    display: inline-flex;
    overflow: hidden;
    align-items: center;
    padding: 0;
    border: 0;
    margin: 0;
    background: transparent;
    color: var(--color-icon-secondary);
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    gap: 8px;
    outline: 0;
    transition: var(--transition);

    span {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &:hover {
      opacity: 0.8;
    }

    .ui-icon {
      transition: var(--transition);

      &.asc {
        transform: rotate(180deg);
      }

      &.asc,
      &.desc {
        color: var(--color-icon-tertiary) !important;
      }
    }
  }
</style>
