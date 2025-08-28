export type UiTableSortOrder = "asc" | "desc" | null;
export type UiTableColumnAlign = "left" | "center" | "right";
export type SummaryPosition = "top" | "bottom";
export interface UItableMeta {
  page: number;
  perPage: number;
  total?: number;
  nextPageExists?: boolean;
}
export interface SummarySlotData {
  key: number;
  summary: number | "N/A";
}
export interface UiTableSortObject {
  name: string | null;
  order: UiTableSortOrder;
}

export type PreparedData<Data> = {
  id: string;
  row: Data;
};

export interface UiTableHeader<T = unknown> {
  align?: UiTableColumnAlign;
  label?: string;
  format?: (row: T) => unknown;
  sort?: () => number;
  summary?: (summary: number | string) => unknown;
  width?: string;
  name?: string;
  sortable?: boolean | "custom";
  selection?: boolean;
  expande?: boolean | ((row: T) => boolean);
  isShow?: boolean;
  sortName?: string;
  columnClass?: (row: T, headerName?: string) => string;
  isNumberSort?: boolean;
  colspan?: number;
}

export interface UiTableProps<T> {
  data: T[];
  headers: UiTableHeader<T>[];
  rowClass?: (row: T) => string;
  tableLayout?: "auto" | "fixed";
  loading?: boolean;
  selectedKey?: string;
  expandeKey?: string;
  disabledKey?: string;
  rowKey?: string;
  keyPerPagPagination?: string;
  skeletonRows?: number;
  showSummary?: boolean;
  meta?: UItableMeta | null;
  emptyValue?: boolean | string;
  highlightRow?: "odd" | "even";
  isShowPerPageSelect?: boolean;
  summaryPosition?: SummaryPosition;
  isShowAlwaysPagination?: boolean;
}
