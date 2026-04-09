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
      <div class="ui-chat-msg-attachments__hover-effect" />
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
    width: 100%;
    max-width: 100%;
    flex-wrap: wrap;
    gap: 6px;

    &__group {
      position: relative;
      display: flex;
      overflow: hidden;
      min-width: 64px;
      max-width: 100%;
      height: 64px;
      flex-grow: 1;
      flex-shrink: 1;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      border-radius: 6px;
      background: #000;
      color: #fff;
      cursor: pointer;
      font-size: 20px;
      font-weight: 400;
      isolation: isolate;
    }

    &__bg {
      position: absolute;
      z-index: -2;
      width: 100%;
      height: 100%;
      flex-shrink: 1;
      filter: blur(1px);
      inset: 0;
      object-fit: cover;
      opacity: 0.75;
    }

    &__wrap {
      position: relative;
      z-index: -1;
      display: grid;
      height: 100%;
      align-items: center;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: minmax(0, 1fr);
      white-space: nowrap;

      &[data-count]::before {
        z-index: 3;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
        background: rgb(0 0 0 / 70%);
        content: "+" attr(data-count);
        grid-area: 1 / 1;
      }
    }

    &__img {
      position: relative;
      z-index: 2;
      height: 100%;
      flex-shrink: 1;
      margin-right: auto;
      margin-left: auto;
      aspect-ratio: 1 / 1;
      grid-area: 1 / 1;
      object-fit: cover;
    }

    &__hover-effect {
      position: absolute;
      z-index: 3;
      overflow: hidden;
      border-radius: inherit;
      inset: 0;
      isolation: isolate;
      pointer-events: none;

      &::after,
      &::before {
        position: absolute;
        z-index: -1;
        width: 100%;
        border-radius: 50%;
        aspect-ratio: 1/1;
        background: var(--color-white, #fff);
        content: '';
        inset-block-start: 50%;
        inset-inline-start: 50%;
        opacity: 0.15;
        scale: 0 0;
        translate: -50% -50%;
      }

      &::before {
        transition-duration: 0.25s, 0.25s;
      }
    }

    @media (hover: hover) and (pointer: fine) {
      &__group:hover {
        .ui-chat-msg-attachments__hover-effect {
          &::after {
            opacity: 0;
            scale: 1 1;
            transition:
              scale 0.5s ease,
              opacity 0.5s ease 0.25s;
          }
        }
      }
    }

    &__group:active,
    &__group:focus-visible {
      .ui-chat-msg-attachments__hover-effect {
        &::before {
          opacity: 0;
          scale: 1 1;
          transition:
            scale 0.5s ease,
            opacity 0.5s ease 0.25s;
        }

        &::after {
          display: none;
        }
      }
    }
  }
</style>
