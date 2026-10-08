<script setup lang="ts">
  import UiSwitch from "@/lib/components/UiSwitch/UiSwitch.vue";

  import { ref } from "vue";

  import { UiButton } from "@/lib";
  import { UiButtonSize, UiButtonStyleType } from "@/lib/components/UiButton/types";

  const isLoading = ref<boolean>(false);
  const isDisabled = ref<boolean>(false);
  const neutral = ref<boolean>(false);
  const sizes: { value: UiButtonSize; label: string }[] = [
    { value: "xs", label: "24px(xs)" },
    { value: "sm", label: "28px(sm)" },
    { value: "md", label: "32px(md)" },
    { value: "lg", label: "36px(lg)" },
    { value: "lg-xl", label: "40px(lg-xl)" },
    { value: "xl", label: "44px(xl)" },
    { value: "xxl", label: "48px(xxl)" },
    { value: "xxxl", label: "52px(xxxl)" },
    { value: "xxxxl", label: "56px(xxxxl)" }
  ];
  const types: UiButtonStyleType[] = ["primary", "secondary", "tertiary", "outline", "negative", "outline-light"];
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
      <template v-for="size in sizes" :key="size.value">
        <div class="grid__row">{{ size.label }}</div>
        <UiButton
          v-for="type in types"
          :key="type"
          :size="size.value"
          :type="type"
          :disabled="isDisabled"
          :loading="isLoading"
          :mode="type === 'negative' ? undefined : neutral ? 'neutral' : 'accent'"
          left-icon-type="100"
          left-icon-name="add-circle  1"
          right-icon-type="100"
          right-icon-name="add-circle  1"
          :outline-type-color="type === 'outline' && size.value === 'sm' ? '#e4704b' : undefined"
        >
          Label
        </UiButton>
      </template>
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
