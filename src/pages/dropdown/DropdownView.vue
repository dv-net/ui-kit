<script setup lang="ts">
  import { UiDropdown } from "@/lib";
</script>

<template>
  <div class="page">
    <h1 class="global-title">Dropdown</h1>

    <div class="grid">
      <UiDropdown>
        <template #reference>
          <div class="grid__header">Click trigger</div>
         </template>
        <template #default>
          <p style="padding: 12px">
            We are a team of passionate creators dedicated to making your experience seamless and enjoyable. <br />
            Every project we take on is approached with creativity, precision, and care. <br />
            Our goal is to build solutions that not only work but also inspire.
          </p>
        </template>
      </UiDropdown>
    </div>

    <div class="grid">
      <UiDropdown trigger="hover">
        <template #reference>
          <div class="grid__header pointer">Hover trigger</div>
        </template>
        <template #default>
          <p style="padding: 12px">
            We are a team of passionate creators dedicated to making your experience seamless and enjoyable. <br />
            Every project we take on is approached with creativity, precision, and care. <br />
            Our goal is to build solutions that not only work but also inspire.
          </p>
        </template>
      </UiDropdown>
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
</style>
