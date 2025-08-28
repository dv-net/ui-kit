export type UiIconType = "100" | "400" | "filled" | "social";
export type UiIconSize = "fill" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export interface UiIconProps {
  name: string;
  type: UiIconType;
  size?: UiIconSize;
  color?: string;
}
