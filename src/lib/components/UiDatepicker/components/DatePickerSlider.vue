<script lang="ts" setup>
  import { computed } from "vue";

  import { useDatePicker } from "../composables/useDatePicker";

  import { UiIcon } from "@/lib";
  interface DatePickerSliderProps {
    isShow?: boolean;
    disabled?: boolean;
  }
  const { isShow = true } = defineProps<DatePickerSliderProps>();
  const modelValue = defineModel<string[]>({ default: [] });
  const { dayjs, modelValueFormat, isFullMonthSelected } = useDatePicker(modelValue);
  const disableNextDayButton = computed(() => {
    return dayjs(modelValue.value[1]).isAfter(dayjs()) || dayjs().isSame(dayjs(modelValue.value[1]), "day");
  });
  function change(isPrev: boolean) {
    let dateFrom = "";
    let dateTo = "";
    const startDate = dayjs(modelValue.value[0]);
    const endDate = dayjs(modelValue.value[1]);

    if (isFullMonthSelected.value) {
      dateFrom = startDate.add(isPrev ? -1 : 1, "month").format(modelValueFormat.value);
      dateTo = endDate.add(isPrev ? -1 : 1, "month").format(modelValueFormat.value);
      dateTo = dayjs(dateTo).date(dayjs(dateTo).daysInMonth()).format(modelValueFormat.value);
    } else {
      const diffDays = endDate.diff(startDate, "day") || 1;
      dateFrom = startDate.add(isPrev ? -diffDays : diffDays, "day").format(modelValueFormat.value);
      dateTo = endDate.add(isPrev ? -diffDays : diffDays, "day").format(modelValueFormat.value);
      if (dayjs(dateTo).isAfter(dayjs())) {
        dateTo = dayjs().format(modelValueFormat.value);
      }
    }

    modelValue.value = [dateFrom, dateTo];
  }
</script>
<template>
  <div class="com-datepicker-slider">
    <button v-if="isShow" :disabled="disabled" class="com-datepicker-slider__btn" @click="change(true)">
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
