export interface UiPaginationProps {
  keyPerPagPagination?: string;
  disabled?: boolean;
  perPagePresets?: number[];
  total?: number;
  nextPageExists?: boolean | null;
  isShowPerPageSelect?: boolean;
  isShowAlwaysPagination?: boolean;
}
export interface UiPaginationMeta {
  page: number;
  perPage: number;
}
