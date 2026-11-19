<script setup lang="ts">
  import UiIcon from "@/lib/components/UiIcon/UiIcon.vue";

  import { onUnmounted, ref } from "vue";

  type Merchant = {
    id: string;
    name: string;
    icon: string;
    amount: string;
    delay: number;
  };

  const merchants: Merchant[] = [
    { id: "spotify", name: "Spotify", icon: "play-circle", amount: "−9.99", delay: 700 },
    { id: "cafe", name: "Cafe", icon: "cutlery", amount: "−4.50", delay: 1400 },
    { id: "card", name: "Card fee", icon: "credit-card", amount: "−1.20", delay: 2100 }
  ];

  const loaded = ref<Record<string, boolean>>({});

  let timers: ReturnType<typeof setTimeout>[] = [];

  const clearTimers = () => {
    timers.forEach(clearTimeout);
    timers = [];
  };

  const play = () => {
    clearTimers();
    loaded.value = {};

    timers = merchants.map((merchant) =>
      setTimeout(() => {
        loaded.value = { ...loaded.value, [merchant.id]: true };
      }, merchant.delay)
    );
  };

  play();

  onUnmounted(clearTimers);
</script>

<template>
  <div class="icons">
    <ul class="icons__list">
      <li v-for="merchant in merchants" :key="merchant.id" class="icons__row">
        <span class="icons__badge" aria-hidden="true">
          <Transition name="swap" mode="out-in">
            <span v-if="loaded[merchant.id]" :key="`${merchant.id}-icon`" class="icons__face">
              <UiIcon type="100" :name="merchant.icon" size="sm" />
            </span>

            <span v-else :key="`${merchant.id}-letter`" class="icons__face icons__face--letter">
              {{ merchant.name.charAt(0) }}
            </span>
          </Transition>
        </span>

        <span class="icons__name">{{ merchant.name }}</span>
        <span class="icons__amount">{{ merchant.amount }}</span>
      </li>
    </ul>

    <button type="button" class="icons__replay" @click="play">Replay</button>
  </div>
</template>

<style scoped lang="scss">
  .icons {
    display: flex;
    width: max-content;
    flex-direction: column;
    gap: 16px;

    &__list {
      display: flex;
      width: 280px;
      flex-direction: column;
      padding: 0;
      margin: 0;
      gap: 12px;
      list-style: none;
    }

    &__row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    &__badge {
      position: relative;
      display: grid;
      width: 32px;
      flex-shrink: 0;
      aspect-ratio: 1;
      perspective: 120px;
    }

    &__face {
      position: absolute;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: var(--color-background-tertiary);
      color: var(--color-icon-primary);
      inset: 0;

      &--letter {
        background: #6ea4ff;
        color: var(--color-white);
        font-size: 16px;
        font-weight: 500;
        line-height: 1;
        text-transform: uppercase;
      }
    }

    &__name {
      color: var(--color-text-primary);
      font-size: 14px;
      font-weight: 500;
    }

    &__amount {
      margin-inline-start: auto;
      color: var(--color-text-secondary);
      font-size: 14px;
      font-variant-numeric: tabular-nums;
    }

    &__replay {
      width: max-content;
      padding: 6px 12px;
      border: 1px solid var(--color-separator-border-primary);
      border-radius: 8px;
      background: var(--color-background-primary);
      color: var(--color-text-primary);
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background: var(--color-background-secondary);
      }
    }
  }

  .swap-enter-active,
  .swap-leave-active {
    transition: transform 0.25s ease-in;
  }

  .swap-leave-active {
    transition-delay: 0.15s;
  }

  .swap-enter-from,
  .swap-leave-to {
    transform: rotateY(90deg);
  }
</style>
