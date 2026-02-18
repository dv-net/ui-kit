<script setup lang="ts">
  import UiCopyText from "@/lib/components/UiCopyText/UiCopyText.vue";
  import UiIcon from "@/lib/components/UiIcon/UiIcon.vue";
  import UiInput from "@/lib/components/UiInput/UiInput.vue";

  import { ref } from "vue";

  const value = ref("");
  const readonlyInteractive = ref("Readonly interactive text");
</script>

<template>
  <div class="page">
    <h1 class="global-title">Inputs</h1>

    <div class="grid">
      <div class="grid__header">sm (36px)</div>
      <div class="grid__content">
        <UiInput
          clearable
          ref="inputref"
          v-model="value"
          placeholder="Placeholder"
          size="sm"
          type="password"
          show-password
        ></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" size="sm" disabled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" size="sm" filled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" size="sm" disabled filled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" size="sm" error></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" size="sm" disabled error></UiInput>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">md (44px)</div>
      <div class="grid__content">
        <UiInput v-model="value" placeholder="Placeholder">
          <template #prepend><UiIcon name="home" type="400"></UiIcon></template>
          <template #append><UiCopyText :copied-text="value"></UiCopyText></template>
        </UiInput>
        <UiInput v-model="value" placeholder="Placeholder" disabled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" filled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" disabled filled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" error></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" disabled error></UiInput>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">lg (52px)</div>
      <div class="grid__content">
        <UiInput v-model="value" placeholder="Placeholder" size="lg"></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" size="lg" disabled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" size="lg" filled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" size="lg" disabled filled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" size="lg" error></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" size="lg" disabled error></UiInput>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">xl (56px)</div>
      <div class="grid__content">
        <UiInput v-model="value" placeholder="Placeholder" size="xl"></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" size="xl" disabled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" size="xl" filled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" size="xl" disabled filled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" size="xl" error></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" size="xl" disabled error></UiInput>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Readonly interactive input</div>
      <div class="grid__content">
        <UiInput v-model="readonlyInteractive" placeholder="Placeholder" readonlyInteractive></UiInput>
        <UiInput v-model="readonlyInteractive" placeholder="Placeholder" readonlyInteractive disabled></UiInput>
        <UiInput v-model="readonlyInteractive" placeholder="Placeholder" readonlyInteractive filled></UiInput>
        <UiInput v-model="readonlyInteractive" placeholder="Placeholder" readonlyInteractive disabled filled></UiInput>
        <UiInput v-model="readonlyInteractive" placeholder="Placeholder" readonlyInteractive error></UiInput>
        <UiInput v-model="readonlyInteractive" placeholder="Placeholder" readonlyInteractive disabled error></UiInput>
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
        width: max-content;
        border-bottom: 1px solid;
        margin-bottom: 8px;
        font-size: 18px;
        font-weight: bold;
      }

      &__content {
        display: grid;
        gap: 12px;
        grid-template: repeat(3, auto) / repeat(2, 1fr);
      }
    }
  }
</style>
