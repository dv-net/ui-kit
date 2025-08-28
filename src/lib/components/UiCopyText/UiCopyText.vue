<script setup lang="ts">
  import UiIcon from "@/lib/components/UiIcon/UiIcon.vue";

  import { useClipboard } from "@vueuse/core";
  import { ref } from "vue";

  import { UiCopyTextProps } from "@/lib/components/UiCopyText/types";

  const props = withDefaults(defineProps<UiCopyTextProps>(), {
    timeout: 1500,
    colorIcon: "inherit",
    typeIcon: "400",
    sizeIcon: "md",
    nameIcon: "content-copy"
  });

  const { copy } = useClipboard({ legacy: true });

  let copyTimer: ReturnType<typeof setTimeout>;

  const isShowDone = ref<boolean>(false);

  const copyHandler = (): void => {
    isShowDone.value = false;
    clearInterval(copyTimer);
  };

  const handleCopyText = async (): Promise<void> => {
    isShowDone.value = true;
    copy(String(props.copiedText));
    copyTimer = setTimeout(copyHandler, props.timeout);
  };

  defineExpose({
    copy: handleCopyText
  });
</script>

<template>
  <button
    @click.prevent.stop="handleCopyText"
    v-if="copiedText"
    :class="{ 'ui-copy': true, 'hover-scale': !isShowDone }"
  >
    <slot v-if="$slots.prepend" name="prepend" />
    <UiIcon v-show="!isShowDone" :type="typeIcon" :size="sizeIcon" :color="colorIcon" :name="nameIcon" />
    <UiIcon v-show="isShowDone" :color="colorIcon" :type="typeIcon" :size="sizeIcon" name="done" />
    <slot v-if="$slots.append" name="append" />
  </button>
</template>

<style lang="scss">
  .ui-copy {
    display: flex;
    width: max-content;
    align-items: center;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    gap: 4px;
    line-height: 16px;
    outline: none;
    text-align: left;

    @media (hover: hover) and (pointer: fine) {
      &.hover-scale {
        .ui-icon {
          &:hover {
            scale: 1.1;
            transition: var(--transition);
          }
        }
      }
    }
  }
</style>
