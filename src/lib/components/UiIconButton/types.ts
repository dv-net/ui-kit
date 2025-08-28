import { RouteLocationAsPathGeneric,RouteLocationAsRelativeGeneric } from "vue-router";

import { UiIconType } from "../UiIcon/types";
export type UiIconButtonMode = "square" | "circle";
export type UiIconButtonNativeType = "button" | "submit" | "reset";
export type UiIconButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type UiIconButtonType =
  | "contrast"
  | "accent"
  | "tint"
  | "positive"
  | "positive-tint"
  | "negative"
  | "negative-tint"
  | "clear";
export interface UiIconButtonProps {
  mode?: UiIconButtonMode;
  type?: UiIconButtonType;
  size?: UiIconButtonSize;
  iconName: string;
  iconType?: UiIconType;
  iconColor?: string;
  disabled?: boolean;
  loading?: boolean;
  noSize?: boolean;
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
  href?: string;
  nativeType?: UiIconButtonNativeType;
  containerSmall?: boolean;
}
