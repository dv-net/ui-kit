import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { computed, type Ref } from "vue";

import "dayjs/locale/zh";
import "dayjs/locale/uk";
import "dayjs/locale/ru";
import "dayjs/locale/ja";
import "dayjs/locale/it";
import "dayjs/locale/fr";
import "dayjs/locale/es";
import "dayjs/locale/de";
import "dayjs/locale/ar";

import { config } from "@/lib/config";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale(config.locale);

export function useDatePicker(modelValue?: Ref<string[]>) {
  const today = dayjs().format();
  const yesterday = dayjs().add(-1, "day").format();
  const weekAgo = dayjs().add(-6, "day").format();
  const startOfMonth = dayjs().startOf('month').format();
  const startOfYear = dayjs().startOf('year').format();
  const quarterAgo = dayjs().add(-3, "month").add(1, "day").format();
  const modelValueFormat = computed(() => config.uiDatePicker.modelValueFormat);
  const inputFormat = computed(() => config.uiDatePicker.inputFormat);
  const beginDate = computed(() => dayjs(config.uiDatePicker.beginDate).format());
  const startDate = computed(() => (modelValue?.value[0] ? dayjs(modelValue?.value[0]) : null));
  const endDate = computed(() => (modelValue?.value[1] ? dayjs(modelValue?.value[1]) : null));

  function checkIsValidDate() {
    const dateFromIsValid = dayjs(modelValue?.value[0], modelValueFormat.value).isValid();
    const dateToFromIsValid = dayjs(modelValue?.value[1], modelValueFormat.value).isValid();
    if (modelValue?.value.length && (!dateFromIsValid || !dateToFromIsValid)) {
      console.error(`Date must be in format ${modelValueFormat.value}`);
      return false;
    }
    return true;
  }

  return {
    today,
    yesterday,
    weekAgo,
    startOfMonth,
    startOfYear,
    dayjs,
    modelValueFormat,
    inputFormat,
    quarterAgo,
    beginDate,
    startDate,
    endDate,

    checkIsValidDate
  };
}
