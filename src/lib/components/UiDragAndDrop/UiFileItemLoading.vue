<script setup lang="ts">
  import UiButton from "@/lib/components/UiButton/UiButton.vue";
  import UiProgressBar from "@/lib/components/UiDragAndDrop/UiProgressBar.vue";

  import { computed } from "vue";

  import type { FileToUpload } from "./types.ts";

  import { config } from "@/lib/config/index.ts";

  const props = defineProps<{
    file: FileToUpload;
  }>();

  defineEmits<{
    (e: "cancel", id: string): void;
  }>();

  const fileNameLabel = computed(() => `${config.uiDragAndDrop.translations.file} «${props.file.file.name}»`);
  const percentLabel = computed(() => Math.ceil(props.file.percent));
</script>

<template>
  <div class="ui-file-item-loading">
    <div class="ui-file-item-loading__info-wrapper">
      <div class="ui-file-item-loading__file-info">
        <p class="ui-file-item-loading__file-name">{{ fileNameLabel }}</p>
        <p class="ui-file-item-loading__percent">{{ percentLabel }}%</p>
      </div>
      <UiProgressBar :model-value="props.file.percent" />
    </div>
    <UiButton type="tertiary" mode="accent" @click="$emit('cancel', props.file.id)">{{
      config.uiDragAndDrop.translations.cancel
    }}</UiButton>
  </div>
</template>

<style lang="scss">
  .ui-file-item-loading {
    display: grid;
    align-items: center;
    padding: 12px;
    border: 1px solid var(--color-separator-border-primary);
    border-radius: 12px;
    gap: 32px;
    grid-template-columns: minmax(0, 1fr) min-content;

    &__file-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    &__file-name {
      overflow: hidden;
      color: var(--color-text-secondary);
      font-weight: 500;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__percent {
      padding-left: 12px;
      color: var(--color-text-accent);
      font-weight: 500;
    }
  }

  @media (width <= 768px) {
    .ui-file-item-loading {
      gap: 16px;
      grid-auto-flow: row;
      grid-template-columns: minmax(0, 1fr);
      justify-items: center;

      &__info-wrapper {
        width: 100%;
      }
    }
  }
</style>
