<script setup lang="ts" generic="Selected, Expanded, Data">
  import UiIconButton from "../UiIconButton/UiIconButton.vue";
  import Sort from "./components/TableSort.vue";
  import TableSummary from "./components/TableSummary.vue";

  import { uuidv4 } from "uuidv7";
  import { computed, nextTick, watch } from "vue";

  import { UiPaginationMeta } from "../UiPagination/types.ts";
  import { useExpande } from "./composables/useExpande.ts";
  import { useSelected } from "./composables/useSelected.ts";
  import { useSort } from "./composables/useSort.ts";
  import { getValueByHeaderName } from "./helpers/getValueByHeaderName.ts";

  import { config, UiCheckbox, UiPagination, UiSkeleton } from "@/lib";
  import {
    SummarySlotData,
    type UiTableProps,
    UiTableSortObject,
    UiTableSortOrder
  } from "@/lib/components/UiTable/types.ts";

  const props = withDefaults(defineProps<UiTableProps<Data>>(), {
    data: () => [],
    headers: () => [],
    tableLayout: "auto",
    emptyValue: "—",
    isShowPerPageSelect: true,
    skeletonRows: 3,
    summaryPosition: "bottom",
    isShowAlwaysPagination: false
  });

  const emits = defineEmits<{
    sortChange: [value: UiTableSortObject];
    rowClick: [row: Data];
    changePagination: [value: UiPaginationMeta];
    indeterminateChange: [value: boolean];
  }>();

  const disabled = defineModel<Selected[]>("disabled", { default: [] });
  const selected = defineModel<Selected[]>("selected", { default: [] });
  const expanded = defineModel<Expanded[]>("expanded", { default: [] });
  const sortObject = defineModel<UiTableSortObject>("sort", {
    default: {
      order: null,
      name: null
    }
  });

  const preparedData = computed(() => {
    return props.data.map((item) => {
      const hasRowKey =
        props.rowKey && item && typeof item === "object" && Object.prototype.hasOwnProperty.call(item, props.rowKey);
      return {
        row: item,
        id: hasRowKey ? item[props.rowKey] : uuidv4()
      };
    });
  });

  const dataIsNotDisabled = computed(() =>
    sortedData.value.filter((item) => !disabled.value.includes(props.disabledKey && item.row[props.disabledKey]))
  );

  const { sortedData, sort, isSorting } = useSort(preparedData, sortObject, props.emptyValue, props.headers);
  const { isAllSelected, isIndeterminate, selectRow, selectAll, selectedObject } = useSelected(
    dataIsNotDisabled,
    selected,
    props.selectedKey
  );
  const { expandeRow, expandeObj } = useExpande(sortedData, expanded, props.expandeKey);

  function sortHandler(sortObj: UiTableSortObject, isCustomSort: boolean) {
    isSorting.value = true;
    sort(sortObj, isCustomSort);
    nextTick(() => {
      emits("sortChange", sortObject.value);
    });
  }

  function selectAllHandler(value: boolean) {
    selectAll(value);
    emits("indeterminateChange", value);
  }

  function setRowClass(row: Data) {
    if (!props.rowClass) {
      return "";
    }
    return props.rowClass(row);
  }

  function handleHighlightRow(i: number) {
    return (props.highlightRow === "even" && i % 2) || (props.highlightRow === "odd" && i % 2 === 0);
  }

  watch(
    () => props.loading,
    (curr, prev) => {
      if (prev && !curr && isSorting.value) {
        isSorting.value = false;
      }
    }
  );
</script>

