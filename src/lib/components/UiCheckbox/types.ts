export type UiCheckboxSize = "sm" | "md";
export interface UiCheckboxProps {
  size?: UiCheckboxSize;
  disabled?: boolean;
  indeterminate?: boolean;
  value?: string | number;
  isSelectedAll?: boolean; // true - if needed "Select all" start inside UiCheckboxGroup
}
