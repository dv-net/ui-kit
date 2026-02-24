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
    gap: 12px;
    flex-wrap: wrap;

    &__item {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
      border-radius: 8px;
      overflow: hidden;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }

    &__img {
      display: block;
      width: 200px;
      height: 200px;
      object-fit: cover;
      border-radius: 8px;
    }
  }
</style>
