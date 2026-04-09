<script setup lang="ts">
  import UiIcon from "@/lib/components/UiIcon/UiIcon.vue";

  import { computed, onMounted, onUnmounted, ref, watch } from "vue";

  import { UiGalleryProps } from "./types";

  const { initialIndex = 0, images } = defineProps<UiGalleryProps>();

  const modelValue = defineModel<boolean>("modelValue", { required: true });

  const currentIndex = ref(initialIndex);
  const isInitialOpen = ref(true);

  const canPrev = computed(() => currentIndex.value > 0);
  const canNext = computed(() => currentIndex.value < images.length - 1);

  const currentImageUrl = computed(() => {
    const img = images[currentIndex.value];
    if (!img) return "";
    return img.url || (img.file ? URL.createObjectURL(img.file) : "");
  });

  const goSlide = (direction: "prev" | "next") => {
    isInitialOpen.value = false;
    if (direction === "prev" && canPrev.value) {
      currentIndex.value--;
    } else if (direction === "next" && canNext.value) {
      currentIndex.value++;
    }
  };

  const close = () => {
    modelValue.value = false;
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (!modelValue.value) return;
    if (e.key === "ArrowLeft") goSlide("prev");
    if (e.key === "ArrowRight") goSlide("next");
    if (e.key === "Escape") close();
  };

  watch(
    () => modelValue.value,
    (val) => {
      if (val) {
        currentIndex.value = initialIndex;
        isInitialOpen.value = true;
      }
    }
  );

  onMounted(() => document.addEventListener("keydown", onKeydown));
  onUnmounted(() => document.removeEventListener("keydown", onKeydown));
</script>

<template>
  <Teleport to="body">
    <Transition name="ui-gallery-fade">
      <div v-if="modelValue && images.length && currentImageUrl" class="ui-gallery" @click.self="close">
        <button
          class="ui-gallery__nav ui-gallery__nav--prev"
          :class="{ 'ui-gallery__nav--active': canPrev }"
          :disabled="!canPrev"
          @click="goSlide('prev')"
        >
          <UiIcon name="chevron-left 1" type="400" size="xxl" />
        </button>

        <div class="ui-gallery__slider">
          <button class="ui-gallery__close" @click="close">
            <UiIcon name="close" type="400" />
          </button>

          <div class="ui-gallery__slide">
            <Transition name="ui-gallery-crossfade" mode="out-in">
              <img :key="currentIndex" :src="currentImageUrl" alt="" class="ui-gallery__image" :class="{ 'ui-gallery__image--initial': isInitialOpen }" />
            </Transition>
          </div>
        </div>

        <button
          class="ui-gallery__nav ui-gallery__nav--next"
          :class="{ 'ui-gallery__nav--active': canNext }"
          :disabled="!canNext"
          @click="goSlide('next')"
        >
          <UiIcon name="chevron-right" type="400" size="xxl" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
  .ui-gallery {
    position: fixed;
    z-index: 10000;
    display: flex;
    align-items: stretch;
    background: rgb(0 0 0 / 70%);
    inset: 0;
    overscroll-behavior: contain;

    --gallery-padding: 22px;
    --gallery-inset: 80px;

    &__nav {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 var(--gallery-padding);
      border: none;
      background: none;
      color: #fff;
      cursor: pointer;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;

      &--active {
        opacity: 1;
        pointer-events: auto;
      }

      @media (hover: hover) {
        &:hover {
          background: rgb(255 255 255 / 2.5%);
        }
      }

      &:active {
        background: rgb(255 255 255 / 3.5%);
      }

      .ui-icon {
        width: 20px;
        height: 20px;
      }
    }

    &__slider {
      position: relative;
      display: flex;
      width: 100%;
      align-items: center;
      padding: var(--gallery-inset) 0;
      pointer-events: none;
    }

    &__close {
      position: absolute;
      z-index: 5;
      top: calc(var(--gallery-inset) / 2);
      right: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      border: none;
      border-radius: 50%;
      background: none;
      color: #fff;
      cursor: pointer;
      pointer-events: auto;
      transition: opacity 0.15s;
      translate: 50% -50%;

      .ui-icon {
        width: 32px;
        height: 32px;
      }

      &:hover {
        opacity: 0.75;
      }

      &:active {
        opacity: 0.65;
      }
    }

    &__slide {
      position: relative;
      display: flex;
      overflow: hidden;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }

    &__image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      pointer-events: auto;

      &--initial {
        animation: ui-gallery-show 0.5s ease forwards;
        opacity: 0;
        transform: perspective(1200px) rotate3d(10, 40, 0, 40deg);
      }
    }
  }

  @keyframes ui-gallery-show {
    to {
      opacity: 1;
      transform: none;
    }
  }

  .ui-gallery-fade-enter-active,
  .ui-gallery-fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .ui-gallery-fade-enter-from,
  .ui-gallery-fade-leave-to {
    opacity: 0;
  }

  .ui-gallery-crossfade-enter-active,
  .ui-gallery-crossfade-leave-active {
    transition: opacity 0.3s ease;
  }

  .ui-gallery-crossfade-enter-from,
  .ui-gallery-crossfade-leave-to {
    opacity: 0;
  }
</style>
