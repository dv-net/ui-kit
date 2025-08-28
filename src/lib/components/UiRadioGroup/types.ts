import { ComputedRef, Ref } from "vue";

import { UiRadioSize } from "../UiRadio/types";

export interface UiRadioGroupProps {
  disabled?: boolean;
  size?: UiRadioSize;
}

export interface UiRadioGroupProvideData {
  modelValue: Ref<string | number>;
  disabled?: ComputedRef<boolean>;
  change: (value: string | number) => void;
  size?: ComputedRef<UiRadioSize>;
}
