<script setup lang="ts">
  import UiGallery from "@/lib/components/UiGallery/UiGallery.vue";
  import { computed, ref } from "vue";
  import type { UiChatMessageAttachment } from "./types";

  const props = defineProps<{
    attachments: UiChatMessageAttachment[];
  }>();

  const galleryVisible = ref(false);

  const imageAttachments = computed(() =>
    props.attachments.filter((a) => a.type.startsWith("image/"))
  );

  const moreCount = computed(() =>
    imageAttachments.value.length > 1 ? imageAttachments.value.length : undefined
  );

  const galleryImages = computed(() =>
    imageAttachments.value.map((a) => ({ url: a.url }))
  );

  const openGallery = () => {
    if (!imageAttachments.value.length) return;
    galleryVisible.value = true;
  };
</script>

<template>
  <div v-if="imageAttachments.length" class="ui-chat-msg-attachments">
    <button class="ui-chat-msg-attachments__group" @click="openGallery">
      <img class="ui-chat-msg-attachments__bg" :src="imageAttachments[0].url" alt="" />
      <div class="ui-chat-msg-attachments__wrap" :data-count="moreCount">
        <img class="ui-chat-msg-attachments__img" :src="imageAttachments[0].url" alt="" />
      </div>
    </button>

    <UiGallery
      v-model="galleryVisible"
      :images="galleryImages"
      :initial-index="0"
    />
  </div>
</template>

<style lang="scss">
  .ui-chat-msg-attachments {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    max-width: 100%;
    width: 100%;
    &__group {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 1;
      flex-grow: 1;
      height: 64px;
      min-width: 64px;
      max-width: 100%;
      padding: 0;
      border: none;
      border-radius: 6px;
      background: #000;
      color: #fff;
      font-size: 20px;
      font-weight: 400;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      isolation: isolate;
    }
    &__bg {
      flex-shrink: 1;
      width: 100%;
      position: absolute;
      inset: 0;
      z-index: -2;
      height: 100%;
      object-fit: cover;
      opacity: 0.75;
      filter: blur(1px);
    }
    &__wrap {
      display: grid;
      align-items: center;
      grid-template-rows: minmax(0, 1fr);
      grid-template-columns: minmax(0, 1fr);
      position: relative;
      height: 100%;
      white-space: nowrap;
      z-index: -1;
      &[data-count]::before {
        content: "+" attr(data-count);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        grid-area: 1 / 1;
        background: rgba(0, 0, 0, 0.7);
        z-index: 3;
      }
    }
    &__img {
      flex-shrink: 1;
      grid-area: 1 / 1;
      aspect-ratio: 1 / 1;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      z-index: 2;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
