<script lang="ts" setup>
  import { DatepickerSwapRange } from "@/lib/components/UiDatepicker/types";
  import { Dayjs } from "dayjs";

  import { computed } from "vue";

  import { useDatePicker } from "../composables/useDatePicker";

  import { UiIcon } from "@/lib";
  interface DatePickerSliderProps {
    isShow?: boolean;
    disabled?: boolean;
    selectedRange?: DatepickerSwapRange;
    minDate?: string;
    maxDate: string;
  }
  const { minDate, maxDate, isShow = true, selectedRange } = defineProps<DatePickerSliderProps>();
  const modelValue = defineModel<string[]>({ default: [] });
  const { dayjs, modelValueFormat } = useDatePicker(modelValue);
  const disableNextDayButton = computed(() => {
    const date = dayjs(modelValue.value[1]);

    return (
      date.isAfter(dayjs(maxDate)) ||
      dayjs(maxDate).isSame(date, "day") ||
      date.add(1, selectedRange || "day").isAfter(dayjs(maxDate))
    );
  });

  const disablePrevDayButton = computed(() => {
    const date = dayjs(modelValue.value[0]);

    return (
      date.isBefore(dayjs(minDate)) ||
      dayjs(minDate).isSame(date, "day") ||
      date.add(-1, selectedRange || "day").isAfter(dayjs(minDate))
    );
  });

  function change(isPrev: boolean) {
    const startDate = dayjs(modelValue.value[0]);
    const endDate = dayjs(modelValue.value[1]);

    let dateFrom: Dayjs | undefined = undefined;
    let dateTo: Dayjs | undefined = undefined;

    if (selectedRange) {
      dateFrom = startDate.add(isPrev ? -1 : 1, selectedRange);

      dateTo = endDate.add(isPrev ? -1 : 1, selectedRange);

      if (["month", "year"].includes(selectedRange)) {
        dateFrom = dateFrom.startOf(selectedRange);

        dateTo = dateFrom.endOf(selectedRange);
      }
    } else {
      const diff = endDate.diff(startDate, "day") || 1;

      dateFrom = startDate.add(isPrev ? -diff : diff, "day");

      dateTo = endDate.add(isPrev ? -diff : diff, "day");
    }

    if (dayjs(dateTo).isAfter(dayjs())) {
      dateTo = dayjs();
    }

    modelValue.value = [dateFrom?.format(modelValueFormat.value) || "", dateTo?.format(modelValueFormat.value) || ""];
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
