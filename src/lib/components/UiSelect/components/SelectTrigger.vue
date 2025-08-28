<script lang="ts" setup>
  import { UiIconSize } from "../../UiIcon/types";
  import { SelectType } from "../types";

  import { UiIcon } from "@/lib";
  interface UiSelectTriggerProps {
    isActive: boolean;
    type: SelectType;
    placeholder: string | undefined;
    clearable: boolean;
    isHasValue: boolean;
    chevronName: string;
    chevronColor: string;
    chevronSize: UiIconSize;
  }
  defineEmits(["clear"]);
  withDefaults(defineProps<UiSelectTriggerProps>(), {});
</script>

<template>
  <div class="ui-select__inner">
    <div class="ui-select__text-block">
      <div v-if="placeholder" class="ui-select__placeholder-wrapper">
        <p class="ui-select__placeholder">
          <span class="ui-select__placeholder-inner">
            <span> {{ placeholder }}</span>
          </span>
        </p>
      </div>
      <div class="ui-select__value">
        <slot />
      </div>
    </div>
    <div class="ui-select__controls">
      <Transition name="fade">
        <div v-if="clearable && isHasValue" class="ui-select__clear">
          <UiIcon size="md" color="var(--color-icon-tertiary)" @click.stop="$emit('clear')" name="close" type="400" />
        </div>
      </Transition>
      <UiIcon class="ui-select__chevron" :size="chevronSize" :name="chevronName" type="400" :color="chevronColor" />
    </div>
  </div>
</template>
