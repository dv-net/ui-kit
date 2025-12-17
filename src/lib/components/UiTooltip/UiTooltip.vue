<script lang="ts" setup>
  import { arrow, autoUpdate, flip, offset, shift, size, useFloating } from "@floating-ui/vue";
  import { onClickOutside } from "@vueuse/core";
  import { computed, onUnmounted, ref } from "vue";

  import { UiTooltipProps } from "./types";

  import { UiIconButton } from "@/lib";
  import { isMobileDevice } from "@/lib/helpers/is-mobile-device";

  const emits = defineEmits<{ close: [void]; click: [void] }>();

  const props = withDefaults(defineProps<UiTooltipProps>(), {
    position: "top",
    showEvent: "hover",
    title: "",
    popperClass: "",
    text: "",
    disabled: false,
    timeout: 100,
    teleport: "body",
    tabindex: 0,
    backgroundColor: "#222",
    maxWidth: "314px",
    padding: "16px",
    borderRadius: "8px",
    width: "fit-content"
  });

  let timeoutStorage: ReturnType<typeof setTimeout> | null = null;
  const triggerRefer = ref(null);
  const arrowRefer = ref(null);
  const contentRefer = ref(null);
  const modelValue = defineModel<boolean>({ default: false });
  onClickOutside(
    contentRefer,
    (e) => {
      if (e) {
        modelValue.value = false;
      }
    },
    { ignore: [triggerRefer] }
  );
  const { middlewareData, placement, floatingStyles } = useFloating(triggerRefer, contentRefer, {
    whileElementsMounted: autoUpdate,
    placement: props.position,
    middleware: [
      offset(10),
      shift(),
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
      arrow({ element: arrowRefer, padding: 30 })
    ]
  });

  const arrowStyle = computed(() => {
    const data = middlewareData.value.arrow;
    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right"
    }[placement.value.split("-")[0]];

    return {
      left: data?.x != null ? `${data?.x}px` : "",
      top: data?.y != null ? `${data?.y}px` : "",
      right: "",
      bottom: "",
      [staticSide!]: "-8px",
      fill: props.backgroundColor
    };
  });

  function blurHandler() {
    modelValue.value = false;
  }

  function focusHandler() {
    modelValue.value = true;
  }

  function toggleShow() {
    modelValue.value = !modelValue.value;
  }

  function closeHandler() {
    toggleShow();
    emits("close");
  }

  function showEventHandler(event: string, state?: "enter" | "leave") {
    if (event === "click") {
      emits("click");
    }
    if (isMobileDevice()) {
      if (event === "hover") return;
      return toggleShow();
    }
    if (props.showEvent === "click" && event === "click") {
      return toggleShow();
    }
    if (props.showEvent === "hover" && event === "hover") {
      if (!modelValue.value) return (modelValue.value = true);
      if (state === "enter") {
        clearTimeoutStorage();
        modelValue.value = true;
      } else if (state === "leave") {
        timeoutStorage = setTimeout(() => (modelValue.value = false), props.timeout);
      }
    }
  }

  function handleMouseBody(state: "enter" | "leave") {
    if (props.showEvent !== "hover") return;
    if (state === "enter") {
      clearTimeoutStorage();
    } else if (state === "leave") {
      timeoutStorage = setTimeout(() => (modelValue.value = false), props.timeout);
    }
  }

  function clearTimeoutStorage() {
    if (timeoutStorage) clearTimeout(timeoutStorage);
  }

  onUnmounted(() => {
    clearTimeoutStorage();
  });
