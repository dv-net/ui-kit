import { Ref } from "vue";

export type UiTabsSize = "md" | "lg";
export type UiTabsMode = "outline" | "light" | "dark" | "clear";
export interface UiTabsProps {
  modelValue: string;
  size?: UiTabsSize;
  mode?: UiTabsMode;
  router?: boolean;
  isShort?: boolean;
}

export interface UiTabsProvideData {
  modelValue: Ref<string | number>;
  size?: UiTabsSize;
  mode?: UiTabsMode;
  router: boolean;
  change: (tab: string | number) => void;
}
