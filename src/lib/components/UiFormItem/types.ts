import { Ref } from "vue";

import { UiFormRules } from "../UiForm/types";

export interface UiFormItemProps {
  label?: string;
  name?: string;
  notation?: string;
  error?: string;
  id?:string 
}
export interface UiFormItemProvideData {
  model?: Record<string, string>;
  rules?: UiFormRules
  errors: Record<string, string[]>
  validateField: (value: string)=> void
  formSubmitCounts: Ref<number>
}
