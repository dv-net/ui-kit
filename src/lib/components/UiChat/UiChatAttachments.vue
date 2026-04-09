<script setup lang="ts">
  import UiGallery from "@/lib/components/UiGallery/UiGallery.vue";
  import UiIcon from "@/lib/components/UiIcon/UiIcon.vue";

  import { computed,ref } from "vue";

  import { ATTACH_ACCEPT,ATTACH_MAX_FILES } from "@/utils/constants/chat";

  const {
    maxFiles = ATTACH_MAX_FILES,
    accept = ATTACH_ACCEPT,
    sendingLoading = false
  } = defineProps<{
    maxFiles?: number;
    accept?: string;
    sendingLoading?: boolean;
  }>();

  const emit = defineEmits<{
    (e: "change", files: File[]): void;
  }>();

  const fileInput = ref<HTMLInputElement>();
  const attachedFiles = ref<File[]>([]);
  const previewUrls = ref<Map<File, string>>(new Map());

  const openFileDialog = () => {
    if (attachedFiles.value.length >= maxFiles || sendingLoading) return;
    fileInput.value?.click();
  };

  const appendFiles = (newFiles: File[]) => {
    if (!newFiles.length || sendingLoading) return;
    const remaining = maxFiles - attachedFiles.value.length;
    if (remaining <= 0) return;
    attachedFiles.value.push(...newFiles.slice(0, remaining));
    emit("change", attachedFiles.value);
  };

  const onFilesSelected = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    appendFiles(Array.from(input.files));

    input.value = "";
  };

  const addFiles = (newFiles: File[]) => {
    appendFiles(newFiles.filter((file) => file.type.startsWith("image/")));
  };

  const removeFile = (index: number) => {
    if (sendingLoading) return;
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

  const galleryImages = computed(() => attachedFiles.value.map((file) => ({ file })));

  const openGallery = (index: number) => {
    galleryInitialIndex.value = index;
    galleryVisible.value = true;
  };

  const clearFiles = () => {
    previewUrls.value.forEach((url) => window.URL.revokeObjectURL(url));
    previewUrls.value.clear();
    attachedFiles.value = [];
    emit("change", []);
  };

  defineExpose({ openFileDialog, clearFiles, addFiles });
</script>

<template>
  <div class="ui-chat-attachments">
    <input ref="fileInput" type="file" :accept="accept" :multiple="maxFiles > 1" hidden @change="onFilesSelected" />

    <div v-for="(file, index) in attachedFiles" :key="index" class="ui-chat-attachments__item">
      <div class="ui-chat-attachments__file">
        <img :src="getPreviewUrl(file)" :alt="file.name" />
        <div class="ui-chat-attachments__overlay">
          <button class="ui-chat-attachments__btn ui-chat-attachments__btn--show" @click="openGallery(index)">
            <UiIcon name="visibility" type="400" />
          </button>
          <button
            class="ui-chat-attachments__btn ui-chat-attachments__btn--remove"
            :disabled="sendingLoading"
            @click="removeFile(index)"
          >
            <UiIcon name="close" type="400" />
          </button>
        </div>
      </div>
      <span class="ui-chat-attachments__description">{{ file.name }}</span>
    </div>
    <UiGallery v-model="galleryVisible" :images="galleryImages" :initial-index="galleryInitialIndex" />
  </div>
</template>

<style lang="scss">
  .ui-chat-attachments {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    align-items: stretch;
    gap: 16px;

    &__item {
      display: block;
      width: 125px;
      padding: 8px;
      border-radius: 12px;
      background: var(--color-background-secondary);
    }

    &__file {
      position: relative;
      display: flex;
      overflow: hidden;
      width: 100%;
      align-items: center;
      justify-content: center;
      border-radius: inherit;
      aspect-ratio: 1 / 1;

      img {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        object-fit: cover;
      }
    }

    &__overlay {
      position: absolute;
      z-index: 2;
      bottom: 0;
      left: 0;
      display: flex;
      overflow: hidden;
      width: 100%;
      border-radius: inherit;
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
      height: 26px;
      flex-direction: column;
      flex-grow: 1;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      border-radius: 0;
      color: #fff;
      cursor: pointer;
      text-decoration: none;
      transition: filter 0.15s;

      &:hover {
        filter: brightness(0.88);
      }

      &:active {
        filter: brightness(0.8);
      }

      &:disabled {
        cursor: not-allowed;
        filter: none;
        opacity: 0.5;
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
      overflow: hidden;
      margin-top: 6px;
      -webkit-box-orient: vertical;
      font-size: 12px;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      line-height: 1;
      text-align: center;
      white-space: normal;
    }
  }
</style>
