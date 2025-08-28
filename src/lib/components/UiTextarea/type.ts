export type UiTextareaSize = "md" | "lg" | "auto";

export interface UiTextareaProps {
  maxLength?: string;
  isDisabled?: boolean;
  placeholder?: string;
  label?: string;
  size?: UiTextareaSize;
  filled?: boolean;
  error?: boolean;
  disabled?: boolean;
  isEmptyValueNull?: boolean;
  copy?: boolean;
  id?: string;
  readonly?: boolean;
  rows?: number;
}
