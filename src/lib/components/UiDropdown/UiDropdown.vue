<script lang="ts" setup>
  import UiIcon from "../UiIcon/UiIcon.vue";

  import { autoUpdate, flip, offset, shift, size,useFloating } from "@floating-ui/vue";
  import { onClickOutside, useWindowSize } from "@vueuse/core";
  import { computed, ref, watch } from "vue";

  import { UiDropdownProps } from "./types";

  import { isMobileDevice } from "@/lib/helpers/is-mobile-device";
  const emits = defineEmits(["close", "open"]);
  const props = withDefaults(defineProps<UiDropdownProps>(), {
    trigger: "click",
    fitContentWidth: true,
    placement: "bottom-start",
    teleport: "body"
  });
  const isShow = defineModel<boolean>("modelValue", { default: false });
  const dropdownRef = ref<HTMLDivElement | null>(null);
  const contentRefer = ref(null);
  const widthContent = ref("");
  const { width } = useWindowSize();
  const { x, y } = useFloating(dropdownRef, contentRefer, {
    whileElementsMounted: autoUpdate,
    placement: props.placement,
    middleware: [
      offset(props.offset),
      size({
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${Math.max(300, availableHeight)}px`
          });
        }
      }),
      flip({
        fallbackStrategy: "initialPlacement"
      }),
      shift()
    ]
  });
  onClickOutside(
    dropdownRef,
    () => {
      if (isShow.value) {
        close();
      }
    },
    { ignore: [contentRefer] }
  );

  defineExpose({
    open,
    close
  });

  const contentStyle = computed(() => {
    return {
      top: y.value != null ? `${y.value}px` : "",
      left: x.value != null ? `${x.value}px` : ""
    };
  });

  function setContentWidth() {
    widthContent.value = (dropdownRef.value?.clientWidth ?? 0) + "px";
  }

  function showEventHandler(event: string) {
    if (isMobileDevice() && props.trigger == "hover" && event === "mouseenter") {
      toogleIsShow();
      return;
    }
    if (props.trigger === "click") {
      if (event !== "click") {
        return;
      } else {
        toogleIsShow();
        return;
      }
    }
    if (event === "mouseenter") {
      toogleIsShow();
      return;
    } else if (event === "mouseleave") {
      toogleIsShow();
    }
  }

  function toogleIsShow() {
    if (isShow.value) {
      close();
    } else {
      open();
    }
  }

  function open() {
    isShow.value = true;
    emits("open");
  }
  function close() {
    isShow.value = false;
    emits("close");
  }

  watch([isShow, width], setContentWidth);
</script>
<template>
  <div ref="dropdownRef" class="ui-dropdown">
    <div
      class="ui-dropdown__trigger"
      :class="[{ 'click-event': trigger === 'click', 'is-disabled': disabled }, `mode-${mode}`]"
      @mouseenter="showEventHandler('mouseenter')"
      @mouseleave="showEventHandler('mouseleave')"
      @click="showEventHandler('click')"
    >
      <slot name="reference" />
      <UiIcon
        v-if="mode === 'custom'"
        class="ui-dropdown__trigger-arrow"
        :class="{ rotate: isShow }"
        type="400"
        name="keyboard-arrow-down"
      />
    </div>
    <Teleport :disabled="!teleport" :to="typeof teleport === 'string' ? teleport : 'body'">
      <div
        :class="[popperClass, { 'is-show': isShow }]"
        :style="contentStyle"
        ref="contentRefer"
        role="tooltip"
        class="ui-dropdown__content-wrapper"
      >
        <Transition name="dropdown">
          <div v-if="isShow" class="ui-dropdown__content" :class="{ 'is-fit': fitContentWidth }">
            <slot />
          </div>
        </Transition>
      </div>
    </Teleport>
  </div>
</template>

<style lang="scss">
  .ui-dropdown {
    &__trigger {
      &.mode-custom {
        display: flex;
        width: max-content;
        align-items: center;
        padding: 5px 8px;
        border: 1px solid var(--color-separator-border-primary);
        border-radius: 6px;
        color: var(--color-text-primary);
        font-size: 14px;
        font-weight: 500;
        gap: 4px;
        line-height: 20px;
      }

      &.is-disabled {
        pointer-events: none;
      }

      &.click-event {
        cursor: pointer;
      }
    }

    &__trigger-arrow {
      transition: var(--transition);

      &.rotate {
        rotate: 180deg;
      }
    }

    &__title {
      font-size: 24px;
      font-weight: 600;
      line-height: 24px;
    }

    &__text {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }

    &__content-wrapper {
      position: absolute;
      z-index: 99999;
    }

    &__arrow {
      position: absolute;
      z-index: 9999;
      width: 20px;
      height: 8px;

      &.bottom,
      &.bottom-end,
      &.bottom-start {
        rotate: 180deg;
      }

      &.right,
      &.right-end,
      &.right-start {
        rotate: 90deg;
        transform: translateY(6px);
      }

      &.left,
      &.left-end,
      &.left-start {
        rotate: -90deg;
        transform: translateY(6px);
      }
    }

    &__content {
      min-width: v-bind(widthContent);
      max-height: 280px;
      border-radius: 8px;
      background-color: var(--color-background-primary);
      box-shadow:
        0 4px 20px 0 rgb(0 0 0 / 8%),
        0 -2px 4px 0 rgb(0 0 0 / 2%),
        0 4px 4px 0 rgb(0 0 0 / 2%);
      overflow-y: auto;
      transition: var(--transition);

      &.is-fit {
        max-width: v-bind(widthContent);
      }

      &.mode-light {
        background: var(--color-background-primary);
        color: var(--color-text-primary);

        .ui-dropdown__arrow {
          fill: var(--color-text-contrast);
          filter: drop-shadow(0 2px 2px #00103d0f);
        }
      }

      &.mode-dark {
        background: var(--color-background-contrast);
        color: var(--color-text-contrast);

        .ui-dropdown__arrow {
          fill: var(--color-background-contrast);
        }
      }
    }
  }
</style>
