import { ComputedRef, Ref } from "vue";

import { UiRadioSize } from "../UiRadio/types";

export interface UiCheckboxGroupProps {
  disabled?: boolean;
  size?: UiRadioSize;
}

export interface UiCheckboxGroupProvideData {
  modelValue: Ref<Array<string | number>>;
  disabled?: ComputedRef<boolean>;
  change: (value: string | number) => void;
  size?: ComputedRef<UiRadioSize>;
}
