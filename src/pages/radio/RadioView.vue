<script setup lang="ts">
  import UiSwitch from "@/lib/components/UiSwitch/UiSwitch.vue";

  import { ref } from "vue";

  import { UiRadio, UiRadioGroup } from "@/lib";
  import { UiRadioSize } from "@/lib/components/UiRadio/types";
  const isDisabled = ref(false);
  const size = ref<UiRadioSize>("sm");
</script>

<template>
  <div class="page">
    <h1 class="global-title">Radio</h1>

    <div class="grid">
      <div class="grid__header">Controls</div>
      <div class="flex-row">
        <div class="flex-row">
          <h3>Disabled</h3>
          <ui-switch v-model="isDisabled" />
        </div>
        <div class="flex-row">
          <h3>Size</h3>
          <UiRadioGroup size="sm" :disabled="isDisabled" v-model="size">
            <UiRadio value="sm">sm</UiRadio>
            <UiRadio value="md">md</UiRadio>
          </UiRadioGroup>
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Group example</div>
      <UiRadioGroup :size="size" :disabled="isDisabled">
        <UiRadio value="1">Label 1 <template #subtitle>Subtitle 1</template> </UiRadio>
        <UiRadio value="2">Label 2</UiRadio>
        <UiRadio value="3">Label 3</UiRadio>
      </UiRadioGroup>
    </div>
  </div>
</template>

<style lang="scss">
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
        width: max-content;
        border-bottom: 1px solid;
        margin-bottom: 8px;
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

    &.example {
      padding: 24px;
      border: 1px solid var(--color-separator-border-primary);
      border-radius: 12px;
    }
  }
</style>
