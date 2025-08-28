<script lang="ts" setup generic="Options">
  import { computed, ref } from "vue";

  const props = defineProps<{
    options: Options[];
  }>();

  const listRef = ref(null);

  const list = computed(() => {
    return props.options.map((item, index) => {
      return {
        index,
        data: item
      };
    });
  });
</script>
<template>
  <div ref="listRef" class="ui-select__options-list-wrapper">
    <div class="ui-select__options-list">
      <slot :options="list" />
    </div>
  </div>
</template>
