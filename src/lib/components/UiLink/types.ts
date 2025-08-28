import { RouteLocationRaw } from "vue-router";
export type UiLinkSize = "sm" | "md" | "lg" | "xl";
export type UiLinkMode = "primary" | "secondary";
export type UiLinkTarget = "_blank" | "_self" | "_parent" | "_top";
export interface UiLinkProps {
  to?: RouteLocationRaw;
  size?: UiLinkSize;
  mode?: UiLinkMode;
  disabled?: boolean;
}
