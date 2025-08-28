<script lang="ts" setup>
  import { computed, inject } from "vue";

  import { UiCollapseItemProps } from "./types";

  import { UiIcon } from "@/lib";
  import { COLLAPSE_PROVIDE_VALUE } from "@/lib/components/UiCollapse/constants";
  import { UiCollapseProvideData } from "@/lib/components/UiCollapse/types";
  const props = defineProps<UiCollapseItemProps>();
  const provideData = inject<UiCollapseProvideData>(COLLAPSE_PROVIDE_VALUE);

  const isActive = computed(() => {
    if (provideData?.multiple) {
      if (Array.isArray(provideData?.modelValue.value)) {
        return provideData?.modelValue.value.includes(props.value);
      }
    } else {
      return provideData?.modelValue.value === props.value;
    }
    return false;
  });

  const isDefaultMode = computed(() => provideData?.mode === "default");

  const iconName = computed(() => {
    if (props.iconOpened && props.iconClosed) {
      return isActive.value ? props.iconOpened : props.iconClosed;
    }
    if (isDefaultMode.value) {
      return "keyboard-arrow-down";
    } else {
      return isActive.value ? "minus" : "add";
    }
  });

  const iconSize = computed(() => (isDefaultMode.value ? "md" : "sm"));
  const iconColor = computed(() => (isDefaultMode.value ? "var(--color-icon-primary)" : "var(--color-icon-accent)"));

  function toogle() {
    if (provideData?.multiple) {
      if (Array.isArray(provideData!.modelValue.value)) {
        if (provideData.modelValue.value.includes(props.value)) {
          provideData.modelValue.value = provideData?.modelValue.value.filter((item) => item !== props.value);
        } else {
          provideData.modelValue.value.push(props.value);
        }
      }
    } else {
      if (provideData?.modelValue.value === props.value) {
        provideData.modelValue.value = "";
      } else {
        provideData!.modelValue.value = props.value;
      }
    }
  }
  function enter(el) {
    el.style.height = "auto";
    const height = getComputedStyle(el).height;
    el.style.height = 0;
    getComputedStyle(el);
    setTimeout(() => {
      el.style.height = height;
    });
  }
  function afterEnter(el) {
    el.style.height = "auto";
  }
  function leave(el) {
    el.style.height = getComputedStyle(el).height;
    getComputedStyle(el);
    setTimeout(() => {
      el.style.height = 0;
    });
  }
</script>
<template>
  <div class="ui-collapse-item" :class="[`mode-${provideData?.mode}`, { 'is-active': isActive }]">
    <button @click="toogle" :disabled="disabled" class="ui-collapse-item__header">
      <span v-if="title">{{ title }}</span>
      <slot v-if="$slots.header" name="header" />
      <span class="ui-collapse-item__icon">
        <UiIcon :name="iconName" type="400" :size="iconSize" :color="iconColor" />
      </span>
    </button>
    <Transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
      <div v-show="isActive" class="ui-collapse-item__content">
        <slot />
      </div>
    </Transition>
  </div>
</template>
<style lang="scss">
  .ui-collapse-item {
    transition: var(--transition);

    .expand-enter-active,
    .expand-leave-active {
      overflow: hidden;
    }

    &__content,
    &__header,
    &__icon {
      transition: var(--transition);
    }

    &__header {
      display: flex;
      width: 100%;
      align-items: center;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--color-text-primary);
      cursor: pointer;
      font-family: inherit;
      font-weight: 500;
      line-height: 24px;
      outline: none;
      text-align: left;
    }

    &__icon {
      display: flex;
      min-width: 24px;
      min-height: 24px;
      align-items: center;
      justify-content: center;
    }

    &.mode-default {
      padding-bottom: 24px;
      border-bottom: 1px solid var(--color-separator-border-primary);

      &:not(:last-child) {
        margin-bottom: 24px;
      }

      .ui-collapse-item__header {
        justify-content: space-between;
        font-size: 18px;
        gap: 24px;
      }

      .ui-collapse-item__icon {
        border-radius: 50px;
        background-color: var(--color-state-secondary);
      }

      .ui-collapse-item__content {
        font-size: 14px;
        line-height: 20px;
      }

      &.is-active {
        .ui-collapse-item__header {
          margin-bottom: 16px;
        }

        .ui-collapse-item__icon {
          rotate: 180deg;
        }
      }

      &:disabled {
        cursor: not-allowed;

        .ui-collapse-item__icon {
          opacity: 0.4;
        }
      }

      &:hover,
      &:focus-visible {
        .ui-collapse-item__icon {
          background-color: var(--color-state-secondary-hover);
        }
      }

      &:active {
        .ui-collapse-item__icon {
          background-color: var(--color-state-secondary-pressed);
        }
      }
    }

    &.mode-custom {
      padding: 11px 16px;
      border: 1px solid var(--color-separator-border-primary);
      border-radius: 8px;
      background-color: var(--color-background-secondary);

      &:hover {
        background: color-mix(in srgb, var(--color-background-secondary) 98%, black 2%);
      }

      &:not(:last-child) {
        margin-bottom: 16px;
      }

      .ui-collapse-item__icon {
        border-radius: 6px;
        background-color: var(--color-background-info);
      }

      .ui-collapse-item__header {
        flex-direction: row-reverse;
        justify-content: flex-end;
        font-size: 16px;
        gap: 12px;
      }

      .ui-collapse-item__content {
        padding-left: 36px;
        color: var(--color-text-tertiary);
        font-size: 16px;
        line-height: 20px;
      }

      &.is-active {
        .ui-collapse-item__header {
          padding-bottom: 8px;
        }
      }

      &:hover,
      &:focus-visible {
        border-color: var(--color-separator-border-secondary);
      }
    }
  }
</style>
