<script lang="ts" setup>
  import { UiBlockTitleProps } from "./types";

  import { UiTabs, UiTabsItem } from "@/lib";
  defineProps<UiBlockTitleProps>();
</script>

<template>
  <div class="ui-block-title">
    <slot>
      <h1 v-if="title" class="ui-block-title__title">{{ title }}</h1>
    </slot>
    <nav class="ui-block-title__nav">
      <UiTabs router size="lg" mode="clear" :modelValue="$route?.path">
        <UiTabsItem :value="link?.path" v-for="link in links" :key="link?.path">
          {{ link.title }}
        </UiTabsItem>
      </UiTabs>
    </nav>
  </div>
</template>

<style lang="scss">
  .ui-block-title {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-separator-border-primary);
    margin-bottom: 32px;
    gap: 16px;

    &__title {
      margin: 0;
      margin-bottom: 15px;
      font-size: 32px;
      font-weight: 700;
      line-height: 40px;
    }

    &__nav {
      overflow: auto hidden;
      margin-bottom: -1px;
    }
  }
</style>
