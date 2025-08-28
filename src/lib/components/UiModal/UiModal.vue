<script setup lang="ts">
  import { onClickOutside } from "@vueuse/core";
  import { onMounted, onUnmounted, ref, watch } from "vue";

  import { UiModalProps } from "./types";

  import { UiIconButton } from "@/lib";
  import { toogleHiddenClass } from "@/lib/helpers/toogleHiddenClass";

  withDefaults(defineProps<UiModalProps>(), {
    padding: "30",
    borderRadius: "12",
    background: "#fff",
    popperClass: "",
    isShowBtnClose: true
  });
  const emits = defineEmits(["close"]);
  const modelValue = defineModel<boolean>({ default: true });
  const contentRef = ref();
  onClickOutside(contentRef, close);

  function close() {
    modelValue.value = false;
    emits("close");
    document.removeEventListener("keydown", pressEscCallback);
  }

  watch(modelValue, (value) => toogleHiddenClass(value));

  const pressEscCallback = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
  };

  onMounted(() => {
    document.addEventListener("keydown", pressEscCallback);
  });
  onUnmounted(() => {
    toogleHiddenClass(false)
  })
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" class="ui-modal" :class="[popperClass]">
        <div
          ref="contentRef"
          class="ui-modal__content"
          :style="{
            background,
            padding: `${padding}px`,
            borderRadius: `${borderRadius}px`,
            width: `${width}px`,
            top: `${positionTop}px`,
            left: `${positionLeft}px`,
            transform: `translate(${positionLeft !== undefined ? '0' : '-50%'}, ${positionTop !== undefined ? '0' : '-50%'})`
          }"
        >
          <slot />
          <UiIconButton
            v-if="isShowBtnClose"
            class="ui-modal__close-icon"
            no-size
            size="sm"
            icon-color="var(--color-icon-tertiary)"
            @click="close"
            icon-name="close"
            icon-type="400"
            tabindex="-1"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
  .ui-modal {
    position: fixed;
    z-index: 9999;
    width: 100vw;
    height: 100dvh;
    background: rgb(0 0 0 / 10%);
    inset: 0;

    &__content {
      position: relative;
      top: 50%;
      left: 50%;
      width: max-content;
      max-width: 100%;
      background: var(--color-background-primary);
      transform: translate(-50%, -50%);
    }

    &__close-icon {
      position: absolute;
      top: 16px;
      right: 16px;
    }
  }
</style>
