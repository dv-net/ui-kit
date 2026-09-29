<script lang="ts" setup generic="Options">
  import { computed } from "vue";

  const props = defineProps<{
    options: Options[];
  }>();

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
  <div class="ui-select__options-list-wrapper">
    <div class="ui-select__options-list">
      <slot :options="list" />
    </div>
  </div>
</template>
