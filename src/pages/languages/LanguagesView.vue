<script lang="ts" setup>
  import UiLanguages from "@/lib/components/UiLanguages/UiLanguages.vue";
  import { ref } from "vue";
  import { locales } from "@/utils/constants/locale";

  const isShow = ref(false);
  const lang = ref(locales[0]);
</script>
<template>
  <div class="page">
    <h1 class="global-title">Languages</h1>

    <div class="grid">
      <div class="grid__header">Basic</div>
      <ui-languages v-model="lang" :locales="locales" />
    </div>

    <div class="grid">
      <div class="grid__header">For header</div>
      <ui-languages for-header v-model="lang" :locales="locales" />
    </div>

    <div class="grid">
      <div @click="isShow = true" class="grid__header pointer">Hidden (click title to toggle)</div>
      <ui-languages v-model:is-show="isShow" is-hidden v-model="lang" :locales="locales" />
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
    }
  }
</style>
