<script setup lang="ts">
  import UiDrawer from "@/lib/components/UiDrawer/UiDrawer.vue";

  import { ref } from "vue";

  import { UiButton } from "@/lib";

  const showDrawer = ref(false);
</script>

<template>
  <div class="page">
    <h1 class="global-title">Drawer</h1>

    <div class="grid">
      <div class="grid__header">Basic</div>
      <div>
        <UiButton @click="showDrawer = !showDrawer">Show</UiButton>
        <UiDrawer v-model="showDrawer" drawer-class="my-drawer" size="50%" direction="btt">
          <UiButton @click="showDrawer = !showDrawer">Hide</UiButton>
        </UiDrawer>
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
    }
  }

  .my-drawer {
    background: white;
  }
</style>
