<script setup lang="ts" generic="ModelValue, Options">
  import UiLoading from "../UiLoading/UiLoading.vue";
  import SelectList from "./components/SelectList.vue";
  import SelectListItem from "./components/SelectListItem.vue";
  import SelectSearch from "./components/SelectSearch.vue";
  import SelectTrigger from "./components/SelectTrigger.vue";
  import SelectVirtualList from "./components/SelectVirtualList.vue";

  import { computed, Ref, ref } from "vue";

  import { useKeyboard } from "./composables/useKeyboard";
  import { useMultiple } from "./composables/useMultiple";

  import { config, UiDropdown, UiIcon } from "@/lib";
  import { UiSelectProps } from "@/lib/components/UiSelect/types.ts";
  const emits = defineEmits(["change", "clear", "changeInfinityScroll", "search", "onClose"]);
  const props = withDefaults(defineProps<UiSelectProps<Options>>(), {
    valueKey: "value",
    labelKey: "label",
    options: () => [],
    size: "md",
    itemSize: "sm",
    fitContentWidth: true,
    isVirtualList: false,
    loading: false,
    customSearch: false,
    teleport: "body",
    countItemsForLazyLoad: 100,
    type: "outside",
    offset: 1,
    placement: "bottom",
    chevronName: "keyboard-arrow-down",
    chevronColor: "intherit",
    chevronSize: "md"
  });

  const modelValue = defineModel<ModelValue | null>({ default: null });
  const isOpen = defineModel<boolean>("isOpen", { default: false });
  const isFocus = ref(false);
  const search = ref("");
  const dropdownRef = ref();
  const inputRef = ref();

  const isDisabled = computed(() => props.disabled || props.readonly);
  const isOptionPrimitive = computed(() => {
    return props.options.length && typeof props.options[0] !== "object";
  });

  const showNoDataBlock = computed(() => {
    return config.uiSelect.translations.notFound && !filteredOptions.value.length;
  });

  const isHasValue = computed(() => {
    return Array.isArray(modelValue.value) ? !!modelValue.value.length : !!modelValue.value;
  });

  const selectedOptionLabel = computed(() => {
    if (props.multiple) {
      if (Array.isArray(modelValue.value) && modelValue.value.length) {
        return `${config.uiSelect.translations.multipleSelectedText} ${modelValue.value.length}`;
      }
    }
    const option = valToOption(modelValue.value);
    return isOptionPrimitive.value ? option : option?.[props.labelKey];
  });

  const filteredOptions = computed(() => {
    if (props.customSearch) {
      return props.options;
    }

    if (!search.value) {
      return props.options;
    }

    if (props.searchFn) {
      return props.searchFn(search.value);
    }

    return props.options.filter((option) => {
      const label = isOptionPrimitive.value ? option : option?.[props.labelKey];
      return String(label).toLowerCase().includes(search.value.toLowerCase());
    });
  });

  const { onKeydownDown, onKeydownEnter, onKeydownUp, navigatedIndex } = useKeyboard<Options>({
    isFocus: isFocus,
    checkOption: checkOption,
    filteredOptions: filteredOptions
  });

  const { setModelValueItem } = useMultiple(modelValue as Ref<string[]>);

  function checkOption(option: unknown) {
    if ((option as { disabled: boolean }).disabled) return;

    if (props.multiple && Array.isArray(modelValue.value)) {
      setModelValueItem(optionToVal(option));
    } else {
      modelValue.value = optionToVal(option);
      onBlur();
    }
    emits("change");
  }

  function isOptionChecked(option: unknown) {
    if (props.multiple && Array.isArray(modelValue.value)) {
      return modelValue.value.includes(optionToVal(option));
    } else {
      return modelValue.value === optionToVal(option);
    }
  }

  function isOptionDisabled(option: unknown) {
    return (option as { disabled: boolean }).disabled;
  }

  function optionToVal(option: unknown) {
    if (isOptionPrimitive.value || props.asObject) {
      return option;
    }
    return option?.[props.valueKey];
  }

  function valToOption(val: unknown) {
    if (!val) {
      return null;
    }
    return props.options.find((option) => {
      if (isOptionPrimitive.value) {
        return option === val;
      } else if (props.asObject) {
        return option?.[props.valueKey] === val?.[props.valueKey];
      }
      return option?.[props.valueKey] === val;
    });
  }

  function onOptionMouseOver(index: number) {
    navigatedIndex.value = index;
  }

  function onOptionMouseOut() {
    navigatedIndex.value = null;
  }

  function onClear() {
    modelValue.value = props.multiple ? ([] as ModelValue) : null;
    emits("clear");
  }

  function onFocus() {
    if (isDisabled.value) {
      return;
    }
    onOpen();
    dropdownRef.value.open();
  }

  function onBlur() {
    onClose();
    dropdownRef.value.close();
  }

  function onClose() {
    search.value = "";
    emits("search", search.value);
    emits("onClose");
    navigatedIndex.value = null;
    isFocus.value = false;
    inputRef.value.blur();
  }

  function onOpen() {
    const selectedIndex = filteredOptions.value.findIndex((option) => {
      return isOptionChecked(option);
    });
    if (selectedIndex !== -1) {
      navigatedIndex.value = selectedIndex;
    }
    inputRef.value.focus();
    isFocus.value = true;
  }
