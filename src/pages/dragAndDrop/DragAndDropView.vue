<script setup lang="ts">
  import { ref } from "vue";

  import { UiButton, UiDragAndDrop, UiGallery } from "@/lib";
  import { FileToUpload } from "@/lib/components/UiDragAndDrop/types.ts";

  const filesMultiple = ref<FileToUpload[]>([]);
  const loading = ref(false);
  const fileSingle = ref<FileToUpload[]>([]);
  const isShowGallery = ref<boolean>(false);
  const images = ref<FileToUpload[]>([]);

  let timer: ReturnType<typeof setTimeout>;

  function launchFakeLoad() {
    filesMultiple.value.forEach((file) => {
      file.status = "default";
      file.percent = 0;
    });
    fakeLoad();
  }

  function fakeLoad(counter = 0) {
    loading.value = true;

    filesMultiple.value = filesMultiple.value.map((file) => {
      if (file.status === "default") {
        return {
          ...file,
          percent: counter * 10
        };
      }
      return file;
    });
    timer = setTimeout(() => {
      if (counter < 10) {
        fakeLoad(++counter);
      } else {
        loading.value = false;
        filesMultiple.value = filesMultiple.value.filter((file) => file.status !== "default");
      }
    }, 300);
  }

  function onCancel(id: string) {
    filesMultiple.value.forEach((file) => {
      if (file.id === id) {
        file.status = "canceled";
      }
    });
    if (
      filesMultiple.value.every((file) => {
        return file.status !== "default";
      })
    ) {
      clearInterval(timer);
      loading.value = false;
    }
  }
</script>

<template>
  <div class="page">
    <h1 class="global-title">Drag & Drop</h1>

    <div class="grid">
      <div class="grid__header">Multiple selection</div>
      <div class="drag-and-drop-view__margin-bottom">
        <UiDragAndDrop
          class="drag-and-drop-view__margin-bottom-sm"
          v-model="filesMultiple"
          :multiple="true"
          :loading="loading"
          @cancel="onCancel"
          :extensions="['txt']"
        />
        <UiButton type="primary" mode="accent" @click="launchFakeLoad" :disabled="!filesMultiple.length && !loading">
          Upload (mock)
        </UiButton>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Single file only</div>
      <UiDragAndDrop v-model="fileSingle" :multiple="false" />
    </div>

    <div class="grid">
      <div class="grid__header">Gallery preview</div>
      <UiDragAndDrop v-model="images" :multiple="true" />
      <UiButton type="primary" @click="isShowGallery = true" :disabled="!images.length"> Show photos</UiButton>
      <UiGallery v-if="images.length" v-model="isShowGallery" :images="images" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .grid {
      display: grid;
      align-items: center;
      gap: 12px;
      grid-template-columns: 1fr;

      &__header {
        width: max-content;
        border-bottom: 1px solid;
        margin-bottom: 8px;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }

  .drag-and-drop-view__margin-bottom {
    margin-bottom: 16px;
  }

  .drag-and-drop-view__margin-bottom-sm {
    margin-bottom: 16px;
  }

  .drag-and-drop-view__select {
    color: var(--color-text-accent);
    cursor: pointer;
  }
</style>
