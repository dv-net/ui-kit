<script setup lang="ts">
  import { UiDrawer, UiIcon } from "@/lib";
  const modelValue = defineModel<boolean>();

  withDefaults(
    defineProps<{
      size?: string;
      title?: string;
    }>(),
    {
      size: "50%",
      title: ""
    }
  );
</script>

<template>
  <UiDrawer drawer-class="ui-mobile__drawer" v-model="modelValue" :size="size" direction="btt">
    <div class="ui-mobile__header">
      <p class="ui-mobile__header-title">{{ title }}</p>
      <div class="ui-mobile__header-icon-wrapper" @click="modelValue = false">
        <UiIcon size="lg" name="close" type="400" />
      </div>
    </div>
    <div class="ui-mobile__content">
      <slot></slot>
    </div>
  </UiDrawer>
</template>

<style lang="scss">
  .ui-mobile {
    &__drawer {
      display: flex;
      flex-direction: column;
      padding: 12px 0;
      border-radius: 12px 12px 0 0;
    }

    &__header {
      display: flex;
      width: 100%;
      height: 40px;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      margin-bottom: 4px;
      background: white;
    }

    &__header-title {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
    }

    &__header-icon-wrapper {
      display: flex;
      width: 40px;
      height: 40px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      line-height: 0;
    }

    &__content {
      overflow-y: auto;
    }
  }
</style>
