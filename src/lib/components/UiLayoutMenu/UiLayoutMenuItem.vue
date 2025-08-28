<script setup lang="ts">
  import UiIcon from "@/lib/components/UiIcon/UiIcon.vue";

  import { watchOnce } from "@vueuse/core";
  import { computed, inject, ref } from "vue";
  import { useRoute } from "vue-router";

  import type { UiLayoutMenuItemProps } from "./types";

  import { UiAnimation } from "@/lib";
  import { menuProvide, menuProvideDefault } from "@/lib/components/UiLayout/types.ts";

  defineEmits(["selected"]);

  const props = defineProps<UiLayoutMenuItemProps>();
  const { onMenuItemSelect } = inject<menuProvide>("menu") || menuProvideDefault;
  const route = useRoute();

  const isOpen = ref(props.parrentRoutes?.includes(props.routeItem?.path));

  const isButton = computed(() => props.routeItem?.meta?.isButton);

  const stateRoute = computed<{ isSelected: boolean; isChildren: boolean }>(() => {
    const { path, meta, children } = props.routeItem;
    const isChildren = !!meta?.isChildren;
    const currentPath = path?.toLowerCase();
    const matchedPaths = route?.matched.map((item) => item.path?.toLowerCase());
    if (children?.length) {
      return {
        isSelected: matchedPaths.includes(currentPath),
        isChildren
      };
    }
    const routeSegments = route?.path.split("/").map((seg) => seg.toLowerCase());
    const firstSegment = currentPath.split("/")[1];
    return {
      isSelected: isChildren ? path === route?.path : routeSegments.some((seg) => seg === firstSegment),
      isChildren
    };
  });

  function onClickHandler() {
    if (!isButton.value) {
      return;
    }
    if (props.routeItem.meta.click) {
      props.routeItem?.meta?.click();
    } else if (isButton.value) {
      isOpen.value = !isOpen.value;
    }
  }

  watchOnce(
    () => props.parrentRoutes,
    () => {
      if (props.parrentRoutes && props.parrentRoutes?.includes(props.routeItem?.path)) {
        isOpen.value = true;
      }
    }
  );
</script>

<template>
  <component
    @click.stop="onClickHandler"
    :is="isButton ? 'button' : 'RouterLink'"
    :to="routeItem?.path"
    class="ui-layout-menu-item__link"
  >
    <span
      class="ui-layout-menu-item"
      :class="[
        { 'is-selected': stateRoute.isSelected && !stateRoute.isChildren },
        { 'is-collapsed': collapsed },
        routeItem.meta?.class
      ]"
      @click="onMenuItemSelect"
      @keyup.enter="onMenuItemSelect"
    >
      <UiAnimation
        v-if="routeItem?.meta?.animationIcon"
        :autoPlay="stateRoute.isSelected"
        :width="24"
        :height="24"
        :icon-component="routeItem?.meta?.animationIcon"
        class="ui-layout-menu-item__animation"
      />
      <template v-if="routeItem?.meta?.icon && routeItem?.meta?.iconActive">
        <UiIcon v-show="stateRoute.isSelected" size="lg" :name="routeItem.meta.iconActive" type="filled" />
        <UiIcon v-show="!stateRoute.isSelected" size="lg" :name="routeItem.meta.icon" type="100" />
      </template>
      <template v-if="routeItem.meta?.iconComponent">
        <component v-show="stateRoute.isSelected" :is="routeItem.meta?.iconComponentActive" />
        <component v-show="!stateRoute.isSelected" :is="routeItem.meta?.iconComponent" />
      </template>
      <span
        class="ui-layout-menu-item__title"
        :class="[{ children: stateRoute.isChildren }, { 'children-active': stateRoute.isSelected }]"
      >
        {{ routeItem.meta?.title }}
      </span>
      <span v-if="routeItem.meta.indicator" class="ui-layout-menu-item__indicator">{{ routeItem.meta.indicator }}</span>
      <button
        v-if="routeItem.children?.length && !collapsed && !routeItem.meta.alwaysOpen"
        @click.stop.prevent="isOpen = !isOpen"
        class="ui-layout-menu-item__chevron"
        :class="{ 'is-open': isOpen }"
      >
        <UiIcon name="keyboard-arrow-down" type="400" />
      </button>
    </span>
  </component>

  <ul
    class="ui-layout-menu"
    v-if="routeItem?.children && routeItem.children?.length && !collapsed && (isOpen || routeItem.meta.alwaysOpen)"
  >
    <li v-for="children in routeItem.children" :key="children?.path">
      <UiLayoutMenuItem
        :routeItems="routeItems"
        :key="children?.path"
        :route-item="children"
        :collapsed="collapsed"
        :parrentRoutes="parrentRoutes"
        @selected="$emit('selected', $event)"
      >
      </UiLayoutMenuItem>
    </li>
  </ul>
</template>

<style lang="scss">
  .ui-layout-menu-item {
    position: relative;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    gap: 8px;
    line-height: 0;
    text-align: left;
    transition: var(--transition);

    &:hover {
      background: #f7f9fb;
    }

    &__title {
      overflow: hidden;
      flex-grow: 1;
      margin-left: 4px;
      color: #303345;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.children {
        font-weight: 300;
      }

      &.children-active {
        font-weight: 600;
      }
    }

    &__chevron {
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      justify-self: end;
      line-height: 0;
      transition: var(--transition);

      &.is-open {
        rotate: 180deg;
      }
    }

    &.is-selected {
      background: #ecf0f5 !important;

      .ui-layout-menu-item__title {
        font-weight: 600;
      }
    }

    &__indicator {
      display: flex;
      min-width: max-content;
      height: 16px;
      align-items: center;
      justify-content: center;
      padding: 0 5px;
      border-radius: 16px;
      background: var(--color-background-accent);
      color: #fff;
      font-size: 10px;
      justify-self: end;
    }

    &.is-collapsed {
      width: 64px;
      height: 64px;
      flex-direction: column;
      padding: 12px 8px;
      gap: 0;

      .ui-layout-menu-item__title {
        width: 100%;
        margin-top: 4px;
        margin-left: 0;
        font-size: 10px;
        line-height: 12px;
        text-align: center;
      }

      .ui-layout-menu-item__indicator {
        position: absolute;
        top: 2px;
        right: 2px;
        height: 12px;
        padding: 0 4px;
        font-size: 8px;
      }
    }

    &__link {
      width: 100%;
      padding: 0;
      border: none;
      background: none;
      color: unset;
      text-decoration: none;

      & + .ui-layout-menu {
        width: calc(100% - 12px);
        margin-left: auto;
      }
    }
  }
</style>
