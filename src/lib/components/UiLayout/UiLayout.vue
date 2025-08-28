<script setup lang="ts">
  import { provide, watch } from "vue";

  import { menuProvide } from "@/lib/components/UiLayout/types.ts";
  import { useBreakpoints } from "@/lib/composables/useBreakpoints";
  import { toogleHiddenClass } from "@/lib/helpers/toogleHiddenClass";

  const breakpoints = useBreakpoints();
  const modelValue = defineModel<boolean>({ default: false });

  function onMenuItemSelect() {
    if (breakpoints.isMobile.value) {
      modelValue.value = false;
    }
  }

  provide<menuProvide>("menu", {
    onMenuItemSelect
  });

  watch(modelValue, () => {
    if (breakpoints.isMobile.value) {
      toogleHiddenClass(modelValue.value);
    }
  });

  watch(
    () => breakpoints.isMobile.value,
    () => {
      if (breakpoints.isMobile.value) {
        modelValue.value = false;
      }
    }
  );
</script>

<template>
  <div class="ui-layout">
    <header class="ui-layout__header">
      <slot name="header"></slot>
    </header>
    <template v-if="breakpoints.isMobile.value">
      <Transition name="fade">
        <nav v-if="modelValue" class="ui-layout__sidebar-mobile">
          <slot name="sidebar-mobile"></slot>
        </nav>
      </Transition>
    </template>
    <nav v-else class="ui-layout__sidebar" :class="{ 'is-grow': modelValue }">
      <slot name="sidebar-desktop"></slot>
    </nav>

    <main class="ui-layout__main" :class="{ 'is-mobile': breakpoints.isMobile.value, 'is-grow': modelValue }">
      <slot></slot>
    </main>
  </div>
</template>

<style lang="scss">
  $header-height: 56px;

  .ui-layout {
    display: flex;
    min-height: 100vh;
    flex-direction: column;

    &__header {
      position: sticky;
      z-index: 201;
      top: 0;
      left: 0;
      display: flex;
      width: 100%;
      min-height: $header-height;
      align-items: center;
      padding: 8px 24px 8px 16px;
      background-color: #fff;

      @media screen and (width < 768px) {
        padding: 8px 16px 8px 8px;
      }
    }

    &__section {
      display: flex;
    }

    &__main {
      width: calc(100% - 240px);
      max-width: 100%;
      min-height: 100%;
      flex-grow: 1;
      padding: 0 63px 93px;
      margin-left: 240px;

      &.is-grow {
        width: calc(100% - 100px);
        margin-left: 100px;
      }

      &-inner {
        min-height: 100%;
        margin: auto;
      }

      &.is-mobile {
        width: auto;
        padding-right: 15px;
        padding-left: 15px;
        margin-left: 0;
      }
    }

    &__sidebar {
      position: fixed;
      top: 0;
      top: $header-height;
      left: 0;
      overflow: auto;
      height: calc(100% - #{$header-height});
      padding-top: 12px;
      padding-right: 24px;
      padding-left: 12px;

      &.is-grow {
        padding: 12px 4px;
      }
    }

    &__sidebar-mobile {
      position: fixed;
      z-index: 9999;
      top: 0;
      left: 0;
      overflow: auto;
      width: 100%;
      height: calc(100vh - #{$header-height});
      padding: 12px;
      margin-top: $header-height;
      background-color: #fff;
    }
  }
</style>
