<script lang="ts" setup>
  import { ref } from "vue";

  import { UiTabs, UiTabsItem } from "@/lib";
  const tab = ref("1");
  const tab1 = ref("1");
</script>

<template>
  <div class="page">
    <h1 class="global-title">Tabs</h1>

    <div class="grid">
      <div class="grid__header">Size md</div>
      <div class="page-tabs__item">
        <UiTabs @change="(tab) => console.log(tab)" v-model="tab">
          <UiTabsItem value="1"> Button 1</UiTabsItem>
          <UiTabsItem value="2"> Button 2</UiTabsItem>
          <UiTabsItem value="3"> Button 3</UiTabsItem>
        </UiTabs>
        <UiTabs mode="light" v-model="tab">
          <UiTabsItem value="1"> Button 1</UiTabsItem>
          <UiTabsItem value="2"> Button 2</UiTabsItem>
          <UiTabsItem value="3"> Button 3</UiTabsItem>
        </UiTabs>
        <UiTabs mode="dark" v-model="tab">
          <UiTabsItem value="1"> Button 1</UiTabsItem>
          <UiTabsItem value="2"> Button 2</UiTabsItem>
          <UiTabsItem value="3"> Button 3</UiTabsItem>
        </UiTabs>
        <UiTabs mode="clear" v-model="tab">
          <UiTabsItem value="1"> Button 1</UiTabsItem>
          <UiTabsItem value="2"> Button 2</UiTabsItem>
          <UiTabsItem value="3"> Button 3</UiTabsItem>
        </UiTabs>
        <UiTabs mode="clear" v-model="tab">
          <UiTabsItem value="1" badge="1"> Button 1</UiTabsItem>
          <UiTabsItem value="2" badge="1"> Button 2</UiTabsItem>
          <UiTabsItem value="3" badge="1"> Button 3</UiTabsItem>
        </UiTabs>
      </div>
    </div>

    <div class="grid">
      <div class="grid__header">Size lg</div>
      <div class="page-tabs__item">
        <UiTabs size="lg" v-model="tab1">
          <UiTabsItem value="1"> Button 1</UiTabsItem>
          <UiTabsItem value="2"> Button 2</UiTabsItem>
          <UiTabsItem value="3"> Button 3</UiTabsItem>
        </UiTabs>
        <UiTabs mode="light" size="lg" v-model="tab1">
          <UiTabsItem value="1"> Button 1</UiTabsItem>
          <UiTabsItem value="2"> Button 2</UiTabsItem>
          <UiTabsItem value="3"> Button 3</UiTabsItem>
        </UiTabs>
        <UiTabs mode="dark" size="lg" v-model="tab1">
          <UiTabsItem value="1"> Button 1</UiTabsItem>
          <UiTabsItem value="2"> Button 2</UiTabsItem>
          <UiTabsItem value="3"> Button 3</UiTabsItem>
        </UiTabs>
        <UiTabs mode="clear" size="lg" v-model="tab1">
          <UiTabsItem value="1"> Button 1</UiTabsItem>
          <UiTabsItem value="2"> Button 2</UiTabsItem>
          <UiTabsItem value="3"> Button 3</UiTabsItem>
        </UiTabs>
        <UiTabs mode="clear" size="lg" v-model="tab1">
          <UiTabsItem value="1" badge="1"> Button 1</UiTabsItem>
          <UiTabsItem value="2" badge="1"> Button 2</UiTabsItem>
          <UiTabsItem value="3" badge="1"> Button 3</UiTabsItem>
        </UiTabs>
      </div>
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
        font-size: 18px;
        font-weight: bold;
      }
    }
  }

  .page-tabs__item {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
</style>
