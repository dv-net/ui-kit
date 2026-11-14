<script setup lang="ts">
  import { ref } from "vue";

  import { tariffs } from "./tariffs";

  const selected = ref(tariffs[0].id);
</script>

<template>
  <div class="tariffs">
    <button
      v-for="tariff in tariffs"
      :key="tariff.id"
      type="button"
      class="card"
      :class="{ 'is-checked': selected === tariff.id }"
      @click="selected = tariff.id"
    >
      <div class="card__head">
        <span class="card__radio" aria-hidden="true" />
        <span class="card__title">{{ tariff.title }}</span>
        <span class="card__subtitle">{{ tariff.subtitle }}</span>
      </div>
      <div class="card__body">
        <span class="card__price">{{ tariff.price }}</span>
        <span class="card__unit">{{ tariff.unit }}</span>
        <span class="card__note">{{ tariff.note }}</span>
      </div>
    </button>
  </div>
</template>

<style scoped lang="scss">
  .tariffs {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .card {
    position: relative;
    display: flex;
    overflow: hidden;
    width: 280px;
    flex-direction: column;
    padding: 20px;
    border: 0;
    border-radius: 12px;
    background: var(--color-white);
    box-shadow: 0 0 0 1px #ebebec;
    color: inherit;
    cursor: pointer;
    font: inherit;
    isolation: isolate;
    text-align: left;
    transition: box-shadow 0.2s;

    > * {
      position: relative;
      z-index: 2;
    }

    &::after {
      position: absolute;
      z-index: 1;
      top: -20%;
      left: 0;
      width: 45%;
      height: 140%;
      background: linear-gradient(
        115deg,
        rgb(255 255 255 / 0%) 0%,
        rgb(192 198 207 / 18%) 35%,
        rgb(236 239 243 / 55%) 50%,
        rgb(192 198 207 / 18%) 65%,
        rgb(255 255 255 / 0%) 100%
      );
      content: "";
      pointer-events: none;
      transform: translateX(-140%) skewX(-18deg);
    }

    &:hover::after {
      animation: tariff-card-shine 1.2s ease-out;
    }

    @media (prefers-reduced-motion: reduce) {
      &:hover::after {
        animation: none;
      }
    }

    &.is-checked {
      box-shadow: 0 0 0 1px #5f8df5;
    }

    &__head {
      display: flex;
      align-items: center;
      padding-bottom: 14px;
      border-bottom: 1px solid #ebebec;
      gap: 10px;
    }

    &__radio {
      display: inline-flex;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: #f6f7f9;
      box-shadow:
        inset 0 4px 12px #e1e5ea,
        inset 0 2px 2px rgb(0 0 0 / 1%),
        inset 0 -1px 2px rgb(0 0 0 / 1%);
      transition:
        background-color 0.15s,
        box-shadow 0.15s;
    }

    &.is-checked &__radio {
      background: #5f8df5;
      box-shadow: none;

      &::after {
        width: 5px;
        height: 9px;
        border-right: 2px solid #fff;
        border-bottom: 2px solid #fff;
        content: "";
        rotate: 45deg;
        translate: 0 -1px;
      }
    }

    &__title {
      color: var(--color-text-primary);
      font-size: 24px;
      font-weight: 700;
    }

    &__subtitle {
      margin-left: auto;
      color: #87898f;
      font-size: 14px;
      font-weight: 500;
    }

    &__body {
      display: flex;
      align-items: baseline;
      padding-top: 16px;
      gap: 4px;
    }

    &__price {
      color: var(--color-text-primary);
      font-size: 32px;
      font-weight: 700;
      line-height: 1;
    }

    &__unit,
    &__note {
      color: var(--color-text-secondary);
      font-size: 14px;
    }

    &__note {
      margin-left: auto;
    }
  }

  @keyframes tariff-card-shine {
    from {
      transform: translateX(-140%) skewX(-18deg);
    }

    to {
      transform: translateX(280%) skewX(-18deg);
    }
  }
</style>
