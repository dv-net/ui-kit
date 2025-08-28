import { Component } from "vue";

export interface RouteItem {
  path: string;
  meta: {
    title: string;
    icon?: string;
    iconActive?: string;
    iconComponent?: Component;
    iconComponentActive?: Component;
    class?: string;
    isButton?: boolean;
    isChildren?: boolean;
    indicator?: string | number;
    alwaysOpen?: boolean;
    animationIcon?: Component;
    click?: () => void;
  };
  children?: RouteItem[];
}

export interface UiLayoutMenuProps {
  routeItems: RouteItem[];
  collapsed?: boolean;
}

export interface UiLayoutMenuItemProps {
  routeItem: RouteItem;
  collapsed: boolean;
  parrentRoutes: string[] | null;
  routeItems: RouteItem[];
}
