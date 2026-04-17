<script lang="ts" setup>
  import { nextTick, onMounted, onUnmounted, provide, ref, watch } from "vue";

  import { TABS_PROVIDE_VALUE } from "./constants";
  import { UiTabsProps, UiTabsProvideData } from "./types";
  const props = withDefaults(defineProps<UiTabsProps>(), {
    size: "md",
    mode: "outline",
    widthMode: "full"
  });
  const modelValue = defineModel<string, number>({ default: "" });
  const emits = defineEmits(["change"]);
  const tabsRef = ref<HTMLElement | null>(null);
  const indicatorX = ref(0);
  const indicatorWidth = ref(0);
  const hasIndicator = ref(false);
  const maxTabWidth = ref(0);
  let resizeObserver: ResizeObserver | null = null;
  let mutationObserver: MutationObserver | null = null;

  const updateIndicator = async () => {
    await nextTick();
    if (!tabsRef.value || !["light", "dark"].includes(props.mode)) {
      hasIndicator.value = false;
      return;
    }

    const activeTab = tabsRef.value.querySelector<HTMLElement>(".ui-tabs-item__button.is-active");
    if (!activeTab) {
      hasIndicator.value = false;
      return;
    }

    indicatorX.value = activeTab.offsetLeft;
    indicatorWidth.value = activeTab.offsetWidth;
    hasIndicator.value = true;
  };

  const getButtonNaturalWidth = (button: HTMLElement): number => {
    const clone = button.cloneNode(true) as HTMLElement;
    clone.style.position = "fixed";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.width = "auto";
    clone.style.maxWidth = "none";
    clone.style.minWidth = "0";
    clone.style.visibility = "hidden";
    clone.style.pointerEvents = "none";
    document.body.appendChild(clone);
    const width = clone.offsetWidth;
    document.body.removeChild(clone);
    return width;
  };

  const updateEqualWidth = async () => {
    await nextTick();
    if (!tabsRef.value) return;

    const shouldUseEqual = props.widthMode === "equal";
    if (!shouldUseEqual) {
      maxTabWidth.value = 0;
      tabsRef.value.style.removeProperty("--ui-tabs-max-tab-width");
      return;
    }

    const buttons = tabsRef.value.querySelectorAll<HTMLElement>(".ui-tabs-item__button");
    if (!buttons.length) {
      maxTabWidth.value = 0;
      tabsRef.value.style.removeProperty("--ui-tabs-max-tab-width");
      return;
    }

    maxTabWidth.value = Math.max(...Array.from(buttons).map((button) => getButtonNaturalWidth(button)));
    tabsRef.value.style.setProperty("--ui-tabs-max-tab-width", `${maxTabWidth.value}px`);
  };

  const observeTabButtons = () => {
    if (!tabsRef.value || !resizeObserver) return;
    resizeObserver.disconnect();
    resizeObserver.observe(tabsRef.value);
    const buttons = tabsRef.value.querySelectorAll<HTMLElement>(".ui-tabs-item__button");
    buttons.forEach((button) => resizeObserver?.observe(button));
  };

  function change(tab: string | number) {
    emits("change", tab);
  }
  provide<UiTabsProvideData>(TABS_PROVIDE_VALUE, {
    modelValue,
    size: props.size,
    mode: props.mode,
    router: props.router,
    change
  });

  watch(
    () => modelValue.value,
    () => {
      void updateIndicator();
      void updateEqualWidth();
    },
    { immediate: true }
  );

  watch(
    () => props.mode,
    () => {
      void updateIndicator();
    },
    { immediate: true }
  );

  watch(
    () => props.widthMode,
    () => {
      void updateEqualWidth();
      void updateIndicator();
    },
    { immediate: true }
  );

  onMounted(() => {
    resizeObserver = new ResizeObserver(() => {
      void updateIndicator();
      void updateEqualWidth();
    });

    mutationObserver = new MutationObserver(() => {
      observeTabButtons();
      void updateIndicator();
      void updateEqualWidth();
    });

    if (tabsRef.value) {
      mutationObserver.observe(tabsRef.value, {
        childList: true,
        subtree: true,
        characterData: true
      });
      observeTabButtons();
    }

    window.addEventListener("resize", updateIndicator);
    window.addEventListener("resize", updateEqualWidth);
    void updateIndicator();
    void updateEqualWidth();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateIndicator);
    window.removeEventListener("resize", updateEqualWidth);
    mutationObserver?.disconnect();
    mutationObserver = null;
    resizeObserver?.disconnect();
    resizeObserver = null;
  });
</script>

<template>
  <div
    ref="tabsRef"
    :class="[
      `size-${size}`,
      `mode-${mode}`,
      `width-${widthMode}`,
      { 'is-short': isShort || widthMode === 'content' }
    ]"
    class="ui-tabs"
  >
    <span
      v-if="hasIndicator && ['light', 'dark'].includes(mode)"
      class="ui-tabs__indicator"
      :style="{ width: `${indicatorWidth}px`, transform: `translateX(${indicatorX}px)` }"
    />
    <slot />
  </div>
</template>
<style lang="scss">
  .ui-tabs {
    position: relative;
    display: flex;

    &.is-short {
      width: max-content;
    }

    &.width-equal {
      width: max-content;
    }

    &.mode-outline {
      gap: 8px;
    }

    &.mode-light {
      padding: 4px;
      border-radius: 12px;
      background-color: var(--color-background-secondary);
    }

    &.mode-dark {
      padding: 4px;
      border-radius: 12px;
      background-color: var(--color-background-contrast-secondary);
    }

    &.mode-clear {
      border-bottom: 1px solid var(--color-separator-border-primary);
      gap: 32px;
    }

    &__indicator {
      position: absolute;
      z-index: 0;
      top: 4px;
      bottom: 4px;
      left: 0;
      border-radius: 8px;
      pointer-events: none;
      transition:
        transform 0.25s ease,
        width 0.25s ease;
    }

    &.mode-light &__indicator {
      background: var(--color-background-primary);
      box-shadow: 0 0 6.4px 0 rgb(0 0 0 / 9%);
    }

    &.mode-dark &__indicator {
      background: var(--color-background-contrast);
      box-shadow: 0 0 6.4px 0 rgb(0 0 0 / 9%);
    }
  }
</style>
