<script lang="ts" setup>
  import { ref, watch } from "vue";

  import { useDatePicker } from "../composables/useDatePicker";
  import { PresetModel } from "../types";
  const { dayjs } = useDatePicker();

  interface DatePickerPresetProps {
    date: string[];
    presets: PresetModel[];
  }
  const props = defineProps<DatePickerPresetProps>();

  const emits = defineEmits(["change"]);

  const activePreset = ref<PresetModel | null>(null);

  function checkCurrentPreset(date: string[]) {
    activePreset.value =
      props.presets.find((item) => {
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
