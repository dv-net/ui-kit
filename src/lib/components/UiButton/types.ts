import { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from "vue-router";

import { UiIconSize, UiIconType } from "../UiIcon/types";
import { UiLinkTarget } from "../UiLink/types";
export type UiButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type UiButtonMode = "neutral" | "accent";
export type UiButtonNativeType = "button" | "submit" | "reset";
export type UiButtonStyleType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "negative"
  | "outline-light"
  | "social";

export interface UiButtonProps {
  link?: boolean;
  target?: UiLinkTarget;
  size?: UiButtonSize;
  nativeType?: UiButtonNativeType;
  disabled?: boolean;
  loading?: boolean;
  type?: UiButtonStyleType;
  mode?: UiButtonMode;
  leftIconType?: UiIconType;
  leftIconName?: string;
  leftIconColor?: string;
  leftIconSize?: UiIconSize;
  rightIconType?: UiIconType;
  rightIconName?: string;
  rightIconColor?: string;
  rightIconSize?: UiIconSize;
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
  outlineTypeColor?: string;
}
