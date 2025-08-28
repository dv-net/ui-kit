<script setup lang="ts">
  import Content from "./ContentView.vue";

  import { ref } from "vue";

  import { UiTooltip } from "@/lib";
  const text = ref(`This is text`);
  const title = ref("This is a title");
</script>

<template>
  <div class="page">
    <h1 class="global-title">Tooltip</h1>
    <div class="grid">
      <div class="grid__header">Positions</div>
      <div class="tooltip-grid">
        <div class="tooltip-grid__cell"></div>
        <div class="tooltip-grid__cell">
          <UiTooltip isShowIconClose mode="dark" show-event="click" position="top-start" :title="title" :text="text">
            <Content text="top-start" />
          </UiTooltip>
        </div>
        <div class="tooltip-grid__cell">
          <UiTooltip position="top" :title="title" :text="text">
            <Content text="top" />
          </UiTooltip>
        </div>
        <div class="tooltip-grid__cell">
          <UiTooltip position="top-end" :title="title" :text="text">
            <Content text="top-end" />
          </UiTooltip>
        </div>
        <div class="tooltip-grid__cell"></div>

        <div class="tooltip-grid__cell">
          <UiTooltip mode="dark" position="left-start" :title="title" :text="text" is-gold-title>
            <Content text="left-start" />
          </UiTooltip>
        </div>
        <div class="tooltip-grid__cell"></div>
        <div class="tooltip-grid__cell"></div>
        <div class="tooltip-grid__cell"></div>
        <div class="tooltip-grid__cell">
          <UiTooltip position="right-start" :title="title" :text="text">
            <Content text="right-start" />
          </UiTooltip>
        </div>

        <div class="tooltip-grid__cell">
          <UiTooltip position="left" :title="title" :text="text">
            <Content text="left" />
          </UiTooltip>
        </div>
        <div class="tooltip-grid__cell"></div>
        <div class="tooltip-grid__cell"></div>
        <div class="tooltip-grid__cell"></div>
        <div class="tooltip-grid__cell">
          <UiTooltip position="right" :title="title" :text="text">
            <Content text="right" />
          </UiTooltip>
        </div>

        <div class="tooltip-grid__cell">
          <UiTooltip position="left-end" :title="title" :text="text">
            <Content text="left-end" />
          </UiTooltip>
        </div>
        <div class="tooltip-grid__cell"></div>
        <div class="tooltip-grid__cell"></div>
        <div class="tooltip-grid__cell"></div>
        <div class="tooltip-grid__cell">
          <UiTooltip position="right-end" :title="title" :text="text">
            <Content text="right-end" />
          </UiTooltip>
        </div>

        <div class="tooltip-grid__cell"></div>
        <div class="tooltip-grid__cell">
          <UiTooltip position="bottom-start" :title="title" :text="text">
            <Content text="bottom-start" />
          </UiTooltip>
        </div>
        <div class="tooltip-grid__cell">
          <UiTooltip position="bottom" :title="title" :text="text">
            <Content text="bottom" />
          </UiTooltip>
        </div>
        <div class="tooltip-grid__cell">
          <UiTooltip position="bottom-end">
            <Content text="bottom-end" />
            <template #title>{{ title }}</template>
            <template #text>{{ text }}</template>
          </UiTooltip>
        </div>
        <div class="tooltip-grid__cell"></div>
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

  .tooltip-grid {
    display: grid;
    overflow: hidden;
    margin-top: 32px;
    gap: 24px;
    grid-template-columns: repeat(5, minmax(100px, max-content));

    &__content-cell {
      padding: 12px;
      border: 1px solid var(--color-separator-border-secondary);
      border-radius: 8px;
    }
  }
</style>
