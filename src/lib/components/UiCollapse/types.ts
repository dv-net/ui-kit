import { ModelRef } from "vue";

export type UiCollapseMode = "default" | "custom";
export interface UiCollapsProps {
  modelValue: string | number | string[] | number[];
  mode?: UiCollapseMode;
  multiple?: boolean;
}

export interface UiCollapseProvideData {
  modelValue: ModelRef<string | number | unknown[] | undefined, string>;
  mode: UiCollapseMode;
  multiple: boolean;
}
