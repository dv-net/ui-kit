<script setup lang="ts">
  import UiIcon from "@/lib/components/UiIcon/UiIcon.vue";
  import UiGallery from "@/lib/components/UiGallery/UiGallery.vue";
  import { ref, computed } from "vue";
  import { ATTACH_MAX_FILES, ATTACH_ACCEPT } from "@/utils/constants/chat";

  const { 
    maxFiles = ATTACH_MAX_FILES,
    accept = ATTACH_ACCEPT,
  } = defineProps<{
    maxFiles?: number;
    accept?: string;
  }>();

  const emit = defineEmits<{
    (e: "change", files: File[]): void;
  }>();

  const fileInput = ref<HTMLInputElement>();
  const attachedFiles = ref<File[]>([]);
  const previewUrls = ref<Map<File, string>>(new Map());

  const openFileDialog = () => {
    if (attachedFiles.value.length >= maxFiles) return;
    fileInput.value?.click();
  };

  const onFilesSelected = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const remaining = maxFiles - attachedFiles.value.length;
    const newFiles = Array.from(input.files).slice(0, remaining);

    attachedFiles.value.push(...newFiles);
    emit("change", attachedFiles.value);

    input.value = "";
  };

  const removeFile = (index: number) => {
    const url = previewUrls.value.get(attachedFiles.value[index]);
    if (url) {
      window.URL.revokeObjectURL(url);
      previewUrls.value.delete(attachedFiles.value[index]);
    }
    attachedFiles.value.splice(index, 1);
    emit("change", attachedFiles.value);
  };

  const getPreviewUrl = (file: File) => {
    if (!previewUrls.value.has(file)) {
      previewUrls.value.set(file, window.URL.createObjectURL(file));
    }
    return previewUrls.value.get(file)!;
  };

  const galleryVisible = ref(false);
  const galleryInitialIndex = ref(0);

  const galleryImages = computed(() =>
    attachedFiles.value.map((file) => ({ file }))
  );

  const openGallery = (index: number) => {
    galleryInitialIndex.value = index;
    galleryVisible.value = true;
  };

  defineExpose({ openFileDialog });
</script>

<template>
  <div class="ui-chat-attachments">
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      :multiple="maxFiles > 1"
      hidden
      @change="onFilesSelected"
    />

    <div v-for="(file, index) in attachedFiles" :key="index" class="ui-chat-attachments__item">
      <div class="ui-chat-attachments__file">
        <img :src="getPreviewUrl(file)" :alt="file.name" />
        <div class="ui-chat-attachments__overlay">
          <button class="ui-chat-attachments__btn ui-chat-attachments__btn--show" @click="openGallery(index)">
            <UiIcon name="visibility" type="400" />
          </button>
          <button class="ui-chat-attachments__btn ui-chat-attachments__btn--remove" @click="removeFile(index)">
            <UiIcon name="close" type="400" />
          </button>
        </div>
      </div>
      <span class="ui-chat-attachments__description">{{ file.name }}</span>
    </div>
    <UiGallery
      v-model="galleryVisible"
      :images="galleryImages"
      :initial-index="galleryInitialIndex"
    />
  </div>
</template>

<style lang="scss">
  .ui-chat-attachments {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
    gap: 16px;
    &__item {
      width: 125px;
      display: block;
      background: var(--color-background-secondary);
      padding: 8px;
      border-radius: 12px;
    }
    &__file {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      aspect-ratio: 1 / 1;
      position: relative;
      border-radius: inherit;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        object-fit: cover;
      }
    }
    &__overlay {
      display: flex;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: inherit;
      overflow: hidden;
      z-index: 2;
      opacity: 1;
      @media (hover: hover) {
        opacity: 0;
      }
    }
    &__item:hover &__overlay {
      opacity: 1;
    }
    &__btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      border-radius: 0;
      border: none;
      padding: 0;
      height: 26px;
      cursor: pointer;
      color: #fff;
      text-decoration: none;
      transition: filter 0.15s;
      &:hover {
        filter: brightness(0.88);
      }
      &:active {
        filter: brightness(0.8);
      }
      &--show {
        background: var(--color-text-positive, #22c55e);
      }
      &--remove {
        background: var(--color-text-negative, #ef4444);
      }
      .ui-icon {
        width: 16px;
        height: 16px;
      }
    }
    &__description {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-top: 6px;
      font-size: 12px;
      line-height: 1;
      white-space: normal;
      text-align: center;
    }
  }
</style>
