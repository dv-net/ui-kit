<script lang="ts" setup>
  import { computed, ref, watch } from "vue";

  import { useDatePicker } from "../composables/useDatePicker";
  import { PresetModel } from "../types";
  const { dayjs, today, weekAgo, monthAgo, quarterAgo, yearAgo } = useDatePicker();
  import { config } from "@/lib/config";
  interface DatePickerPresetProps {
    date: string[];
    beginDate: string;
  }
  const props = defineProps<DatePickerPresetProps>();

  const emits = defineEmits(["change"]);

  const activePreset = ref<PresetModel | null>(null);
  const presets = computed<PresetModel[]>(() => {
    return [
      {
        label: config.uiDatePicker.translations.presetToday,
        date: [today, today],
        id: "day",
        slider: {
          type: "day",
          count: 1
        }
      },
      {
        label: config.uiDatePicker.translations.presetWeek,
        date: [weekAgo, today],
        id: "week",
        slider: {
          type: "day",
          count: 6
        }
      },
      {
        label: config.uiDatePicker.translations.presetMonth,
        date: [monthAgo, today],
        id: "month",
        slider: {
          type: "month",
          count: 1
        }
      },
      {
        label: config.uiDatePicker.translations.presetQuarter,
        date: [quarterAgo, today],
        id: "quarter",
        slider: {
          type: "month",
          count: 3
        }
      },
      {
        label: config.uiDatePicker.translations.presetYear,
        date: [yearAgo, today],
        id: "year",
        slider: {
          type: "year",
          count: 1
        }
      },
      {
        label: config.uiDatePicker.translations.presetAllTime,
        date: [props.beginDate, today],
        id: "all-time"
      }
    ];
  });

  function checkCurrentPreset(date: string[]) {
    activePreset.value =
      presets.value.find((item) => {
        return dayjs(item.date[0]).isSame(date[0], "day") && dayjs(item.date[1]).isSame(date[1], "day");
      }) ?? null;
  }

  function change(preset: PresetModel) {
    activePreset.value = preset;
    emits("change", preset);
  }

  watch(
    () => props.date,
    () => {
      checkCurrentPreset(props.date);
    },
    { immediate: true }
  );
</script>
<template>
  <div class="com-datepicker-presets">
    <div class="com-datepicker-presets--buttons">
      <button
        v-for="preset in presets"
        :key="preset.id"
        @click="change(preset)"
        :class="{ active: activePreset?.id === preset.id }"
        mode="neutral"
        size="sm"
      >
        {{ preset.label }}
      </button>
    </div>
  </div>
</template>
<style lang="scss">
  .com-datepicker-presets {
    overflow: hidden;
    margin-bottom: 24px;

    &--buttons {
      display: flex;
      gap: 8px;
      -ms-overflow-style: none;
      overflow-y: auto;
      scrollbar-width: none;

      button {
        display: inline-flex;
        height: 30px;
        align-items: center;
        padding: 0 16px;
        border: 1px solid var(--color-separator-border-primary);
        border-radius: 4px;
        background-color: #fff;
        color: var(--color-text-primary);
        cursor: pointer;
        font-family: inherit;
        font-size: 14px;
        line-height: 30px;
        transition: var(--transition);
        white-space: nowrap;

        &.active,
        &:hover {
          background-color: var(--color-background-tertiary);
        }
      }
    }
  }
</style>
