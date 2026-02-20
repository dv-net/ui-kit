<script lang="ts" setup>
  import { UiDatepickerRangeProps } from "@/lib/components/UiDatepicker/types";

  import DatePickerInput from "./DatePickerInput.vue";

  import { useWindowSize } from "@vueuse/core";
  import { computed, ref, watch } from "vue";

  import { useDatePicker } from "../composables/useDatePicker";

  import { config } from "@/lib/config";
  const emits = defineEmits(["submit", "change"]);
  const { single, minDate, maxDate } = defineProps<Pick<UiDatepickerRangeProps, "single" | "minDate" | "maxDate">>();
  const processingData = defineModel<string[]>("model-value", { default: [] });
  const { dayjs, inputFormat, modelValueFormat } = useDatePicker();
  const errors = ref<boolean[]>([false, false]);

  const { width } = useWindowSize();
  const startDate = ref("");
  const endDate = ref("");
  const maska = computed(() => inputFormat.value.replace(/\w/g, "#"));
  const placeholder = computed(() => dayjs().format(inputFormat.value));
  function update(date: string, isStart: boolean) {
    const isValid =
      dayjs(date, inputFormat.value).isValid() &&
      (!minDate || dayjs(date, inputFormat.value).isAfter(dayjs(minDate).add(-1, "day"), "day")) &&
      (!maxDate || dayjs(date, inputFormat.value).isBefore(dayjs(maxDate).add(1, "day"), "day"));

      console.log(123, date, dayjs(date, inputFormat.value).isValid(), inputFormat.value, dayjs(date, inputFormat.value).day())

    if (isStart && date.length === 10) {
      errors.value[0] =
        (!single && dayjs(date, inputFormat.value).isAfter(dayjs(endDate.value, inputFormat.value), "day")) || !isValid;
      if (!errors.value[0]) {
        processingData.value[0] = dayjs(date, inputFormat.value).format(modelValueFormat.value);
        emits("change");
      }
    } else {
      errors.value[0] = false;
    }

    if (!isStart && date.length === 10) {
      errors.value[1] =
        dayjs(date, inputFormat.value).isBefore(dayjs(startDate.value, inputFormat.value), "day") || !isValid;
      if (!errors.value[1]) {
        processingData.value[1] = dayjs(date, inputFormat.value).format(modelValueFormat.value);
        emits("change");
      }
    } else {
      errors.value[1] = false;
    }
  }
  watch(
    processingData,
    () => {
      startDate.value = dayjs(processingData.value[0]).format(inputFormat.value);
      endDate.value = dayjs(processingData.value[1]).format(inputFormat.value);
    },
    { immediate: true }
  );
</script>
<template>
  <div class="com-datepicker-inputs">
    <form class="com-datepicker-inputs--form" @submit.prevent>
      <DatePickerInput
        :label="width < 1000 ? config.uiDatePicker.translations.inputLabelStart : ''"
        :isError="errors[0]"
        @input="(e) => update(e, true)"
        :placeholder="placeholder"
        :maska="maska"
        v-model="startDate"
        :autofocus="single"
      />

      <template v-if="!single">
        <div class="com-datepicker-inputs--form__divider" />

        <DatePickerInput
          :label="width < 1000 ? config.uiDatePicker.translations.inputLabelEnd : ''"
          :isError="errors[1]"
          @input="(e) => update(e, false)"
          :placeholder="placeholder"
          :maska="maska"
          v-model="endDate"
        />
      </template>
    </form>
  </div>
</template>
<style lang="scss">
  .com-datepicker-inputs {
    margin-bottom: 16px;

    &--form {
      display: flex;
      align-items: center;
      gap: 8px;

      @media (width <= 1000px) {
        flex-direction: column;
        gap: 16px;
      }

      &__divider {
        width: 16px;
        height: 1px;
        background-color: var(--color-separator-border-contrast);

        @media (width <= 1000px) {
          display: none;
        }
      }
    }
  }
</style>
