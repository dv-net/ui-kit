import { ComputedRef, Ref, ref } from "vue";

export function useKeyboard<Options>({
  isFocus,
  checkOption,
  filteredOptions
}: {
  isFocus: Ref<boolean>;
  checkOption: (value: unknown) => void;
  filteredOptions: ComputedRef<Options[]>;
}) {
  const navigatedIndex = ref<number | null>(null);
  function onKeydownEnter() {
    if (navigatedIndex.value !== null) {
      checkOption(filteredOptions.value?.[navigatedIndex.value]);
    }
  }

  function onKeydownDown() {
    if (!isFocus.value) {
      return;
    }
    if (navigatedIndex.value === null) {
      navigatedIndex.value = 0;
    } else if (navigatedIndex.value === filteredOptions.value.length - 1) {
      navigatedIndex.value = 0;
    } else {
      navigatedIndex.value++;
    }
  }

  function onKeydownUp() {
    if (!isFocus.value) {
      return;
    }
    if (navigatedIndex.value === null) {
      navigatedIndex.value = filteredOptions.value.length - 1;
    } else if (navigatedIndex.value === 0) {
      navigatedIndex.value = filteredOptions.value.length - 1;
    } else {
      navigatedIndex.value--;
    }
  }
  return { onKeydownEnter, onKeydownDown, onKeydownUp, navigatedIndex };
}
