<script setup lang="ts">
  import { defineAsyncComponent, markRaw, ref, watch } from "vue";

  import { FlagIconProps } from "./types.ts";

  const props = withDefaults(defineProps<FlagIconProps>(), {
    isSmall: false
  });

  const currentIcon = ref();
  watch(
    () => props.isoCode,
    () => {
      currentIcon.value = markRaw(defineAsyncComponent(() => import(`../../assets/icons/flags/${props.isoCode}.svg`)));
    },
    { immediate: true }
  );
</script>

<template>
  <div class="ui-flag-icon" :class="{ 'is-small': isSmall }">
    <component class="ui-flag-icon__icon" v-if="currentIcon" :is="currentIcon" loading="lazy" :alt="isoCode" />
  </div>
</template>

<style lang="scss">
  .ui-flag-icon {
    overflow: hidden;
    width: 26px;
    flex-shrink: 0;
    border: 1px solid #e1e8f1;
    border-radius: 4px;
    background-color: #e1e8f1;

    &__icon {
      display: block;
      width: 100%;
      height: 100%;
      flex-shrink: 0;
    }

    &.is-small {
      width: 22px;
    }
  }
</style>
