export interface UiFormProps {
  model?: Record<string, string | unknown>;
  rules?: UiFormRules;
}

export interface UiFormRules {
  [key: string]: UiFormRule[];
}

export interface UiFormRule {
  required?: boolean;
  min?: number;
  max?: number;
  email?: boolean;
  validator?: () => boolean;
  message: string;
}
