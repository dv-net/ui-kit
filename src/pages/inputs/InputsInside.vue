<script setup lang="ts">
  import UiIcon from "@/lib/components/UiIcon/UiIcon.vue";
  import UiInput from "@/lib/components/UiInput/UiInput.vue";

  import { ref } from "vue";

  const value = ref("");
</script>

<template>
  <div class="page">
    <h1 class="global-title">Inputs inside</h1>

    <div class="grid">
      <div class="grid__header">md (44px)</div>
      <div class="grid__content">
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside copy />
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside disabled>
          <template #append><UiIcon name="home" type="400"></UiIcon></template>
          <template #prepend><UiIcon name="home" type="400"></UiIcon></template>
        </UiInput>
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside filled copy></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside disabled filled>
          <template #append><UiIcon name="home" type="400"></UiIcon></template>
          <template #prepend><UiIcon name="home" type="400"></UiIcon></template>
        </UiInput>
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside error></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside disabled error></UiInput>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">lg (52px)</div>
      <div class="grid__content">
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside size="lg"></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside size="lg" disabled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside size="lg" filled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside size="lg" disabled filled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside size="lg" error></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside size="lg" disabled error></UiInput>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">xl (56px)</div>
      <div class="grid__content">
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside size="xl"></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside size="xl" disabled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside size="xl" filled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside size="xl" disabled filled></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside size="xl" error></UiInput>
        <UiInput v-model="value" placeholder="Placeholder" label="Label" inside size="xl" disabled error></UiInput>
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
