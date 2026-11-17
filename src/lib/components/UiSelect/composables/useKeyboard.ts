import { ComputedRef, Ref, ref } from "vue";

export function useKeyboard<Options>({
  isOpen,
  isDisabled,
  checkOption,
  filteredOptions,
  isOptionDisabled,
  open
}: {
  isOpen: Ref<boolean>;
  isDisabled: ComputedRef<boolean>;
  checkOption: (value: unknown) => void;
  filteredOptions: ComputedRef<Options[]>;
  isOptionDisabled: (option: unknown) => boolean;
  open: (preferEnd?: boolean) => void;
}) {
  const navigatedIndex = ref<number | null>(null);

  function isSelectable(index: number) {
    const option = filteredOptions.value[index];
    return option !== undefined && !isOptionDisabled(option);
  }

  function firstSelectableIndex() {
    const index = filteredOptions.value.findIndex((_, optionIndex) => isSelectable(optionIndex));
    return index === -1 ? null : index;
  }

  function lastSelectableIndex() {
    const list = filteredOptions.value;
    for (let index = list.length - 1; index >= 0; index--) {
      if (isSelectable(index)) {
        return index;
      }
    }
    return null;
  }

  function moveHighlight(step: 1 | -1) {
    const indexes: number[] = [];
    filteredOptions.value.forEach((_, index) => {
      if (isSelectable(index)) {
        indexes.push(index);
      }
    });
    if (!indexes.length) {
      return;
    }
    const position = indexes.indexOf(navigatedIndex.value ?? -1);
    if (position === -1) {
      navigatedIndex.value = step > 0 ? indexes[0] : indexes[indexes.length - 1];
      return;
    }
    const next = position + step;
    if (next < 0 || next >= indexes.length) {
      return;
    }
    navigatedIndex.value = indexes[next];
  }

  function confirmHighlighted() {
    if (navigatedIndex.value === null) {
      return;
    }
    const option = filteredOptions.value[navigatedIndex.value];
    if (option === undefined || isOptionDisabled(option)) {
      return;
    }
    checkOption(option);
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }
    if (isDisabled.value) {
      return;
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "Enter") {
      return;
    }

    if (!isOpen.value) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        open(event.key === "ArrowUp");
      }
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    if (event.key === "ArrowDown") {
      moveHighlight(1);
    } else if (event.key === "ArrowUp") {
      moveHighlight(-1);
    } else {
      confirmHighlighted();
    }
  }

  return { onKeydown, navigatedIndex, firstSelectableIndex, lastSelectableIndex };
}
