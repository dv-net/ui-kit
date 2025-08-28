<script lang="ts" setup>
  import { ref } from "vue";

  import { ProfileMenuItem } from "../types";

  import { UiAnimation, UiIcon } from "@/lib";

  defineProps<{ item: ProfileMenuItem }>();
  const emits = defineEmits(["closeMenu"]);
  const animationRef = ref();

  function itemClickHandler(item: ProfileMenuItem) {
    if (item.action) {
      item.action();
    }
    emits("closeMenu");
  }
</script>
<template>
  <button
    :id="item.id && item.id()"
    @click="itemClickHandler(item)"
    v-if="item.isShow === undefined || item.isShow"
    class="ui-profile-menu--item"
    :class="[{ 'is-active': item.isActive }, item.class && item.class()]"
    @mouseover="item.animationIcon && animationRef?.lottie?.play()"
    @mouseleave="item.animationIcon && animationRef?.lottie?.stop()"
  >
    <div v-if="item.animationIcon" class="ui-profile-menu--item__animation">
      <UiAnimation ref="animationRef" :width="24" :height="24" :icon-component="item.animationIcon" />
    </div>

    <UiIcon
      v-if="item.iconName"
      size="lg"
      :name="item.iconName"
      :color="item.iconColor"
      :type="item.iconType ?? '400'"
      :key="item.name"
    />
    <p>{{ item.label }}</p>
  </button>
</template>
<style lang="scss">
  .ui-profile-menu--item {
    display: flex;
    width: 100%;
    min-height: 40px;
    align-items: center;
    padding: 8px 16px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    gap: 16px;
    transition: var(--transition);

    &:hover {
      background-color: var(--color-background-secondary);
    }

    &.is-active {
      background-color: var(--color-background-info);
    }

    &__animation {
      width: max-content;
    }
  }
</style>
