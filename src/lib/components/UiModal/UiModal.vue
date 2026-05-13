<script setup lang="ts">
  import { onClickOutside } from "@vueuse/core";
  import { computed, onMounted, onUnmounted, ref, watch } from "vue";

  import { UiModalProps } from "./types";

  import { UiIconButton } from "@/lib";
  import { toogleHiddenClass } from "@/lib/helpers/toogleHiddenClass";

  const props = withDefaults(defineProps<UiModalProps>(), {
    padding: "30",
    borderRadius: "12",
    background: "#fff",
    popperClass: "",
    isShowBtnClose: true,
    teleport: true
  });

  const modalCssVars = computed(() => {
    const v: Record<string, string> = {
      "--ui-modal-content-bg": props.background,
      "--ui-modal-content-padding": `${props.padding}px`,
      "--ui-modal-content-radius": `${props.borderRadius}px`
    };
    if (props.width) {
      v["--ui-modal-content-width"] = `${props.width}px`;
    }
    if (props.positionTop) {
      v["--ui-modal-content-top"] = `${props.positionTop}px`;
      v["--ui-modal-content-translate-y"] = "0";
    }
    if (props.positionLeft) {
      v["--ui-modal-content-left"] = `${props.positionLeft}px`;
      v["--ui-modal-content-translate-x"] = "0";
    }
    return v;
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

  const pressEscCallback = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
  };

  watch(modelValue, (value) => toogleHiddenClass(value));

  onMounted(() => {
    document.addEventListener("keydown", pressEscCallback);
  });
  onUnmounted(() => {
    toogleHiddenClass(false);
  });
</script>

<template>
  <Teleport :disabled="!teleport" :to="typeof teleport === 'string' ? teleport : 'body'">
    <Transition name="fade">
      <div v-if="modelValue" class="ui-modal" :class="[popperClass]" :style="modalCssVars">
        <div ref="contentRef" class="ui-modal__content">
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
    padding: 16px;
    background: rgb(0 0 0 / 80%);
    inset: 0;

    &__content {
      position: relative;
      top: var(--ui-modal-content-top, 50%);
      left: var(--ui-modal-content-left, 50%);
      width: var(--ui-modal-content-width, max-content);
      max-width: 100%;
      padding: var(--ui-modal-content-padding, 30px);
      border-radius: var(--ui-modal-content-radius, 12px);
      background: var(--ui-modal-content-bg, var(--color-background-primary));
      transform: translate(
        var(--ui-modal-content-translate-x, -50%),
        var(--ui-modal-content-translate-y, -50%)
      );
    }

    &__close-icon {
      position: absolute;
      top: 16px;
      right: 16px;
    }
  }
</style>
