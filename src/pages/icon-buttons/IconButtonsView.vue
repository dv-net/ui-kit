<script setup lang="ts">
  import UiSwitch from "@/lib/components/UiSwitch/UiSwitch.vue";

  import { ref } from "vue";

  import { UiIconButton } from "@/lib";
  import { UiIconButtonSize, UiIconButtonType } from "@/lib/components/UiIconButton/types";

  const isLoading = ref(false);
  const isDisabled = ref(false);
  const isCircleMode = ref(false);
  const noSize = ref(false);
  const sizes: { value: UiIconButtonSize; label: string }[] = [
    { value: "xs", label: "20px(xs)" },
    { value: "sm", label: "24px(sm)" },
    { value: "sm-md", label: "28px(sm-md)" },
    { value: "md", label: "32px(md)" },
    { value: "md-lg", label: "36px(md-lg)" },
    { value: "lg", label: "40px(lg)" },
    { value: "lg-xl", label: "44px(lg-xl)" },
    { value: "xl", label: "48px(xl)" },
    { value: "xxxl", label: "52px(xxxl)" },
    { value: "xxxxl", label: "56px(xxxxl)" }
  ];
  const types: UiIconButtonType[] = [
    "accent",
    "contrast",
    "tint",
    "positive",
    "positive-tint",
    "negative",
    "negative-tint",
    "clear"
  ];
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

        <template v-for="size in sizes" :key="size.value">
          <div class="sizes-grid__row">{{ size.label }}</div>
          <UiIconButton
            v-for="type in types"
            :key="type"
            :type="type"
            :size="size.value"
            :loading="isLoading"
            :disabled="isDisabled"
            :no-size="noSize"
            icon-name="home"
            :mode="isCircleMode ? 'circle' : 'square'"
          />
        </template>
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

