<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref } from "vue";

  import { UiGalleryProps } from "./types.ts";

  import { UiIconButton, UiModal } from "@/lib";

  const { images } = defineProps<UiGalleryProps<unknown>>();

  const modelValue = defineModel<boolean>("modelValue", { required: true });

  const galleryImagesIndex = ref(0);

  const galleryImageUrl = computed(
    () =>
      images[galleryImagesIndex.value]?.url ||
      (images[galleryImagesIndex.value]?.file && URL.createObjectURL(images[galleryImagesIndex.value].file!))
  );

  const goSlidePreview = (direction: "-" | "+") => {
    if (direction === "-") {
      if (galleryImagesIndex.value === 0) galleryImagesIndex.value = images.length - 1;
      else galleryImagesIndex.value--;
    } else {
      if (galleryImagesIndex.value === images.length - 1) galleryImagesIndex.value = 0;
      else galleryImagesIndex.value++;
    }
  };

  const eventListenerHandler = (e: KeyboardEvent) => {
    if (!modelValue.value) return;
    if (e.key === "ArrowLeft") goSlidePreview("-");
    if (e.key === "ArrowRight") goSlidePreview("+");
    if (e.key === "Escape") modelValue.value = false;
  };

  onMounted(() => {
    if (images.length > 1) document.addEventListener("keydown", eventListenerHandler);
  });

  onUnmounted(() => {
    if (images.length > 1) document.removeEventListener("keydown", eventListenerHandler);
  });
</script>

<template>
  <UiModal v-if="images.length && galleryImageUrl" v-model="modelValue" popperClass="ui-gallery">
    <div class="image-container">
      <Transition name="image-slide" mode="out-in">
        <img :key="galleryImagesIndex" :src="galleryImageUrl" alt="Preview Image" />
      </Transition>
    </div>

    <template v-if="images.length > 1">
      <UiIconButton
        icon-name="keyboard-arrow-up"
        icon-type="400"
        class="ui-gallery__img-preview-btn left"
        type="contrast"
        @click="goSlidePreview('-')"
      />
      <UiIconButton
        icon-name="keyboard-arrow-up"
        icon-type="400"
        class="ui-gallery__img-preview-btn right"
        type="contrast"
        @click="goSlidePreview('+')"
      />
    </template>
  </UiModal>
</template>

<style lang="scss">
  .ui-gallery {
    .ui-modal__content {
      display: flex;
      width: 60vw;
      height: 50vh;
      align-items: center;
      justify-content: center;
    }

    .image-container {
      position: relative;
      display: flex;
      overflow: hidden;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;

      img {
        display: block;
        max-width: 100%;
        max-height: 100%;
        border: 1px solid #e0e0e0;
        margin: auto;
        object-fit: contain;
      }
    }

    &__img-preview-btn {
      position: fixed;
      z-index: 10000;
      top: 50%;

      &.left {
        left: 20px;
        rotate: 270deg;
      }

      &.right {
        right: 20px;
        rotate: 90deg;
      }
    }

    .image-slide-enter-active,
    .image-slide-leave-active {
      position: absolute;
      transition: all 0.2s cubic-bezier(0.42, 0, 0.58, 1);
    }

    .image-slide-enter-from {
      opacity: 0;
      transform: translateX(40px);
    }

    .image-slide-enter-to {
      opacity: 1;
      transform: translateX(0);
    }

    .image-slide-leave-from {
      opacity: 1;
      transform: translateX(0);
    }

    .image-slide-leave-to {
      opacity: 0;
      transform: translateX(-40px);
    }
  }
</style>
