export interface UiSwitchProps {
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  text?: string;
  textPositionRight?: boolean;
  beforeChange?: () => Promise<boolean>;
}
