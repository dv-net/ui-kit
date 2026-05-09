<script setup lang="ts">
  import UiSwitch from "@/lib/components/UiSwitch/UiSwitch.vue";
  import TableExampleOne from "@/pages/table/components/TableExampleOne.vue";
  import TableExampleThree from "@/pages/table/components/TableExampleThree.vue";
  import TableExampleTwo from "@/pages/table/components/TableExampleTwo.vue";

  import { ref } from "vue";

  const isLoading = ref(false);
</script>

<template>
  <div class="page">
    <h1 class="global-title">Table</h1>

    <div class="grid">
      <div class="grid__header">Controls</div>
      <div>
        <UiSwitch label="Loading" text="For all tables" v-model="isLoading" />
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Example 1</div>
      <p class="grid__description">Pagination and default sorting</p>
      <table-example-one :isLoading="isLoading" />
    </div>

    <div class="grid">
      <div class="grid__header">Example 2</div>
      <p class="grid__description">Row selection, nested fields, summary, initial sort, row highlight</p>
      <table-example-two :isLoading="isLoading" />
    </div>

    <div class="grid">
      <div class="grid__header">Example 3</div>
      <p class="grid__description">Disabled rows and custom sorting</p>
      <table-example-three :isLoading="isLoading" />
    </div>
  </div>
</template>

<style lang="scss">
  .pointer {
    cursor: pointer;
  }

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

      &__description {
        margin: 0;
        color: var(--color-text-secondary, #5c6b7a);
        font-size: 14px;
        line-height: 1.4;
      }
    }
  }
</style>
