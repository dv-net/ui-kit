<script lang="ts" setup generic="Data">
  import { getValueByHeaderName } from "../helpers/getValueByHeaderName.ts";
  import { PreparedData, UiTableHeader } from "../types.ts";
  const props = defineProps<{
    emptyValue: string | boolean;
    loading?: boolean;
    headers: UiTableHeader<Data>[];
    preparedData: PreparedData<Data>[];
  }>();
  function getArrayValuesByHeaderName(name: string) {
    return props.preparedData.map((item) => getValueByHeaderName(item.row, name, props.emptyValue));
  }

  function getSummaryValue(headerName: string) {
    const values = getArrayValuesByHeaderName(headerName);
    const isNumbers = values.every((item) => typeof item === "number");
    if (isNumbers) {
      return values.reduce((acc, next) => acc + next, 0);
    } else {
      return "N/A";
    }
  }
</script>
<template>
  <tr class="ui-table__body-row">
    <template v-for="(header, summaryIndex) in headers" :key="header.name">
      <td
        v-if="header.isShow === undefined ? true : header.isShow"
        :colspan="1"
        :rowspan="1"
        :class="[{ 'is-selection-col': header.selection }]"
        class="ui-table__summary-cell"
      >
        <Transition name="fade">
          <div v-if="loading" class="ui-table__row-animation"></div>
        </Transition>
        <div class="ui-table__summary-cell-inner" :class="[header.align]">
          <template v-if="$slots['summary-cell']">
            <slot :index="summaryIndex" name="summary-cell" :header="header" />
          </template>

          <template v-else-if="header.name">
            <template v-if="$slots[`summary-cell-${header.name}`]">
              <slot :name="`summary-cell-${header.name}`" :summary="getSummaryValue(header.name)" />
            </template>
            <template v-else-if="header.summary">
              {{ header.summary(getSummaryValue(header.name)) }}
            </template>
            <template v-else>
              {{ getSummaryValue(header.name) }}
            </template>
          </template>
        </div>
      </td>
    </template>
  </tr>
</template>
