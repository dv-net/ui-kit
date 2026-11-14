<script setup lang="ts">
  import BinRates from "./components/bin-rates/BinRates.vue";
  import SearchGroup from "./components/search-group/SearchGroup.vue";
  import TariffCards from "./components/tariff-card/TariffCards.vue";
  import WalletStack from "./components/wallet-stack/WalletStack.vue";
</script>

<template>
  <div class="page">
    <h1 class="global-title">Demo</h1>

    <section class="demo">
      <div class="demo__heading">
        <h2>Search group</h2>
        <p>
          Click the mode button. The list springs out to the left, and the trigger icon slides when the mode changes.
        </p>
      </div>

      <div class="demo__stage">
        <SearchGroup />
      </div>
    </section>

    <section class="demo">
      <div class="demo__heading">
        <h2>Others</h2>
        <p>Hover a card in the stack. The cards in front spring aside and tilt.</p>
      </div>

      <WalletStack />
    </section>

    <section class="demo">
      <div class="demo__heading">
        <h2>Rates</h2>
        <p>
          Hover a thumb and a colored circle blooms. Click it and the icon takes that color while a shadow lifts off.
        </p>
      </div>

      <BinRates />
    </section>

    <section class="demo">
      <div class="demo__heading">
        <h2>Tariff card</h2>
        <p>Hover a card. A light streak sweeps across it once.</p>
      </div>

      <TariffCards />
    </section>
  </div>
</template>

<style scoped lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .demo {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__heading {
      display: flex;
      flex-direction: column;
      gap: 6px;

      h2 {
        color: var(--color-text-primary);
        font-size: 18px;
        font-weight: 500;
      }

      p {
        max-width: 640px;
        color: var(--color-text-secondary);
        font-size: 14px;
        line-height: 1.4;
      }
    }

    &__stage {
      max-width: 560px;
      padding: 14px;
      border: 1px solid #ecf0f5;
      border-radius: 16px;
      background: linear-gradient(180deg, #fff 0%, #f3f6fa 100%);
    }
  }
</style>
