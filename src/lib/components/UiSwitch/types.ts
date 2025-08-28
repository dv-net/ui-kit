export interface UiSwitchProps {
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  text?: string;
  beforeChange?: () => Promise<boolean>;
}
