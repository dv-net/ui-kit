import { computed, ComputedRef, Ref, ref } from "vue";

import { getValueByHeaderName } from "../helpers/getValueByHeaderName";
import { PreparedData, UiTableHeader, UiTableSortObject } from "../types";

export function useSort<T>(
  preparedData: ComputedRef<PreparedData<T>[]>,
  sortObject: Ref<UiTableSortObject>,
  emptyValue: string | boolean,
  headers: UiTableHeader<T>[]
) {
  const isCustomSortMode = ref(false);
  const isSorting = ref(false);

  const sortedData = computed(() => {
    if (sortObject.value.order && !isCustomSortMode.value) {
      const isNumberSort =
        sortObject.value.name && headers.find((header) => header.name === sortObject.value.name)?.isNumberSort;

      return preparedData.value.toSorted((a, b) => {
        const firstValue = getValueByHeaderName(a.row, sortObject.value.name ?? "", emptyValue);
        const secondValue = getValueByHeaderName(b.row, sortObject.value.name ?? "", emptyValue);
        const isStringType = typeof firstValue === "string" && typeof secondValue === "string";
        const isNumberType = typeof firstValue === "number" && typeof secondValue === "number";
        const isBooleanType = typeof firstValue === "boolean" && typeof secondValue === "boolean";
        const isAsc = sortObject.value.order === "asc";

        function compareFn(valueA: string | number, valueB: string | number) {
          const mightNumberValueA = isNumberSort && isStringType ? parseFloat(valueA as string) : valueA;
          const mightNumberValueB = isNumberSort && isStringType ? parseFloat(valueB as string) : valueB;

          if (mightNumberValueA < mightNumberValueB) return isAsc ? -1 : 1;
          if (mightNumberValueA > mightNumberValueB) return isAsc ? 1 : -1;
          return 0;
        }

        if (isStringType || isNumberType) {
          return compareFn(firstValue, secondValue);
        }
        if (isBooleanType) {
          return compareFn(Number(firstValue), Number(secondValue));
        }
        return 0;
      });
    }
    return preparedData.value;
  });

  function sort({ name, order }: UiTableSortObject, isCustomSort: boolean) {
    sortObject.value = {
      name,
      order
    };
    isCustomSortMode.value = isCustomSort;
  }

  return {
    isCustomSortMode,
    sortedData,
    sortObject,
    isSorting,
    sort
  };
}
