<script setup lang="ts">
  import UiFileItem from "@/lib/components/UiDragAndDrop/UiFileItem.vue";
  import UiFileItemLoading from "@/lib/components/UiDragAndDrop/UiFileItemLoading.vue";

  import { useDropZone, useFileDialog } from "@vueuse/core";
  import { uuidv4 } from "uuidv7";
  import { computed, ref } from "vue";

  import type { FileToUpload, UiDragAndDropProps } from "./types";

  import { config, UiIcon, UiLink } from "@/lib";

  const modelValue = defineModel<FileToUpload[]>({ default: [] });

  const props = withDefaults(defineProps<UiDragAndDropProps>(), {
    extensions: () => [],
    multiple: true
  });

  defineEmits<{
    (e: "cancel", id: string): void;
  }>();

  const dropAreaRef = ref();
  const accept = computed(() => (props.extensions.length ? props.extensions.map((ext) => `.${ext}`).join(", ") : "*"));
  const loadingFiles = computed(() => {
    if (!modelValue.value) {
      return [];
    }
    return modelValue.value?.filter((fileToUpload) => {
      return fileToUpload.status === "default";
    });
  });

  const isShowDefaultBlock = computed(() => !modelValue.value?.length);
  const isShowFileListBlock = computed(() => modelValue.value?.length && !props.loading);
  const isShowUploadingFileListBlock = computed(() => loadingFiles.value.length && props.loading);

  const { open, onChange, reset } = useFileDialog({
    accept: accept.value,
    directory: false,
    multiple: props.multiple
  });

  const { isOverDropZone } = useDropZone(dropAreaRef, {
    onDrop,
    multiple: props.multiple
  });

  function onDrop(files: File[] | null) {
    modelValue.value = convertFileList(files);
  }

  function onOpen() {
    reset();
    open();
  }

  onChange((files) => {
    modelValue.value = convertFileList(files);
  });

  function convertFileList(fileList: File[] | FileList | null): FileToUpload[] {
    if (!fileList) {
      return [];
    }

    let fileArray = filterFiles([...fileList]);

    if (!fileArray.length) {
      return [];
    }

    const createFileToUpload = (file: File): FileToUpload => ({
      id: uuidv4(),
      file,
      percent: 0,
      status: "default"
    });

    return fileArray.map(createFileToUpload);
  }

  function filterFiles(filesArray: File[]) {
    if (!props.extensions.length) {
      return filesArray;
    }

    const regexpText = `${props.extensions.map((e) => `\\.${e}$`).join("|")}`;
    const regexp = new RegExp(regexpText, "i");
    return filesArray.filter((file) => regexp.test(file.name));
  }

  function removeFile(id: string) {
    modelValue.value = modelValue.value?.filter((file) => file.id !== id);
  }
</script>

<template>
  <div ref="dropAreaRef" class="ui-drag-and-drop" :class="[{ 'drag-over': isOverDropZone }]">
    <div v-if="isShowDefaultBlock" class="ui-drag-and-drop__slot-wrapper">
      <div class="ui-drag-and-drop__default-block">
        <UiIcon size="md" name="attach-file-add" type="400" class="ui-drag-and-drop__clip-icon" />
        <span class="ui-drag-and-drop__default-text">{{ config.uiDragAndDrop.translations.dragOr }}</span>
        <UiLink class="ui-drag-and-drop__accent-text" @click.prevent.stop="onOpen">
          {{ config.uiDragAndDrop.translations.selectHere }}
        </UiLink>
      </div>
    </div>
    <div v-if="isShowFileListBlock" class="ui-drag-and-drop__files-list">
      <UiFileItem
        class="ui-drag-and-drop__files-list-item"
        v-for="file in modelValue"
        :key="file.id"
        :file="file"
        @remove="removeFile(file.id)"
      />
    </div>
    <div v-if="isShowUploadingFileListBlock" class="ui-drag-and-drop__files-list">
      <UiFileItemLoading
        class="ui-drag-and-drop__files-list-item"
        v-for="file in loadingFiles"
        :key="file.id"
        :file="file"
        @cancel="$emit('cancel', $event)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .ui-drag-and-drop {
    width: 100%;
    height: 198px;
    border: 1px dashed var(--color-separator-border-secondary);
    border-radius: 8px;
    background-color: white;
    transition: var(--transition);

    &__default-block {
      display: inline-flex;
      overflow: hidden;
      min-width: 0;
      align-items: center;
      color: var(--color-text-secondary);
      font-size: 14px;
      font-weight: 500;
      gap: 4px;
      line-height: 20px;
      user-select: none;
    }

    &__default-text {
      white-space: nowrap;
    }

    &__accent-text {
      overflow: hidden;
      color: var(--color-text-accent);
      text-decoration: underline;
      text-overflow: ellipsis;
      text-underline-offset: 4px;
      white-space: nowrap;
    }

    &.drag-over {
      background-color: var(--color-background-secondary);
    }

    &__file-input {
      display: none;
    }

    &__slot-wrapper {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }

    &__files-list {
      width: 100%;
      height: 100%;
      padding: 20px;
      overflow-y: auto;
    }

    &__files-list-item + &__files-list-item {
      margin-top: 8px;
    }
  }
</style>
