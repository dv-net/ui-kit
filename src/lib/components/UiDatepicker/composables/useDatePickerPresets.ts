import { PresetModel, UiDatepickerRangeProps } from '../types';

import { computed } from 'vue';

import { useDatePicker } from '../composables/useDatePicker';

import { config } from '@/lib/config';

const { today, weekAgo, monthAgo, startOfMonth, quarterAgo, yearAgo } =
  useDatePicker();

export function useDatePickerPresets(params: {
  props: UiDatepickerRangeProps;
  beginDate: string;
}) {
  const presets = computed((): PresetModel[] => {
    return [
      {
        label: config.uiDatePicker.translations.presetToday,
        date: [today, today],
        id: 'day',
        slider: {
          type: 'day',
          count: 1,
        },
      },
      {
        label: config.uiDatePicker.translations.presetWeek,
        date: [weekAgo, today],
        id: 'week',
        slider: {
          type: 'day',
          count: 6,
        },
      },
      {
        label: config.uiDatePicker.translations.presetMonth,
        date: [
          params.props.monthPresetFromMonthStart ? startOfMonth : monthAgo,
          today,
        ],
        id: 'month',
        slider: {
          type: 'month',
          count: 1,
        },
      },
      {
        label: config.uiDatePicker.translations.presetQuarter,
        date: [quarterAgo, today],
        id: 'quarter',
        slider: {
          type: 'month',
          count: 3,
        },
      },
      {
        label: config.uiDatePicker.translations.presetYear,
        date: [yearAgo, today],
        id: 'year',
        slider: {
          type: 'year',
          count: 1,
        },
      },
      {
        label: config.uiDatePicker.translations.presetAllTime,
        date: [params.beginDate, today],
        id: 'all-time',
      },
    ];
  });

  return { presets };
}
