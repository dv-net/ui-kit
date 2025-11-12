<script setup lang="ts">
  import UiSwitch from "@/lib/components/UiSwitch/UiSwitch.vue";

  import { ref } from "vue";

  import { UiButton } from "@/lib";

  const isLoading = ref<boolean>(false);
  const isDisabled = ref<boolean>(false);
  const neutral = ref<boolean>(false);
</script>

<template>
  <div class="page">
    <h1 class="global-title">Buttons</h1>
    <div class="global-top">
      <div class="global-top__item">
        <h3>Loading</h3>
        <ui-switch v-model="isLoading" />
      </div>
      <div class="global-top__item">
        <h3>Disabled</h3>
        <ui-switch v-model="isDisabled" />
      </div>
      <div class="global-top__item">
        <h3>Mode</h3>
        <ui-switch v-model="neutral" />
      </div>
    </div>
    <div class="grid">
      <div class="grid__header">Size</div>
      <div class="grid__header">Primary</div>
      <div class="grid__header">Secondary</div>
      <div class="grid__header">Tertiary</div>
      <div class="grid__header">Outline</div>
      <div class="grid__header">Negative</div>
      <div class="grid__header">Outline-light</div>
      <div class="grid__row">28px</div>
      <UiButton
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
        size="sm"
        type="primary"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
      >
        Label
      </UiButton>
      <UiButton
        size="sm"
        type="secondary"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="sm"
        type="tertiary"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="sm"
        type="outline"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
        outline-type-color="#e4704b"
      >
        Label
      </UiButton>
      <UiButton
        size="sm"
        type="negative"
        :disabled="isDisabled"
        :loading="isLoading"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="sm"
        type="outline-light"
        :disabled="isDisabled"
        :loading="isLoading"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
        :mode="neutral ? 'neutral' : 'accent'"
      >
        Label
      </UiButton>
      <div class="grid__row">32px</div>
      <UiButton
        size="md"
        type="primary"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="md"
        type="secondary"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="md"
        type="tertiary"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="md"
        type="outline"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="md"
        type="negative"
        :disabled="isDisabled"
        :loading="isLoading"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        :mode="neutral ? 'neutral' : 'accent'"
        size="md"
        type="outline-light"
        :disabled="isDisabled"
        :loading="isLoading"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <div class="grid__row">36px</div>
      <UiButton
        size="lg"
        type="primary"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="lg"
        type="secondary"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="lg"
        type="tertiary"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="lg"
        type="outline"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="lg"
        type="negative"
        :disabled="isDisabled"
        :loading="isLoading"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        :mode="neutral ? 'neutral' : 'accent'"
        size="lg"
        type="outline-light"
        :disabled="isDisabled"
        :loading="isLoading"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <div class="grid__row">44px</div>
      <UiButton
        size="xl"
        type="primary"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="xl"
        type="secondary"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="xl"
        type="tertiary"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="xl"
        type="outline"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="xl"
        type="negative"
        :disabled="isDisabled"
        :loading="isLoading"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        :mode="neutral ? 'neutral' : 'accent'"
        size="xl"
        type="outline-light"
        :disabled="isDisabled"
        :loading="isLoading"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <div class="grid__row">48px</div>
      <UiButton
        size="xxl"
        type="primary"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="xxl"
        type="secondary"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="xxl"
        type="tertiary"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="xxl"
        type="outline"
        :disabled="isDisabled"
        :loading="isLoading"
        :mode="neutral ? 'neutral' : 'accent'"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        size="xxl"
        type="negative"
        :disabled="isDisabled"
        :loading="isLoading"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
      <UiButton
        :mode="neutral ? 'neutral' : 'accent'"
        size="xxl"
        type="outline-light"
        :disabled="isDisabled"
        :loading="isLoading"
        leftIconType="100"
        leftIconName="add-circle  1"
        rightIconType="100"
        rightIconName="add-circle  1"
      >
        Label
      </UiButton>
    </div>
    <div class="bottom">
      <UiButton
        size="xl"
        type="social"
        :disabled="isDisabled"
        :loading="isLoading"
        leftIconType="social"
        leftIconName="logo_google"
      >
        Label
      </UiButton>
      <UiButton
        size="xl"
        type="social"
        mode="neutral"
        :disabled="isDisabled"
        :loading="isLoading"
        leftIconType="social"
        leftIconName="logo_google"
      >
        Label
      </UiButton>
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
      grid-template-columns: repeat(7, auto);

      &__header {
        font-weight: bold;
      }

      &__row {
        font-weight: bold;
      }
    }

    .bottom {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
</style>
