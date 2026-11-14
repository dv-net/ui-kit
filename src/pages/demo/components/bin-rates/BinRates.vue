<script setup lang="ts">
  import IconLike from "./IconLike.vue";

  import { onUnmounted, ref } from "vue";

  type Rate = "like" | "dislike";

  const likes = ref(128);
  const dislikes = ref(6);
  const selected = ref<Rate | null>(null);
  const animate = ref<Rate | null>(null);

  let timer: ReturnType<typeof setTimeout> | undefined;

  const rate = (type: Rate) => {
    const current = selected.value;
    const turningOn = current !== type;

    if (current === "like") likes.value = Math.max(0, likes.value - 1);
    if (current === "dislike") dislikes.value = Math.max(0, dislikes.value - 1);

    clearTimeout(timer);
    animate.value = null;

    if (!turningOn) {
      selected.value = null;
      return;
    }

    selected.value = type;

    if (type === "like") likes.value += 1;
    else dislikes.value += 1;

    animate.value = type;
    timer = setTimeout(() => {
      if (animate.value === type) animate.value = null;
    }, 1000);
  };

  onUnmounted(() => clearTimeout(timer));
</script>

<template>
  <div class="rates">
    <button
      type="button"
      class="rates__button rates__button--like"
      :class="{ 'is-selected': selected === 'like', 'is-animate': animate === 'like' }"
      @click="rate('like')"
    >
      <span class="rates__hover" aria-hidden="true" />
      <IconLike class="rates__icon" />
      <span>{{ likes }}</span>
    </button>

    <span class="rates__split" aria-hidden="true" />

    <button
      type="button"
      class="rates__button rates__button--dislike"
      :class="{ 'is-selected': selected === 'dislike', 'is-animate': animate === 'dislike' }"
      @click="rate('dislike')"
    >
      <span class="rates__hover" aria-hidden="true" />
      <IconLike class="rates__icon" />
      <span>{{ dislikes }}</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
  .rates {
    display: flex;
    width: max-content;
    align-items: center;
    isolation: isolate;

    &__button {
      position: relative;
      display: flex;
      min-height: 32px;
      align-items: center;
      padding: 6px 8px;
      border: 0;
      border-radius: 24px;
      background: transparent;
      color: var(--color-icon-tertiary);
      cursor: pointer;
      font-size: 14px;
      gap: 6px;

      &--like {
        --accent: var(--color-icon-positive);
      }

      &--dislike {
        --accent: #df1b1b;

        .rates__icon {
          scale: -1 -1;
          translate: 0 10%;
        }
      }

      &.is-selected .rates__icon {
        color: var(--accent);
      }

      &.is-selected.is-animate .rates__icon {
        animation: blow 1s ease 1 forwards;
      }

      @media (hover: hover) {
        &:hover .rates__hover::after {
          opacity: 0;
          scale: 1 1;
          transition:
            scale 0.5s ease,
            opacity 0.5s ease 0.25s;
          visibility: visible;
        }
      }

      &:active .rates__hover::before {
        opacity: 0;
        scale: 1 1;
        transition:
          scale 0.5s ease,
          opacity 0.5s ease 0.25s;
        visibility: visible;
      }
    }

    &__icon {
      position: relative;
      z-index: 1;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      color: var(--color-icon-tertiary);
      transition: color 0.25s ease;
    }

    &__hover {
      position: absolute;
      border-radius: inherit;
      inset: 0;
      pointer-events: none;

      &::before,
      &::after {
        position: absolute;
        width: 100%;
        border-radius: 50%;
        aspect-ratio: 1;
        background: var(--accent);
        content: "";
        inset-block-start: 50%;
        inset-inline-start: 50%;
        opacity: 0.065;
        scale: 0 0;
        translate: -50% -50%;
        visibility: hidden;
      }

      &::before {
        opacity: 0.1;
      }
    }

    &__split {
      width: 1px;
      height: 16px;
      flex-shrink: 0;
      background: var(--color-separator-border-primary);
    }
  }

  @keyframes blow {
    from {
      filter: drop-shadow(0 0 0 hsl(from var(--accent) h s l / 50%));
    }

    to {
      filter: drop-shadow(0 -4ex 2px hsl(from var(--accent) h s l / 0%));
    }
  }
</style>