<template>
  <div>
    <div class="ui-table__wrapper">
      <table :cellpadding="0" :cellspacing="0" :style="{ tableLayout: tableLayout }" class="ui-table">
        <thead>
          <tr class="ui-table__header">
            <template v-if="$slots.header">
              <slot name="header" :headers="headers" />
            </template>
            <template v-else>
              <template v-for="header in props.headers" :key="header.name">
                <th
                  v-if="header.isShow === undefined ? true : header.isShow"
                  :colspan="header.colspan ?? 1"
                  :rowspan="1"
                  class="ui-table__header-cell"
                  :style="header.width ? `width: ${header.width}px` : ''"
                  :class="[{ 'is-selection-col': header.selection }]"
                >
                  <div class="ui-table__header-cell-inner" :class="[header.align]">
                    <template v-if="header.selection && sortedData?.length">
                      <UiCheckbox
                        :indeterminate="isIndeterminate"
                        :model-value="isAllSelected"
                        @update:model-value="selectAllHandler($event)"
                        @click.stop
                        class="ui-table__checkbox"
                        size="sm"
                      >
                      </UiCheckbox>
                    </template>
                    <template v-if="$slots['header-cell']">
                      <slot :title="header.label" name="header-cell" :header="header" />
                    </template>
                    <template v-else-if="header.name && $slots[`header-cell-${header.name}`]">
                      <slot :title="header.label" :name="`header-cell-${header.name}`" :header="header" />
                    </template>
                    <template v-else-if="header.label">
                      <slot :name="`header-cell-${header.name}-prepend`" />
                      <Sort
                        v-if="header.sortable"
                        :title="header.label"
                        @sort="
                          (order: UiTableSortOrder) => {
                            sortHandler(
                              {
                                order,
                                name: header.sortName ?? header.name ?? null
                              },
                              (header.sortable && header.sortable === 'custom') ?? false
                            );
                          }
                        "
                        :model-value="(header.sortName ?? header.name) === sortObject.name ? sortObject.order : null"
                      >
                        <span>{{ header.label }}</span>
                      </Sort>
                      <span v-else>{{ header.label }}</span>
                      <slot :name="`header-cell-${header.name}-append`" />
                    </template>
                  </div>
                </th>
              </template>
            </template>
          </tr>
        </thead>

        <tbody>
          <TableSummary
            v-if="showSummary && sortedData.length && summaryPosition === 'top'"
            :empty-value="emptyValue"
            :loading="loading"
            :prepared-data="preparedData"
            :headers="headers"
          >
            <template v-for="(_, slotName) in $slots" #[slotName]="scope: SummarySlotData">
              <slot :name="slotName" v-bind="scope" />
            </template>
          </TableSummary>
          <tr v-if="loading && !sortedData.length">
            <td :colspan="headers.length" class="ui-table__skeleton-container">
              <UiSkeleton :rows="skeletonRows" />
            </td>
          </tr>
          <tr v-else-if="!sortedData.length">
            <td :colspan="headers.length">
              <div class="ui-table__empty">{{ config.uiTable.translations.noData }}</div>
            </td>
          </tr>
          <template v-else>
            <template v-for="(item, rowIndex) in sortedData" :key="item.id">
              <tr
                @click="$emit('rowClick', item.row)"
                class="ui-table__body-row"
                :class="[
                  setRowClass(item.row),
                  { 'highlight-row': handleHighlightRow(rowIndex) },
                  { 'is-disabled': disabledKey && disabled.includes(item.row[disabledKey]) }
                ]"
              >
                <template v-if="$slots.body">
                  <slot name="body" :row="item.row" :headers="headers" :index="rowIndex" />
                </template>
                <template v-else>
                  <template v-for="header in props.headers" :key="header.name">
                    <td
                      v-if="header.isShow === undefined ? true : header.isShow"
                      :colspan="1"
                      :rowspan="1"
                      :class="[
                        'ui-table__body-cell',
                        {
                          'is-selection-col': header.selection,
                          'is-expande-col':
                            typeof header.expande === 'function' ? header.expande(item.row) : header.expande
                        },
                        header.columnClass && header.columnClass(item.row, header.name)
                      ]"
                    >
                      <Transition name="fade">
                        <div v-if="loading" class="ui-table__row-animation"></div>
                      </Transition>
                      <div class="ui-table__body-cell-inner" :class="[header.align]">
                        <template
                          v-if="typeof header.expande === 'function' ? header.expande(item.row) : header.expande"
                        >
                          <UiIconButton
                            :disabled="!!disabledKey && disabled.includes(item.row[disabledKey])"
                            class="ui-table__expande"
                            :class="{
                              'is-active': expandeKey ? expanded.includes(item.row[expandeKey]) : expandeObj[item.id]
                            }"
                            @click.stop="
                              expandeRow(
                                item.id,
                                !(expandeKey ? expanded.includes(item.row[expandeKey]) : expandeObj[item.id])
                              )
                            "
                            icon-name="keyboard-arrow-down"
                          />
                        </template>
                        <template v-if="header.selection">
                          <UiCheckbox
                            tabindex="1"
                            :model-value="
                              selectedKey ? selected.includes(item.row[selectedKey]) : selectedObject[item.id]
                            "
                            @update:model-value="selectRow(item.id, $event)"
                            @click.stop
                            class="ui-table__checkbox"
                            size="sm"
                            :disabled="!!disabledKey && disabled.includes(item.row[disabledKey])"
                          >
                          </UiCheckbox>
                        </template>
                        <template v-if="$slots['body-cell']">
                          <slot name="body-cell" :row="item.row" :header="header" :index="rowIndex" />
                        </template>
                        <template v-else-if="header.format">
                          {{ header.format(item.row) }}
                        </template>
                        <template v-else-if="header.name">
                          <template v-if="$slots[`body-cell-${header.name}`]">
                            <slot :name="`body-cell-${header.name}`" :row="item.row" :index="rowIndex" />
                          </template>
                          <template v-else>
                            {{ getValueByHeaderName(item.row, header.name, emptyValue) }}
                          </template>
                        </template>
                      </div>
                    </td>
                  </template>
                </template>
              </tr>
              <tr
                class="ui-table__expande-row"
                v-if="expandeKey ? expanded.includes(item.row[expandeKey]) : expandeObj[item.id]"
              >
                <td :colspan="headers.length">
                  <slot :row="item.row" :index="rowIndex" name="expande"></slot>
                </td>
              </tr>
            </template>
          </template>
        </tbody>

        <tfoot>
          <TableSummary
            v-if="showSummary && sortedData.length && summaryPosition === 'bottom'"
            :empty-value="emptyValue"
            :loading="loading"
            :prepared-data="preparedData"
            :headers="headers"
          >
            <template v-for="(_, slotName) in $slots" #[slotName]="scope: SummarySlotData">
              <slot :name="slotName" v-bind="scope" />
            </template>
          </TableSummary>
          <tr v-if="$slots.footer" class="ui-table__footer-row">
            <td :colspan="headers.length" class="ui-table__footer-cell">
              <slot name="footer" />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <UiPagination
      v-if="meta"
      class="ui-table__pagination"
      @change-page="(value) => $emit('changePagination', value)"
      @change-per-page="(value) => $emit('changePagination', value)"
      :disabled="loading"
      :page="meta.page"
      :per-page="meta.perPage"
      :total="meta.total"
      :next-page-exists="meta.nextPageExists"
      :isShowPerPageSelect="isShowPerPageSelect"
      :isShowAlwaysPagination="isShowAlwaysPagination"
      :keyPerPagPagination="keyPerPagPagination"
    />
  </div>
