<script lang="ts" setup>
  import { DatepickerSwapRange } from "@/lib/components/UiDatepicker/types";
  import { Dayjs } from "dayjs";

  import { computed } from "vue";

  import { useDatePicker } from "../composables/useDatePicker";
import { config } from "@/lib/config";

  import { UiIcon } from "@/lib";
  interface DatePickerSliderProps {
    isShow?: boolean;
    disabled?: boolean;
    selectedRange?: DatepickerSwapRange;
    minDate?: string;
    maxDate: string;
    enableTimePicker?: boolean;
  }

  const { minDate, maxDate, isShow = true, selectedRange, enableTimePicker = false } = defineProps<DatePickerSliderProps>();

  const modelValue = defineModel<string[]>({ default: [] });

  const { dayjs, modelValueFormat } = useDatePicker(modelValue);
  const effectiveFormat = computed(() =>
    enableTimePicker ? config.uiDatePicker.modelValueFormatTime : modelValueFormat.value
  );

  const availableDates = computed(() => {
    return {
      min: minDate ? dayjs(minDate) : undefined,
      max: maxDate ? dayjs(maxDate) : undefined
    };
  });

  const rangeDates = computed(() => {
    return {
      start: dayjs(modelValue.value[0]),
      end: dayjs(modelValue.value[1])
    };
  });

  const disableNextDayButton = computed(() => {
    if (!availableDates.value.max) return;

    return (
      rangeDates.value.end.isAfter(availableDates.value.max) ||
      availableDates.value.max.isSame(rangeDates.value.end, "day")
    );
  });

  const disablePrevDayButton = computed(() => {
    if (!availableDates.value.min) return;

    return (
      rangeDates.value.start.isBefore(availableDates.value.min) ||
      availableDates.value.min.isSame(rangeDates.value.start, "day")
    );
  });

  function change(isPrev: boolean) {
    let diff = rangeDates.value.end.diff(rangeDates.value.start, "day") || 1;

    let dateFrom: Dayjs | undefined = undefined;
    let dateTo: Dayjs | undefined = undefined;

    if (selectedRange) {
      dateFrom = rangeDates.value.start.add(isPrev ? -1 : 1, selectedRange);

      dateTo = rangeDates.value.end.add(isPrev ? -1 : 1, selectedRange);

      if (["month", "year"].includes(selectedRange)) {
        if (!isPrev) {
          dateFrom = dateFrom.startOf(selectedRange);

          dateTo = dateFrom.endOf(selectedRange);
        } else {
          dateFrom = dateTo.startOf(selectedRange);

          dateTo = dateTo.endOf(selectedRange);
        }
      }
    } else {
      dateFrom = rangeDates.value.start.add(isPrev ? -diff : diff, "day");

      dateTo = rangeDates.value.end.add(isPrev ? -diff : diff, "day");
    }

    if (availableDates.value.min && dateFrom.isBefore(availableDates.value.min)) {
      dateFrom = availableDates.value.min;
    }

    if (availableDates.value.max && dateTo.isAfter(availableDates.value.max)) {
      dateTo = availableDates.value.max;
    }

    modelValue.value = [dateFrom?.format(effectiveFormat.value) || "", dateTo?.format(effectiveFormat.value) || ""];
  }
</script>

<template>
  <div class="com-datepicker-slider">
    <button
      v-if="isShow"
      :disabled="disablePrevDayButton || disabled"
      class="com-datepicker-slider__btn"
      @click="change(true)"
    >
      <UiIcon type="400" name="chevron-left 1" />
    </button>

    <slot />

    <button
      v-if="isShow"
      :disabled="disableNextDayButton || disabled"
      class="com-datepicker-slider__btn"
      @click="change(false)"
    >
      <UiIcon type="400" name="chevron-right" />
    </button>
  </div>
</template>

<style lang="scss">
  .com-datepicker-slider {
    display: flex;

    &__btn {
      display: flex;
      width: 32px;
      height: 32px;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--color-separator-border-primary);
      border-radius: 8px 0 0 8px;
      background: #fff;
      cursor: pointer;
      transition: var(--transition);

      &:last-child {
        border-radius: 0 8px 8px 0;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.8;
      }

      &:not(:disabled):hover {
        color: var(--color-icon-secondary);
      }
    }
  }
</style>
