import { ComputedRef, Ref,ref } from "vue";

import { PreparedData } from "@/lib/components/UiTable/types.ts";

export function useExpande<T>(
  data: ComputedRef<PreparedData<T>[]>,
  expandeModel: Ref<unknown[]>,
  expandeKey: string | undefined
) {
  const expandeObj = ref({});

  function expandeRow(id: string, value: boolean) {
    if (expandeKey) {
      const row = data.value.find((item) => item.id === id)?.row;

      if (row)
        if (expandeModel.value.includes(row[expandeKey])) {
          expandeModel.value = expandeModel.value.filter((item) => item !== row[expandeKey]);
        } else {
          expandeModel.value = [...expandeModel.value, row[expandeKey]];
        }
    } else {
      expandeObj.value[id] = value;
      updateExpanded();
    }
  }

  function updateExpanded() {
    expandeModel.value = data.value.reduce((acc: unknown[], cur: PreparedData<T>) => {
      if (expandeObj.value[cur.id]) {
        return [...acc, cur.row];
      }
      return acc;
    }, []);
  }

  return {
    expandeRow,
    expandeObj
  };
}
