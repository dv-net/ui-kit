<script setup lang="ts">
  import { ref } from "vue";

  import { UiGallery } from "@/lib";
  import type { UiGalleryImage } from "@/lib/components/UiGallery/types";

  const images: UiGalleryImage[] = [
    { url: "https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg" },
    { url: "https://avatarko.ru/img/kartinka/18/multfilm_kotenok_snezhinka_17593.jpg" }
  ];

  const isOpen = ref(false);
  const startIndex = ref(0);

  const openGallery = (index: number) => {
    startIndex.value = index;
    isOpen.value = true;
  };
</script>

<template>
  <div class="page">
    <h1 class="global-title">Gallery</h1>

    <div class="gallery-grid">
      <button
        v-for="(img, i) in images"
        :key="i"
        class="gallery-grid__item"
        @click="openGallery(i)"
      >
        <img :src="img.url" alt="" class="gallery-grid__img" />
      </button>
    </div>

    <UiGallery v-model="isOpen" :images="images" :initial-index="startIndex" />
  </div>
</template>

<style scoped lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .gallery-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    &__item {
      overflow: hidden;
      padding: 0;
      border: none;
      border-radius: 8px;
      background: none;
      cursor: pointer;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }

    &__img {
      display: block;
      width: 200px;
      height: 200px;
      border-radius: 8px;
      object-fit: cover;
    }
  }
</style>
