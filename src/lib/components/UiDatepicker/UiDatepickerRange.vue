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
  import { useDatePickerSelected } from "@/lib/components/UiDatepicker/composables/useDatePickerSelected";
  import { PresetModel, UiDatepickerRangeProps } from "@/lib/components/UiDatepicker/types";
  import { config } from "@/lib/config";

  const props = withDefaults(defineProps<UiDatepickerRangeProps>(), { size: "xs", range: true });

  const modelValue = defineModel<string[]>({ default: [] });
  const { width } = useWindowSize();
  const { dayjs, today, endDate, startDate, beginDate, modelValueFormat } = useDatePicker(modelValue);

  const pickerRef = ref();
  const processingData = ref<string[]>(["", ""]);
  const isDisabledBtn = ref(false);
  const formatingBeginDate = computed(() =>
    props.beginDate ? dayjs(props.beginDate).format(modelValueFormat.value) : null
  );
  const currentMaxDate = computed(() => props.maxDate ?? today);
  const currentMinDate = computed(() => props.minDate);

  const { presets } = useDatePickerPresets({ beginDate: formatingBeginDate.value ?? beginDate.value });

  const { isAllTimeSelected, selectedDate, selectedRange } = useDatePickerSelected({
    presets,
    startDate,
    endDate,
    minDate: currentMinDate,
    maxDate: currentMaxDate
  });

  function updatePresetHandler(preset: PresetModel) {
    updateModelValue(preset.date);
    pickerRef.value.closeMenu();
  }

  function updateIternalValue(date: string | string[]) {
    if (!date) return;

    const currentDate = Array.isArray(date) ? date : [date, date];

    isDisabledBtn.value = date.length < 2;
    if (currentDate.length === 2) {
      processingData.value = currentDate;
    }
  }

  function setModelValue(date: string[]) {
    modelValue.value = [dayjs(date[0]).format(modelValueFormat.value), dayjs(date[1]).format(modelValueFormat.value)];
  }

  function updateModelValue(date: string | string[]) {
    const currentDate = Array.isArray(date) ? date : [date, date];

    if (startDate.value && endDate.value) {
      const isSame = startDate.value.isSame(currentDate[0], "day") && endDate.value.isSame(currentDate[1], "day");
      if (!isSame) {
        setModelValue(currentDate);
      }
    } else {
      setModelValue(currentDate);
    }
  }

  function changeInputsHandler() {
    const currentData = props.range
      ? processingData.value
      : dayjs(processingData.value[0], config.uiDatePicker.modelValueFormat).toDate();

    pickerRef.value?.updateInternalModelValue(currentData);
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
    <DatePickerSlider
      :disabled="!modelValue.length || isAllTimeSelected"
      v-model="modelValue"
      :selected-range="selectedRange"
    >
      <VueDatePicker
        position="center"
        :locale="config.locale"
        ref="pickerRef"
        :model-value="range ? modelValue : modelValue[0]"
        :enable-time-picker="false"
        :range="range"
        :multi-calendars="range && width > 1000"
        month-name-format="long"
        :max-date="currentMaxDate"
        :min-date="currentMinDate"
        :auto-apply="autoApply"
        :offset="0"
        @update:model-value="updateModelValue"
        @internal-model-change="updateIternalValue"
      >
        <template #left-sidebar>
          <DatePickerPresets
            v-if="range && presets.length"
            :presets="presets"
            :date="processingData"
            @change="updatePresetHandler"
          />

          <DatePickerInputs
            @change="changeInputsHandler"
            @submit="pickerRef.selectDate()"
            v-model="processingData"
            :range="range"
          />
        </template>

        <template #trigger>
          <slot
            v-if="$slots.trigger"
            name="trigger"
            :date="modelValue"
            :presets="presets"
            :selected-date="selectedDate"
          />

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

            <span class="ui-datepicker__navigate-value">
              {{ months?.find((item) => item.value === month)?.text }}
            </span>

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
