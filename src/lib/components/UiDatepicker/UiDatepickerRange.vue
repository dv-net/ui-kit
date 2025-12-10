<script lang="ts" setup>
  import DatePickerInputs from "@/lib/components/UiDatepicker/components/DatePickerInputs.vue";
  import DatePickerPresets from "@/lib/components/UiDatepicker/components/DatePickerPresets.vue";
  import DatePickerSlider from "@/lib/components/UiDatepicker/components/DatePickerSlider.vue";
  import UiIconButton from "@/lib/components/UiIconButton/UiIconButton.vue";

  import VueDatePicker from "@vuepic/vue-datepicker";
  import { useWindowSize } from "@vueuse/core";
  import { computed, onMounted, ref } from "vue";

  import "@vuepic/vue-datepicker/dist/main.css";
  import { UiButton, UiIcon } from "@/lib";
  import { useDatePicker } from "@/lib/components/UiDatepicker/composables/useDatePicker";
  import { useDatePickerPresets } from "@/lib/components/UiDatepicker/composables/useDatePickerPresets";
  import { PresetModel, UiDatepickerRangeProps } from "@/lib/components/UiDatepicker/types";
  import { config } from "@/lib/config";

  const props = withDefaults(defineProps<UiDatepickerRangeProps>(), { size: "xs" });

  const modelValue = defineModel<string[]>({ default: [] });
  const { width } = useWindowSize();
  const { dayjs, checkIsValidDate, today, endDate, startDate, beginDate, isFullMonthSelected, modelValueFormat } =
    useDatePicker(modelValue);

  const pickerRef = ref();
  const processingData = ref<string[]>(["", ""]);
  const isDisabledBtn = ref(false);
  const formatingBeginDate = computed(() =>
    props.beginDate ? dayjs(props.beginDate).format(modelValueFormat.value) : null
  );
  const currentMaxDate = computed(() => props.maxDate ?? today);
  const currentMinDate = computed(() => props.minDate);

  const { presets } = useDatePickerPresets({ props, beginDate: formatingBeginDate.value ?? beginDate.value });

  const selectedDate = computed(() => {
    if (!checkIsValidDate()) {
      return config.uiDatePicker.translations.invalidDate;
    }
    if (!startDate.value || !endDate.value) {
      return config.uiDatePicker.translations.emptyPlaceholder;
    }

    const isToday = endDate.value.isSame(dayjs(), "day") && startDate.value.isSame(dayjs(), "day");
    const isYesterday =
      startDate.value.isSame(dayjs().subtract(1, "day").startOf("day"), "day") &&
      endDate.value.isSame(dayjs().subtract(1, "day").startOf("day"), "day");
    const isCurrentYear = startDate.value.isSame(endDate.value, "year");
    const isCurrentMonth = startDate.value.isSame(endDate.value, "month");
    const dateFrom = startDate.value.locale(config.locale);
    const dateTo = endDate.value.locale(config.locale);

    if (isToday) {
      return config.uiDatePicker.translations.todayPlaceholder;
    }

    if (isYesterday) {
      return config.uiDatePicker.translations.yesterdayPlaceholder;
    }

    if (isFullMonthSelected.value) {
      return dateFrom.format("MMMM YYYY");
    }

    if (isCurrentMonth) {
      return `${dateFrom.format("DD")} - ${dateTo.format("DD")} ${dateTo.format("MMM YYYY")}`;
    }
    
    if (isCurrentYear) {
      return `${dateFrom.format("DD MMM")} - ${dateTo.format("DD MMM")} ${dateTo.format("YYYY")}`;
    }

    return `${dateFrom.format("DD MMM YY")} - ${dateTo.format("DD MMM YY")}`;
  });

  function updatePresetHandler(preset: PresetModel) {
    updateModelValue(preset.date);
    pickerRef.value.closeMenu();
  }

  function updateIternalValue(date: string[]) {
    if (!date) return;
    isDisabledBtn.value = date.length < 2;
    if (date.length === 2) {
      processingData.value = date;
    }
  }

  function setModelValue(date: string[]) {
    modelValue.value = [dayjs(date[0]).format(modelValueFormat.value), dayjs(date[1]).format(modelValueFormat.value)];
  }

  function updateModelValue(date: string[]) {
    if (startDate.value && endDate.value) {
      const isSame = startDate.value.isSame(date[0], "day") && endDate.value.isSame(date[1], "day");
      if (!isSame) {
        setModelValue(date);
      }
    } else {
      setModelValue(date);
    }
  }

  function changeInputsHandler() {
    pickerRef.value?.updateInternalModelValue(processingData.value);
    pickerRef.value?.setMonthYear({
      month: dayjs(processingData.value[0]).month(),
      year: dayjs(processingData.value[0]).year()
    });
  }

  const clearDate = () => {
    modelValue.value = [];
    processingData.value = ["", ""];
    isDisabledBtn.value = true;
    pickerRef.value?.closeMenu();
  };

  onMounted(() => {
    if (!modelValue.value.length) {
      isDisabledBtn.value = true;
    }
  });
</script>
<template>
  <div class="ui-datepicker-range" :class="[size, { 'is-disabled': disabled }]">
    <DatePickerSlider :disabled="!modelValue.length" v-model="modelValue">
      <VueDatePicker
        position="center"
        :locale="config.locale"
        ref="pickerRef"
        :model-value="modelValue"
        :enable-time-picker="false"
        range
        :multi-calendars="width > 1000"
        month-name-format="long"
        :max-date="currentMaxDate"
        :min-date="currentMinDate"
        :auto-apply="autoApply"
        :offset="0"
        @update:model-value="updateModelValue"
        @internal-model-change="updateIternalValue"
        
      >
        <template v-if="presets.length" #left-sidebar>
          <DatePickerPresets
            :presets="presets"
            :date="processingData"
            @change="updatePresetHandler"
          />
          <DatePickerInputs @change="changeInputsHandler" @submit="pickerRef.selectDate()" v-model="processingData" />
        </template>
        <template #trigger>
          <slot v-if="$slots.trigger" name="trigger" :date="modelValue" :presets="presets" :selected-date="selectedDate" />
          <button v-else class="ui-datepicker__trigger">
            <UiIcon type="400" name="calendar-month" />{{ selectedDate }}
          </button>
        </template>
        <template #month-year="{ month, months, handleMonthYearChange }">
          <div class="ui-datepicker__navigate">
            <UiIconButton
              @click="handleMonthYearChange && handleMonthYearChange(false)"
              icon-type="400"
              size="lg"
              icon-name="chevron-left 1"
              no-size
            />
            <span class="ui-datepicker__navigate-value">{{ months?.find((item) => item.value === month)?.text }}</span>
            <UiIconButton
              @click="handleMonthYearChange && handleMonthYearChange(true)"
              icon-type="400"
              size="lg"
              icon-name="chevron-right"
              no-size
            />
          </div>
        </template>
        <template #action-row="{ disabled, selectDate }">
          <UiButton :disabled="isDisabledBtn || disabled" mode="neutral" @click="selectDate">
            {{ config.uiDatePicker.translations.applyButton }}
          </UiButton>
          <UiButton v-if="modelValue.length && clearable" type="secondary" @click="clearDate">
            {{ config.uiDatePicker.translations.clearButton }}
          </UiButton>
        </template>
      </VueDatePicker>
    </DatePickerSlider>
  </div>
</template>
<style lang="scss">
  @use "./style/index";
</style>
