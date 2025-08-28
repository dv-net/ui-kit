import { computed, ComputedRef, Ref, ref } from "vue";

import { PreparedData } from "@/lib/components/UiTable/types.ts";

export function useSelected<T>(
  data: ComputedRef<PreparedData<T>[]>,
  selectedModel: Ref<unknown[]>,
  selectedKey: string | undefined
) {
  const selectedObject = ref({});

  const isAllSelected = computed(() => {
    return selectedKey
      ? selectedModel.value.length === data.value.length
      : data.value.every((item) => !!selectedObject.value[item.id]);
  });

  const isIndeterminate = computed(() => {
    return selectedKey
      ? selectedModel.value.length > 0 && !isAllSelected.value
      : data.value.some((item) => !!selectedObject.value[item.id]) &&
          data.value.some((item) => !selectedObject.value[item.id]);
  });

  function selectRow(id: string, value: boolean) {
    if (selectedKey) {
      const row = data.value.find((item) => item.id === id)?.row;
      if (row)
        if (selectedModel.value.includes(row[selectedKey])) {
          selectedModel.value = selectedModel.value.filter((item) => item !== row[selectedKey]);
        } else {
          selectedModel.value = [...selectedModel.value, row[selectedKey]];
        }
    } else {
      selectedObject.value[id] = value;
      updateSelected();
    }
  }

  function selectAll(value: boolean) {
    if (selectedKey) {
      if (isAllSelected.value) {
        selectedModel.value = [];
      } else {
        selectedModel.value = data.value.map((item) => item.row[selectedKey]);
      }
    } else {
      if (!value) {
        selectedObject.value = {};
      } else {
        selectedObject.value = data.value.reduce((acc, cur) => {
          return {
            ...acc,
            [cur.id]: true
          };
        }, {});
      }
      updateSelected();
    }
  }

  function updateSelected() {
    selectedModel.value = data.value.reduce((acc: unknown[], cur: PreparedData<T>) => {
      if (selectedObject.value[cur.id]) {
        return [...acc, cur.row];
      }
      return acc;
    }, []);
  }

  return {
    isAllSelected,
    isIndeterminate,
    selectRow,
    selectAll,
    selectedObject
  };
}
