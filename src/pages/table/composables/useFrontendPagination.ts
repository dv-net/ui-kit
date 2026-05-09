import { computed, type MaybeRefOrGetter, ref, toValue, watch } from "vue";

import type { UiPaginationMeta } from "@/lib/components/UiPagination/types";

export interface IUseFrontendPaginationOptions {
	initialPage?: number;
	initialPerPage?: number;
}

export const useFrontendPagination = <T>(
	itemsSource: MaybeRefOrGetter<T[]>,
	options: IUseFrontendPaginationOptions = {}
) => {
	const paginationMeta = ref<UiPaginationMeta>({
		page: options.initialPage ?? 1,
		perPage: options.initialPerPage ?? 100
	});

	const items = computed<T[]>(() => toValue(itemsSource));

	const total = computed<number>(() => items.value.length);

	const pagedData = computed<T[]>(() => {
		const start = (paginationMeta.value.page - 1) * paginationMeta.value.perPage;
		const end = start + paginationMeta.value.perPage;
		return items.value.slice(start, end);
	});

	const handleUpdatePage = (value: number): void => {
		paginationMeta.value.page = value;
	};

	const handleUpdatePerPage = (value: number): void => {
		paginationMeta.value.perPage = value;
		paginationMeta.value.page = 1;
	};

	const tableMeta = computed(() => ({
		page: paginationMeta.value.page,
		perPage: paginationMeta.value.perPage,
		total: total.value
	}));

	const handleTablePagination = (value: UiPaginationMeta): void => {
		paginationMeta.value = value;
	};

	watch(total, (length) => {
		const maxPage = Math.max(1, Math.ceil(length / paginationMeta.value.perPage));
		if (paginationMeta.value.page > maxPage) {
			paginationMeta.value.page = maxPage;
		}
	});

	return {
		paginationMeta,
		total,
		pagedData,
		tableMeta,
		handleUpdatePage,
		handleUpdatePerPage,
		handleTablePagination
	};
};
