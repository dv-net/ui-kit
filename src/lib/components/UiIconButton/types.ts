import { RouteLocationAsPathGeneric,RouteLocationAsRelativeGeneric } from "vue-router";

import { UiIconType } from "../UiIcon/types";
export type UiIconButtonMode = "square" | "circle";
export type UiIconButtonNativeType = "button" | "submit" | "reset";
export type UiIconButtonSize =
  | "xs" // 20px
  | "sm" // 24px
  | "sm-md" // 28px
  | "md" // 32px
  | "md-lg" // 36px
  | "lg" // 40px
  | "lg-xl" // 44px
  | "xl" // 48px
  | "xxxl" // 52px
  | "xxxxl"; // 56px
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
