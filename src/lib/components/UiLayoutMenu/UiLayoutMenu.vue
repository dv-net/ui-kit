<script setup lang="ts">
  import UiLayoutMenuItem from "@/lib/components/UiLayoutMenu/UiLayoutMenuItem.vue";

  import { computed } from "vue";
  import { useRoute } from "vue-router";

  import type { RouteItem, UiLayoutMenuProps } from "./types";
  const props = withDefaults(defineProps<UiLayoutMenuProps>(), {
    collapsed: false
  });
  const route = useRoute();
  defineEmits(["selected"]);
  const routesForCollapse = computed(() => {
    const flattenRoutes = (routes: RouteItem[]) => {
      let routesArray: RouteItem[] = [];
      routes.forEach((route) => {
        routesArray.push(route);
        if (route.children?.length) {
          routesArray = routesArray.concat(flattenRoutes(route.children));
        }
      });
      return routesArray;
    };
    return flattenRoutes(props.routeItems);
  });
  const parrentRoutes = computed(() => {
    function findParentPaths(currentPath: string, routes: RouteItem[], parentPaths: string[] = []) {
      for (const route of routes) {
        if (route.children && route.children.length > 0) {
          const childFound = route.children.some((child) => child?.path === currentPath);
          if (childFound) {
            parentPaths.push(route?.path);
            return parentPaths;
          }
          const result = findParentPaths(currentPath, route.children, parentPaths);
          if (result) {
            parentPaths.push(route?.path);
            return parentPaths;
          }
        }
      }
      return null;
    }
    return findParentPaths(route?.path, props.routeItems);
  });
</script>

<template>
  <ul class="ui-layout-menu" :class="{ 'is-collapsed': collapsed }">
    <template v-if="collapsed">
      <li v-for="routeItem in routesForCollapse" :key="routeItem?.path">
        <UiLayoutMenuItem
          :route-item="routeItem"
          :collapsed="collapsed"
          :route-items="routeItems"
          :parrentRoutes="parrentRoutes"
          @selected="$emit('selected', $event)"
        >
        </UiLayoutMenuItem>
      </li>
    </template>

    <template v-else>
      <li v-for="routeItem in routeItems" :key="routeItem?.path">
        <UiLayoutMenuItem
          :route-item="routeItem"
          :collapsed="collapsed"
          :route-items="routeItems"
          :parrentRoutes="parrentRoutes"
          @selected="$emit('selected', $event)"
        >
        </UiLayoutMenuItem>
      </li>
    </template>
  </ul>
</template>

<style lang="scss">
  .ui-layout-menu {
    display: flex;
    width: 204px;
    flex-direction: column;
    padding: 0;
    margin: 0;
    list-style-type: none;

    &.is-collapsed {
      width: 64px;
    }

    @media screen and (width < 768px) {
      width: 100%;
    }
  }
</style>