</template>

<style lang="scss">
  .ui-table {
    position: relative;
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;

    &__skeleton-container {
      padding: 8px;
    }

    &__pagination {
      margin-top: 24px;
    }

    &__wrapper {
      position: relative;
      overflow: auto;
      width: 100%;
      border: 1px solid var(--color-separator-border-primary);
      border-radius: 8px;
    }

    &__checkbox {
      align-items: start;
      justify-content: center;
    }

    &__expande {
      &.is-active {
        rotate: -180deg;
      }
    }

    &__expande-row {
      & > td {
        padding: 0;
      }
    }

    &__header {
      background: var(--color-background-secondary);
      box-shadow: 0 1px 0 0 var(--color-separator-border-primary);
      color: var(--color-text-secondary);
    }

    &__header-cell {
      overflow: hidden;
      height: 44px;
      padding: 0 12px;
      line-height: 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__header-cell-inner {
      display: flex;
      align-items: center;
      font-weight: 500;
      gap: 4px;

      &.center {
        justify-content: center;
      }

      &.right {
        justify-content: flex-end;
      }
    }

    &__body-row {
      position: relative;
      background-color: #fff;
      box-shadow: 0 1px 0 0 var(--color-separator-border-primary) inset;
      transition: var(--transition);

      &:hover {
        background-color: var(--color-background-secondary);
      }

      &.highlight-row {
        background-color: #f7f9fb;
      }

      &.is-disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }

    &__row-animation {
      position: absolute;
      z-index: 1;
      border-radius: 8px;
      margin: 8px;
      animation: ui-table-loading-anim 1.4s ease infinite;
      background: linear-gradient(
        90deg,
        var(--color-background-secondary) 25%,
        var(--color-background-tertiary) 37%,
        var(--color-background-secondary) 63%
      );
      background-size: 400% 100%;
      content: "";
      inset: 0;
      opacity: 1;
      transition: var(--transition);
    }

    &__body-cell,
    &__summary-cell,
    &__footer-cell {
      padding: 12px;
      line-height: 20px;
      overflow-wrap: break-word;

      &:has(button) {
        padding: 10px 12px;
      }
    }

    &__body-cell-inner,
    &__summary-cell-inner {
      display: flex;
      align-items: center;
      color: var(--color-text-primary);
      font-weight: 400;
      word-break: break-word;

      &.center {
        justify-content: center;
      }

      &.right {
        justify-content: flex-end;
      }
    }

    &__summary-cell-inner {
      font-weight: 500;
    }

    &__empty {
      width: 100%;
      height: 44px;
      background-color: var(--color-white);
      color: var(--color-text-secondary);
      font-weight: 500;
      line-height: 44px;
      text-align: center;
    }

    .is-selection-col {
      width: 44px;
      height: 44px;

      .ui-checkbox {
        margin: 0 auto;
      }
    }
  }

  @keyframes ui-table-loading-anim {
    0% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0 50%;
    }
  }
</style>
