export type UiIconType = "100" | "400" | "filled" | "social";
export type UiIconSize =
  | "fill"
  | "xs" // 12px
  | "sm" // 16px
  | "md" // 20px
  | "lg" // 24px
  | "xl" // 32px
  | "xxl" // 40px
  | "sm-md" // 18px
  | "md-lg" // 22px
  | "lg-xl" // 28px
  | "xxxl" // 36px
  | "xxxxl"; // 44px

export interface UiIconProps {
  name: string;
  type: UiIconType;
  size?: UiIconSize;
  color?: string;
}
