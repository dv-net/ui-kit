<script lang="ts" setup generic="Options">
  import { computed } from "vue";
  import { RecycleScroller } from "vue-virtual-scroller";

  import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
  import { UiLoading } from "@/lib";
  import { SelectListItemSize, SelectListItemSizeKeys } from "@/lib/components/UiSelect/types";

  const props = defineProps<{
    options: Options[];
    size: SelectListItemSizeKeys;

    isLoading: boolean;
  }>();
  defineEmits(["changeInfinityScroll"]);

  const conputedOptions = computed(() =>
    props.options.map((item, index) => {
      return {
        index,
        option: item
      };
    })
  );
  const size = computed(() => SelectListItemSize[props.size]);
</script>

<template>
  <RecycleScroller
    @scroll-end="() => $emit('changeInfinityScroll')"
    :items="conputedOptions"
    :item-size="size"
    key-field="index"
    class="ui-select__options-list-wrapper"
  >
    <template v-slot="{ item }">
      <slot :item="item" />
    </template>

    <template #after>
      <UiLoading iconSize="lg" class="ui-select__virtual-list-loader" :is-show="isLoading && options.length > 0" />
    </template>
  </RecycleScroller>
</template>

<style lang="scss">
  .ui-loading.ui-select__virtual-list-loader {
    position: relative;
    height: 44px;
  }
</style>
