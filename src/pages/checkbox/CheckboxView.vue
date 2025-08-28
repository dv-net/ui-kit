<script setup lang="ts">
  import UiCheckboxGroup from "@/lib/components/UiCheckboxGroup/UiCheckboxGroup.vue";
  import UiSwitch from "@/lib/components/UiSwitch/UiSwitch.vue";
  import { ref } from "vue";
  import { UiCheckbox } from "@/lib";

  const isDisabled = ref(false);
  const group = ref<string[]>(["1"]);
  const check = ref(true);
</script>

<template>
  <div class="page">
    <h1 class="global-title">Checkbox</h1>
    <div class="global-top">
      <div class="global-top__item">
        <h3>Disabled</h3>
        <ui-switch v-model="isDisabled" />
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Size</div>
      <div class="grid__row">16px(sm)</div>
      <UiCheckbox v-model="check" size="sm" :disabled="isDisabled" />
      <div class="grid__row">20px(md)</div>
      <UiCheckbox size="md" :disabled="isDisabled">
        Title
        <template #subtitle>subtitle</template>
      </UiCheckbox>
    </div>

    <div class="grid">
      <div class="grid__header">Group</div>
      <div class="grid__row">16px(sm)</div>
      <UiCheckboxGroup
        @change="(v) => console.log(v)"
        size="sm"
        :disabled="isDisabled"
        v-model="group"
      >
        <UiCheckbox value="1">
          Label 1
          <template #subtitle>subtitle 1</template>
        </UiCheckbox>
        <UiCheckbox value="2">Label 2</UiCheckbox>
        <UiCheckbox value="3">Label 3</UiCheckbox>
      </UiCheckboxGroup>
      <div class="grid__row">20px(md)</div>
      <UiCheckboxGroup
        @change="(v) => console.log(v)"
        size="md"
        :disabled="isDisabled"
        v-model="group"
      >
        <UiCheckbox value="1">
          Label 1
          <template #subtitle>subtitle 1</template>
        </UiCheckbox>
        <UiCheckbox value="2">Label 2</UiCheckbox>
        <UiCheckbox value="3">Label 3</UiCheckbox>
      </UiCheckboxGroup>
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
      grid-template-columns: 120px 1fr;

      &__header {
        width: max-content;
        border-bottom: 1px solid;
        margin-bottom: 8px;
        font-size: 18px;
        font-weight: bold;
        grid-column: span 2;
      }

      &__row {
        font-weight: bold;
      }
    }
  }
</style>
