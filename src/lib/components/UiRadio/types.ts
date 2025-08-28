export type UiRadioSize = "sm" | "md";
export interface UiRadioProps {
  size?: UiRadioSize;
  value: string | number;
  disabled?: boolean;
}
