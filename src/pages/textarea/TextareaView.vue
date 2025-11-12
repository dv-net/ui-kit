<script setup lang="ts">
  import UiTextarea from "@/lib/components/UiTextarea/UiTextarea.vue";

  import { onMounted, ref } from "vue";

  const test = ref();
  const value = ref("");

  onMounted(() => {
    value.value =
      "After determining which proxies work, we will proceed to assign their ratings based on their presence in databases and service availability.";
  });
</script>

<template>
  <div class="page">
    <h1 class="global-title">Textarea</h1>

    <div class="grid">
      <div class="grid__header">md (120px)</div>
      <div class="textarea-container">
        <UiTextarea ref="test" v-model="value" isEmptyValueNull placeholder="Placeholder" size="auto" maxLength="200" />
        <UiTextarea v-model="value" placeholder="Placeholder" disabled />
        <UiTextarea v-model="value" placeholder="Placeholder" filled copy />
        <UiTextarea v-model="value" placeholder="Placeholder">
          <template #placeholder>
            <ul>
              <li>One</li>
              <li>Two</li>
              <li>Three</li>
            </ul>
          </template>
        </UiTextarea>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">lg (160px)</div>
      <div class="textarea-container">
        <UiTextarea v-model="value" placeholder="Placeholder" copy size="lg" />
        <UiTextarea v-model="value" placeholder="Placeholder" disabled size="lg" />
        <UiTextarea v-model="value" placeholder="Placeholder" filled copy size="lg" />
        <UiTextarea v-model="value" placeholder="Placeholder" filled disabled size="lg" />
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

    .textarea-container {
      display: grid;
      padding: 16px;
      border: 1px solid #e1e8f1;
      border-radius: 16px;
      background-color: #fff;
      gap: 12px;
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