</script>
<template>
  <div class="ui-tooltip">
    <div
      role="button"
      :tabindex="tabindex"
      ref="triggerRefer"
      aria-describedby="tooltip"
      class="ui-tooltip__trigger"
      :class="{ 'click-event': showEvent === 'click', 'is-disabled': disabled }"
      @mouseenter="showEventHandler('hover', 'enter')"
      @mouseleave="showEventHandler('hover', 'leave')"
      @keydown.enter="toggleShow"
      @click.stop.prevent="showEventHandler('click')"
      @keydown.tab="blurHandler"
      @keyup.tab="focusHandler"
    >
      <slot />
    </div>

    <Transition v-if="!disabled" name="fade">
      <Teleport v-if="modelValue" :disabled="!teleport" :to="typeof teleport === 'string' ? teleport : 'body'">
        <div
          v-if="modelValue"
          :class="[{ 'click-event': showEvent === 'click' }, popperClass]"
          :style="floatingStyles"
          ref="contentRefer"
          role="tooltip"
          class="ui-tooltip__content-wrapper"
          @mouseenter="handleMouseBody('enter')"
          @mouseleave="handleMouseBody('leave')"
        >
          <div
            class="ui-tooltip__content"
            :style="{
              backgroundColor: props.backgroundColor,
              maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth,
              padding: typeof props.padding === 'number' ? `${props.padding}px` : props.padding,
              borderRadius: typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius,
              width: typeof props.width === 'number' ? `${props.width}px` : props.width
            }"
          >
            <div class="ui-tooltip__content-inner">
              <div v-if="$slots.title || title" :class="[{ 'ui-tooltip__title': title }, 'ui-tooltip--title']">
                <template v-if="title">{{ title }}</template>
                <slot v-else name="title" />
                <UiIconButton
                  v-if="isShowIconClose"
                  @click.stop="closeHandler"
                  icon-color="#fff"
                  no-size
                  icon-name="close"
                  icon-type="400"
                  size="sm"
                />
              </div>
              <div v-if="($slots.title || title) && ($slots.text || text)" class="ui-tooltip__line" />
              <div v-if="$slots.text || text" :class="{ 'ui-tooltip__text': text }">
                <template v-if="text">{{ text }}</template>
                <slot v-else name="text" />
              </div>
              <slot v-if="$slots.append" name="append" />
            </div>
            <svg
              ref="arrowRefer"
              width="20"
              height="8"
              viewBox="0 0 20 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :style="arrowStyle"
              class="ui-tooltip__arrow"
              :class="placement"
            >
              <path d="M9.89637 8L0 0L20 0L9.89637 8Z" />
            </svg>
          </div>
        </div>
      </Teleport>
    </Transition>
  </div>
</template>

<style lang="scss">
  .ui-tooltip {
    display: inline-flex;

    &__trigger {
      display: inline-flex;
      align-items: center;
      cursor: default;
      gap: 4px;
      outline: none;

      &.click-event {
        cursor: pointer;
      }

      &.is-disabled {
        cursor: default;
      }
    }

    &--title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    &__title {
      font-size: 16px;
      font-weight: 700;
      line-height: 20px;
    }

    &__text {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      overflow-wrap: break-word;
    }

    &__content-inner {
      max-height: 400px;
      overflow-y: auto;
    }

    &__content-wrapper {
      position: absolute;
      z-index: 99999;

      &.click-event {
        .ui-tooltip__text,
        .ui-tooltip__title {
          max-width: 314px;
        }
      }
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
      position: relative;
      display: flex;
      flex-direction: column;
      box-shadow:
        0 6px 12px 0 rgb(0 16 61 / 6%),
        0 0 6px 0 rgb(0 0 0 / 6%),
        0 0 2px 0 rgb(0 16 61 / 6%);
      color: var(--color-text-contrast);

      .ui-tooltip__arrow {
        fill: #222;
      }

      .ui-tooltip__title {
        color: #f7a700;
        font-size: 16px;
        font-weight: 400;
      }

      .ui-tooltip__text {
        font-size: 12px;
        line-height: 16px;
      }

      .ui-tooltip__close {
        top: 18px;
        right: 16px;
      }
    }

    &__line {
      width: 100%;
      border-bottom: 1px solid rgb(255 255 255 / 20%);
      margin: 8px 0;
    }

    &__close {
      position: absolute;
      cursor: pointer;
    }
  }
</style>
