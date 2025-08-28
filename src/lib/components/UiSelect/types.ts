import type { OffsetOptions } from "@floating-ui/vue";

import { UiIconSize } from "../UiIcon/types";

import { UiPlacementType } from "@/lib/components/UiTooltip/types.ts";

export enum SelectListItemSize {
  sm = 44,
  md = 52,
  lg = 56,
  xl = 60
}
export type SelectSize = "sm" | "md" | "lg" | "xl";
export type SelectListItemSizeKeys = keyof typeof SelectListItemSize;
export type SelectType = "default" | "inside" | "outside";

export interface UiSelectProps<Options> {
  options: Options[];
  valueKey?: string;
  labelKey?: string;
  asObject?: boolean;
  type?: SelectType;
  size?: string;
  error?: boolean;
  filled?: boolean;
  disabled?: boolean;
  placeholder?: string;
  withSearch?: boolean;
  clearable?: boolean;
  loading?: boolean;
  id?: string;
  multiple?: boolean;
  itemSize?: SelectListItemSizeKeys;
  popperClass?: string;
  fitContentWidth?: boolean;
  offset?: OffsetOptions;
  placement?: UiPlacementType;
  readonly?: boolean;
  teleport?: string | boolean;
  isVirtualList?: boolean;
  customSearch?: boolean;
  chevronName?: string;
  chevronColor?: string;
  chevronSize?: UiIconSize;
  optionClass?: (option: Options, index: number) => string;
  searchFn?: (search: string) => Options[];
}
