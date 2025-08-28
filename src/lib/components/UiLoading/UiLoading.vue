<script setup lang="ts">
  import { UiIcon } from "@/lib";
  import { UiLoadingProps } from "@/lib/components/UiLoading/types.ts";

  withDefaults(defineProps<UiLoadingProps>(), {
    iconSize: "md",
    iconType: "100",
    iconName: "progress-activity"
  });
</script>

<template>
  <Transition name="fade">
    <div v-if="isShow" class="ui-loading" :class="{ 'is-filled': filled }">
      <UiIcon :type="iconType" :name="iconName" :color="iconColor" :size="iconSize" />
    </div>
  </Transition>
</template>

<style lang="scss">
  .ui-loading {
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    inset: 0;

    &.is-filled {
      background-color: rgb(255 255 255 / 60%);
    }

    .ui-icon {
      animation: spin 1s linear infinite;
    }
  }
</style>
