<script setup lang="ts">
  import UiSwitch from "@/lib/components/UiSwitch/UiSwitch.vue";

  import { ref } from "vue";

  import { UiIconButton } from "@/lib";

  const isLoading = ref(false);
  const isDisabled = ref(false);
  const isCircleMode = ref(false);
  const noSize = ref(false);
</script>

<template>
  <div class="page">
    <h1 class="global-title">Icon buttons</h1>
    <div class="grid">
      <div class="grid__header">Controls</div>
      <div class="flex-row">
        <div class="flex-row">
          <h3>Loading</h3>
          <ui-switch v-model="isLoading" />
        </div>
        <div class="flex-row">
          <h3>Disabled</h3>
          <ui-switch v-model="isDisabled" />
        </div>
        <div class="flex-row">
          <h3>Mode</h3>
          <ui-switch v-model="isCircleMode" />
        </div>
        <div class="flex-row">
          <h3>noSize</h3>
          <ui-switch v-model="noSize" />
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Sizes</div>
      <div class="sizes-grid">
        <div class="sizes-grid__header">Size</div>
        <div class="sizes-grid__header">accent</div>
        <div class="sizes-grid__header">contrast</div>
        <div class="sizes-grid__header">tint</div>
        <div class="sizes-grid__header">positive</div>
        <div class="sizes-grid__header">positive-tint</div>
        <div class="sizes-grid__header">negative</div>
        <div class="sizes-grid__header">negative-tint</div>
        <div class="sizes-grid__header">clear</div>

        <div class="sizes-grid__row">20px(xs)</div>
        <UiIconButton type="accent" size="xs" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="contrast" size="xs" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="tint" size="xs" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="positive" size="xs" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="positive-tint" size="xs" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="negative" size="xs" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="negative-tint" size="xs" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="clear" size="xs" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />

        <div class="sizes-grid__row">24px(sm)</div>
        <UiIconButton type="accent" size="sm" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="contrast" size="sm" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="tint" size="sm" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="positive" size="sm" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="positive-tint" size="sm" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="negative" size="sm" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="negative-tint" size="sm" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="clear" size="sm" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />

        <div class="sizes-grid__row">32px(md)</div>
        <UiIconButton type="accent" size="md" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="contrast" size="md" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="tint" size="md" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="positive" size="md" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="positive-tint" size="md" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="negative" size="md" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="negative-tint" size="md" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="clear" size="md" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />

        <div class="sizes-grid__row">40px(lg)</div>
        <UiIconButton type="accent" size="lg" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="contrast" size="lg" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="tint" size="lg" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="positive" size="lg" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="positive-tint" size="lg" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="negative" size="lg" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="negative-tint" size="lg" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="clear" size="lg" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />

        <div class="sizes-grid__row">48px(xl)</div>
        <UiIconButton type="accent" size="xl" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="contrast" size="xl" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="tint" size="xl" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="positive" size="xl" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="positive-tint" size="xl" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="negative" size="xl" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="negative-tint" size="xl" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
        <UiIconButton type="clear" size="xl" :loading="isLoading" :disabled="isDisabled" :no-size="noSize" icon-name="home" :mode="isCircleMode ? 'circle' : 'square'" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .grid {
      display: grid;
      align-items: center;
      gap: 12px;
      grid-template-columns: 1fr;

      &__header {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }

  .flex-row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }

  .sizes-grid {
    display: grid;
    align-items: center;
    gap: 12px;
    grid-template-columns: repeat(9, auto);

    &__header {
      font-weight: bold;
    }

    &__row {
      font-weight: bold;
    }
  }
</style>

