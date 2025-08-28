<script setup lang="ts">
  import FileIcon from "@/lib/components/UiDragAndDrop/icons/FileIcon.vue";

  import { UiIconButton } from "@/lib";
  import type { FileToUpload } from "@/lib/components/UiDragAndDrop/types.ts";

  defineProps<{
    file: FileToUpload;
  }>();

  defineEmits<{
    (e: "remove", id: string): void;
  }>();
</script>

<template>
  <div class="ui-file-item">
    <div class="ui-file-item__file-wrapper">
      <FileIcon class="ui-file-item__file-icon" />
      <p class="ui-file-item__file-name">{{ file.file.name }}</p>
    </div>
    <UiIconButton
      class="ui-file-item__close-icon"
      iconName="close"
      type="clear"
      size="md"
      mode="circle"
      @click="$emit('remove', file.id)"
    />
  </div>
</template>

<style scoped lang="scss">
  .ui-file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    border-radius: 8px;
    background: var(--color-background-secondary);

    &__close-icon {
      color: var(--color-text-secondary);
    }

    &__file-name {
      overflow: hidden;
      margin-left: 8px;
      font-weight: 500;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__file-wrapper {
      display: inline-flex;
      min-width: 0;
      align-items: center;
    }

    &__file-icon {
      flex-shrink: 0;
    }
  }
</style>
