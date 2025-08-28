<script setup lang="ts">
  import { ref } from "vue";

  import { UiAnimation,UiCollapse, UiCollapseItem, UiCopyText, UiIcon } from "@/lib";
  import * as animations from '@/lib/helpers/animations-list.ts';
  import { svgList100, svgList400, svgListfilled, svgListsocial } from "@/lib/helpers/svg-list";
  const collapse = ref([]);
  const jsonListAnimations = Object.keys(animations);
</script>

<template>
  <div class="page">
    <h1 class="global-title">Icons</h1>

    <div class="grid">
      <UiCollapse mode="custom" v-model="collapse">
        <UiCollapseItem value="animations" title="animations">
          <div class="icons-list">
            <div class="icons-item" v-for="iconName in jsonListAnimations" :key="iconName">
              <UiAnimation :icon-component="animations[iconName]" :width="24" :height="24" autoPlay loop />
              <p>{{ iconName }}</p>
              <UiCopyText size-icon="xs" :copied-text="iconName" color-icon="var(--color-icon-secondary)" />
            </div>
          </div>
        </UiCollapseItem>
        <UiCollapseItem value="100" title="100">
          <div class="icons-list">
            <div class="icons-item" v-for="iconName in svgList100" :key="iconName">
              <UiIcon size="lg" :name="iconName" type="100" />
              <p>{{ iconName }}</p>
              <UiCopyText size-icon="xs" :copied-text="iconName" color-icon="var(--color-icon-secondary)" />
            </div>
          </div>
        </UiCollapseItem>
        <UiCollapseItem value="400" title="400">
          <div class="icons-list">
            <div class="icons-item" v-for="iconName in svgList400" :key="iconName">
              <UiIcon size="lg" :name="iconName" type="400" />
              <p>{{ iconName }}</p>
              <UiCopyText size-icon="xs" :copied-text="iconName" color-icon="var(--color-icon-secondary)" />
            </div>
          </div>
        </UiCollapseItem>
        <UiCollapseItem value="filled" title="filled">
          <div class="icons-list">
            <div class="icons-item" v-for="iconName in svgListfilled" :key="iconName">
              <UiIcon size="lg" :name="iconName" type="filled" />
              <p>{{ iconName }}</p>
              <UiCopyText size-icon="xs" :copied-text="iconName" color-icon="var(--color-icon-secondary)" />
            </div>
          </div>
        </UiCollapseItem>
        <UiCollapseItem value="social" title="social">
          <div class="icons-list">
            <div class="icons-item" v-for="iconName in svgListsocial" :key="iconName">
              <UiIcon size="lg" :name="iconName" type="social" />
              <p>{{ iconName }}</p>
              <UiCopyText size-icon="xs" :copied-text="iconName" color-icon="var(--color-icon-secondary)" />
            </div>
          </div>
        </UiCollapseItem>
      </UiCollapse>
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
    }
  }

  .icons-list {
    display: grid;
    padding: 16px 0;
    gap: 8px;
    grid-template-columns: repeat(5, 1fr);
  }

  .icons-item {
    display: inline-flex;
    align-items: center;
    padding: 4px 8px;
    border: 1px solid var(--color-separator-border-primary);
    border-radius: 8px;
    margin: 0;
    background-color: #fff;
    color: black;
    font-size: 12px;
    gap: 12px;

    .ui-animation {
      margin: 0;
    }
  }

  .ui-copy {
    margin-left: auto;
  }
</style>
