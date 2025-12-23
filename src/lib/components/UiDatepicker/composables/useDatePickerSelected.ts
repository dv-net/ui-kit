import { PresetModel } from "../types";
import { DatepickerSwapRange } from "@/lib/components/UiDatepicker/types";

import dayjs, { type Dayjs } from "dayjs";

import { computed, type ComputedRef } from "vue";

import { useDatePicker } from "../composables/useDatePicker";

import { config } from "@/lib/config";

export function useDatePickerSelected(params: {
  presets: ComputedRef<PresetModel[]>;
  startDate: ComputedRef<Dayjs | null>;
  endDate: ComputedRef<Dayjs | null>;
  minDate: ComputedRef<string | undefined>;
  maxDate: ComputedRef<string | undefined>;
}) {
  const { checkIsValidDate } = useDatePicker();

  const selectedPreset = computed(() => {
    if (!params.startDate || !params.endDate) return;

    return params.presets.value.find((preset) => {
      return (
        dayjs(preset.date[0]).isSame(params.startDate.value, "day") &&
        dayjs(preset.date[1]).isSame(params.endDate.value, "day")
      );
    });
  });

  const isAllTimeSelected = computed(() => selectedPreset.value?.id === "all-time");
  const isMonthSelected = computed(() => selectedPreset.value?.id === "month");
  const isYearSelected = computed(() => selectedPreset.value?.id === "year");

  const selectedRange = computed((): DatepickerSwapRange | undefined => {
    if (!params.startDate.value || !params.endDate.value) return;

    const isSameMonth = params.startDate.value.isSame(params.endDate.value, "month");
    const isSameYear = params.startDate.value.isSame(params.endDate.value, "year");

    const isWeekSelected = params.endDate.value.diff(params.startDate.value, "days") === 6;

    if (isWeekSelected) {
      return "week";
    }

    const isMonth =
      isMonthSelected.value ||
      (isSameMonth &&
        isSameYear &&
        (params.startDate.value.isSame(params.startDate.value.startOf("month"), "day") ||
          (params.minDate.value && params.startDate.value.isSame(dayjs(params.minDate.value), "day"))) &&
        (params.endDate.value.isSame(params.endDate.value.endOf("month"), "day") ||
          (params.maxDate.value && params.endDate.value.isSame(dayjs(params.maxDate.value), "day")) ||
          params.endDate.value.isSame(dayjs(), "day")));

    if (isMonth) {
      return "month";
    }

    const isYear =
      isYearSelected.value ||
      (isSameYear &&
        (params.startDate.value.isSame(params.startDate.value.startOf("year"), "day") ||
          (params.minDate.value && params.startDate.value.isSame(dayjs(params.minDate.value), "day"))) &&
        (params.endDate.value.isSame(params.endDate.value.endOf("year"), "day") ||
          params.endDate.value.isSame(dayjs(params.maxDate.value), "day") ||
          params.endDate.value.isSame(dayjs(), "day")));

    if (isYear) {
      return "year";
    }
  });

  const formattedSelectedDate = computed(() => {
    if (!checkIsValidDate() || !params.startDate.value || !params.endDate.value) {
      return [];
    }

    return [params.startDate.value, params.endDate.value].map((date) =>
      dayjs(date, config.uiDatePicker.modelValueFormat).format(config.uiDatePicker.inputFormat)
    );
  });

  const selectedDate = computed(() => {
    if (!checkIsValidDate()) {
      return config.uiDatePicker.translations.invalidDate;
    }

    if (!params.startDate.value || !params.endDate.value) {
      return config.uiDatePicker.translations.emptyPlaceholder;
    }

    const isSameDays = params.endDate.value.isSame(params.startDate.value, "day");
    const isYesterday =
      params.startDate.value.isSame(dayjs().subtract(1, "day").startOf("day"), "day") &&
      params.endDate.value.isSame(dayjs().subtract(1, "day").startOf("day"), "day");
    const isSameMonth = params.startDate.value.isSame(params.endDate.value, "month");
    const isSameYear = params.startDate.value.isSame(params.endDate.value, "year");

    const dateFrom = params.startDate.value.locale(config.locale);
    const dateTo = params.endDate.value.locale(config.locale);

    if (selectedPreset.value) {
      return selectedPreset.value.label;
    }

    if (selectedRange.value === "year") {
      return `${dateFrom.format("YYYY")} ${config.uiDatePicker.translations.yearLabelSuffix}`;
    }

    if (isYesterday) {
      return config.uiDatePicker.translations.yesterdayPlaceholder;
    }

    if (isSameDays) {
      return dateFrom.format("DD MMM YY");
    }

    if (selectedRange.value === "month") {
      return dateFrom.format("MMMM YYYY");
    }

    if (isSameMonth) {
      return `${dateFrom.format("DD")} - ${dateTo.format("DD")} ${dateTo.format("MMM YYYY")}`;
    }

    if (isSameYear) {
      return `${dateFrom.format("DD MMM")} - ${dateTo.format("DD MMM")} ${dateTo.format("YYYY")}`;
    }

    return `${dateFrom.format("DD MMM YY")} - ${dateTo.format("DD MMM YY")}`;
  });

  return { selectedPreset, formattedSelectedDate, isAllTimeSelected, selectedRange, selectedDate };
}
