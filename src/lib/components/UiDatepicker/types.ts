import { ManipulateType } from "dayjs";

export type DatepickerSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface UiDatepickerRangeProps {
  disabled?: boolean;
  beginDate?: string | null;
  size?: DatepickerSize;
  clearable?: boolean;
  autoApply?: boolean;
  maxDate?: string;
  minDate?: string;
  monthPresetFromMonthStart?: boolean;
}

export interface PresetModel {
  label: string;
  date: string[];
  id: string;
  slider?: {
    type: ManipulateType;
    count: number;
  };
}
