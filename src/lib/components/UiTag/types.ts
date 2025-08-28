export type UiTagSize = "sm" | "md" | "lg";

export type UiTagMode = "positive" | "warning" | "negative" | "accent" | "neutral";

export interface UiTagProps {
  size?: UiTagSize;
  mode?: UiTagMode;
  text?: string;
  pointer?: boolean;
}
