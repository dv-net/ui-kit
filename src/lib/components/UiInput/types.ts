export type InputSize = "sm" | "md" | "lg" | "xl";
export interface InputProps {
  isDisabled?: boolean;
  placeholder?: string;
  label?: string;
  size?: InputSize;
  filled?: boolean;
  error?: boolean;
  disabled?: boolean;
  inside?: boolean;
  type?: string;
  readonly?: boolean;
  autofocus?: boolean;
  clearable?: boolean;
  isEmptyValueNull?: boolean;
  id?: string;
  indexTab?: string;
  autocomplete?: string;
  showPassword?: boolean;
  name?: string;
  step?: string;
}
