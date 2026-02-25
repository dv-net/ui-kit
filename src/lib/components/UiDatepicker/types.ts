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
  timezone?: string;
  single?: boolean;
  hideSliderArrows?: boolean;
  enableTimePicker?: boolean;
}

export type DatepickerSwapRange = "week" | "month" | "year";

export interface PresetModel {
  label: string;
  date: string[];
  id: string;
  slider?: {
    type: ManipulateType;
    count: number;
  };
}