</script>

<template>
  <div
    class="ui-select__wrapper"
    :class="[{ 'is-disabled': props.disabled }]"
    @keydown.enter="onKeydownEnter"
    @keydown.down="onKeydownDown"
    @keydown.up="onKeydownUp"
    @keydown.tab="onBlur"
  >
    <input inputmode="none" ref="inputRef" :disabled="disabled" :id="id" class="ui-select__input" @focus="onFocus" />

    <UiDropdown
      v-model="isOpen"
      :offset="offset"
      ref="dropdownRef"
      @close="onClose"
      @open="onOpen"
      :popper-class="[popperClass ?? '', 'ui-select__popper']"
      :fit-content-width="fitContentWidth"
      :disabled="isDisabled"
      :placement="placement"
      :teleport="teleport"
    >
      <template #reference>
        <div
          class="ui-select"
          :class="[
            size,
            { 'is-focus': isFocus },
            { 'is-error': props.error },
            { 'is-filled': props.filled },
            { 'is-has-value': isHasValue },

            `type-${type}`
          ]"
        >
          <SelectTrigger
            :clearable="!!clearable"
            :isFocus="isFocus"
            :is-has-value="isHasValue"
            :is-active="isHasValue"
            :type="type"
            :placeholder="placeholder"
            :chevron-color="chevronColor"
            :chevron-name="chevronName"
            :chevron-size="chevronSize"
            @clear="onClear"
          >
            <slot
              :option="multiple ? (modelValue as ModelValue) : (valToOption(modelValue) as ModelValue)"
              name="selected"
            >
              <span v-if="selectedOptionLabel" :title="selectedOptionLabel"> {{ selectedOptionLabel }}</span>
            </slot>
          </SelectTrigger>
        </div>
      </template>
      <template #default>
        <div class="ui-select__content">
          <div v-if="$slots.header" class="ui-select__header">
            <slot name="header" />
          </div>

          <UiLoading
            icon-size="xl"
            class="ui-select__loading-inner"
            is-show
            v-if="loading && !options.length && !search"
          />

          <SelectSearch
            @update:model-value="(e: string | undefined) => $emit('search', e)"
            v-if="props.withSearch"
            v-model="search"
          />

          <div v-if="showNoDataBlock" class="ui-select__no-data-block">
            <p>{{ config.uiSelect.translations.notFound }}</p>
          </div>

          <SelectVirtualList
            v-if="isVirtualList"
            @changeInfinityScroll="$emit('changeInfinityScroll')"
            :size="itemSize"
            :options="filteredOptions"
            :is-loading="loading"
          >
            <template #default="{ item }">
              <SelectListItem
                :class="optionClass && optionClass(item.option, item.index)"
                :key="item.index"
                :size="itemSize"
                :is-navigated="navigatedIndex === item.index"
                :is-checked="isOptionChecked(item.option)"
                :is-disabled="isOptionDisabled(item.option)"
                @click.prevent="checkOption(item.option)"
                @mouseenter="onOptionMouseOver(item.index)"
                @mouseleave="onOptionMouseOut"
                :title="isOptionPrimitive ? item.option : item.option[labelKey]"
              >
                <span>
                  <slot :option="item.option" :checked="isOptionChecked(item.option)">
                    {{ isOptionPrimitive ? item.option : item.option[labelKey] }}
                  </slot>
                </span>
                <UiIcon v-if="isOptionChecked(item.option)" color="var(--color-icon-accent)" type="400" name="done" />
              </SelectListItem>
            </template>
          </SelectVirtualList>

          <SelectList
            v-else
            @changeInfinityScroll="$emit('changeInfinityScroll')"
            :search="search"
            :size="itemSize"
            :options="filteredOptions"
          >
            <template #default="{ options }">
              <SelectListItem
                v-for="{ index, data } in options"
                :class="optionClass && optionClass(data, index)"
                :key="index"
                :size="itemSize"
                :is-navigated="navigatedIndex === index"
                :is-checked="isOptionChecked(data)"
                :is-disabled="isOptionDisabled(data)"
                @click.prevent="checkOption(data)"
                @mouseenter="onOptionMouseOver(index)"
                @mouseleave="onOptionMouseOut"
                :title="isOptionPrimitive ? data : data[labelKey]"
              >
                <span>
                  <slot :option="data" :checked="isOptionChecked(data)">
                    {{ isOptionPrimitive ? data : data[labelKey] }}
                  </slot>
                </span>
                <UiIcon v-if="isOptionChecked(data)" color="var(--color-icon-accent)" type="400" name="done" />
              </SelectListItem>
            </template>
          </SelectList>
          <div v-if="$slots.footer" class="ui-select__footer">
            <slot name="footer" />
          </div>
        </div>
      </template>
    </UiDropdown>
  </div>
</template>

<style lang="scss">
  @use "./style/index";
</style>
