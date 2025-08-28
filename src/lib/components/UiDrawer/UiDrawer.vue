<script setup lang="ts">
  import UiOverlay from "@/lib/components/UiOverlay/UiOverlay.vue";

  import { computed, onBeforeUnmount, watch } from "vue";

  import { Orientation, UiDrawerProps } from "@/lib/components/UiDrawer/types.ts";

  const modelValue = defineModel<boolean>();
  const scrollLockClass = "ui-drawer__lock-scroll";

  const props = withDefaults(defineProps<UiDrawerProps>(), {
    direction: "rtl",
    size: "50%"
  });

  const orientation = computed<Orientation>(() => {
    return ["rtl", "ltr"].includes(props.direction) ? "horizontal" : "vertical";
  });

  function addScrollLockClass() {
    const htmlEl = document.querySelector("html");
    htmlEl?.classList.add(scrollLockClass);
  }

  function removeScrollLockClass() {
    const htmlEl = document.querySelector("html");
    htmlEl?.classList.remove(scrollLockClass);
  }

  watch(modelValue, () => {
    if (modelValue.value) {
      addScrollLockClass();
    } else {
      removeScrollLockClass();
    }
  });

  onBeforeUnmount(() => {
    removeScrollLockClass();
  });
</script>

<template>
  <div>
    <Teleport to="body">
      <UiOverlay v-bind="{ ...$attrs }" v-model="modelValue" @click="modelValue = false">
        <Transition appear>
          <div
            v-if="modelValue"
            :style="{
              width: orientation === 'horizontal' ? size : '100%',
              height: orientation === 'vertical' ? size : '100%'
            }"
            class="ui-drawer"
            :class="[direction, orientation, drawerClass]"
          >
            <slot></slot>
          </div>
        </Transition>
      </UiOverlay>
    </Teleport>
  </div>
</template>

<style lang="scss">
  .ui-drawer {
    position: absolute;
    z-index: 9999;
    background: white;

    &.horizontal {
      top: 0;
      bottom: 0;
      height: 100%;

      &.rtl {
        right: 0;
      }

      &.ltr {
        left: 0;
      }
    }

    &.vertical {
      right: 0;
      left: 0;
      width: 100%;

      &.ttb {
        top: 0;
      }

      &.btt {
        bottom: 0;
      }
    }

    &__lock-scroll {
      overflow-y: hidden;
    }

    &.v-enter-active {
      transition: all 0.3s ease;
    }

    &.v-leave-active {
      transition: all 0.3s ease;
    }

    &.v-enter-from,
    &.v-leave-to {
      &.rtl {
        transform: translateX(100%);
      }

      &.ltr {
        transform: translateX(-100%);
      }

      &.ttb {
        transform: translateY(-100%);
      }

      &.btt {
        transform: translateY(100%);
      }
    }
  }
</style>
