<script lang="ts" setup>
  import IconArrow from "./components/IconArrow.vue";

  import { computed } from "vue";

  import { UiPaginationMeta, UiPaginationProps } from "./types";

  import { config, UiIcon, UiSelect } from "@/lib";

  const props = withDefaults(defineProps<UiPaginationProps>(), {
    perPagePresets: () => [10, 20, 50, 100, 200],
    total: 0,
    nextPageExists: null
  });
  const emits = defineEmits<{
    changePerPage: [value: UiPaginationMeta];
    changePage: [value: UiPaginationMeta];
  }>();

  const isUnknownPagination = typeof props.nextPageExists === "boolean";
  const page = defineModel<number>("page", { default: 1 });
  const perPage = defineModel<number>("perPage", { default: 20 });
  const pagesCount = computed(() => Math.ceil(props.total / perPage.value));

  function emitChangePage() {
    emits("changePage", {
      page: page.value,
      perPage: perPage.value
    });
  }

  function setPerPage() {
    if (page.value > pagesCount.value) {
      page.value = pagesCount.value;
    }
    if (props.keyPerPagPagination) {
      localStorage.setItem(props.keyPerPagPagination, String(perPage.value));
    }
    emits("changePerPage", {
      page: page.value,
      perPage: perPage.value
    });
  }

  function setNextPage() {
    if (page.value < pagesCount.value || props.nextPageExists) {
      page.value += 1;
    }
    emitChangePage();
  }

  function setLastPage() {
    page.value = pagesCount.value;
    emitChangePage();
  }

  function setFirstPage() {
    page.value = 1;
    emitChangePage();
  }

  function setPrevPage() {
    if (page.value > 1) {
      page.value -= 1;
      emitChangePage();
    }
  }
</script>
<template>
  <div
    v-if="
      (isShowAlwaysPagination && props.total) ||
      pagesCount > 1 ||
      (isUnknownPagination && !(nextPageExists === false && page === 1))
    "
    class="ui-pagination"
  >
    <div v-if="isShowPerPageSelect && !isUnknownPagination" class="ui-pagination__show">
      <span>{{ config.uiPagination.translations.show }}</span>
      <UiSelect
        :disabled="disabled"
        @change="setPerPage"
        filled
        :fit-content-width="false"
        v-model="perPage"
        class="ui-pagination__select"
        :options="perPagePresets"
      />
    </div>
    <div v-else />

    <div class="ui-pagination__actions">
      <span>
        {{ page }}
        <template v-if="!isUnknownPagination">{{ config.uiPagination.translations.from }} {{ pagesCount }}</template>
      </span>
      <div class="ui-pagination__btns">
        <button
          v-if="!isUnknownPagination"
          @click="setFirstPage"
          :disabled="page === 1 || disabled"
          class="ui-pagination__btn-first"
        >
          <IconArrow />
        </button>
        <button @click="setPrevPage" :disabled="page === 1 || disabled">
          <UiIcon name="chevron-left 1" type="400" />
        </button>
        <button @click="setNextPage" :disabled="page === pagesCount || nextPageExists === false || disabled">
          <UiIcon name="chevron-right" type="400" />
        </button>
        <button
          v-if="!isUnknownPagination"
          @click="setLastPage"
          :disabled="page === pagesCount"
          class="ui-pagination__btn-last"
        >
          <IconArrow />
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .ui-pagination {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    &__show {
      & > span {
        color: var(--color-text-secondary);
        font-weight: 500;
      }

      display: flex;
      align-items: center;
      gap: 12px;
    }

    &__select {
      .ui-select {
        height: 32px !important;
      }
    }

    &__actions {
      display: flex;
      align-items: center;
      gap: 12px;

      & > span {
        color: var(--color-text-secondary);
        font-weight: 500;
      }
    }

    &__btns {
      display: flex;
      align-items: center;
      gap: 8px;

      button {
        display: flex;
        width: 32px;
        height: 32px;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: none;
        border-radius: 8px;
        background-color: var(--color-state-secondary);
        cursor: pointer;
        outline: none;
        transition: var(--transition);

        &.ui-pagination__btn-first,
        &.ui-pagination__btn-last {
          &:disabled {
            background-color: transparent;
          }

          background-color: transparent;
        }

        &.ui-pagination__btn-last {
          rotate: 180deg;
        }

        &:hover {
          background-color: var(--color-state-secondary-hover);
        }

        &:focus-visible {
          background-color: var(--color-state-secondary-pressed);
        }

        &:disabled {
          background-color: var(--color-state-secondary-disabled);
          color: var(--color-icon-inactive);
          cursor: not-allowed;
        }
      }
    }
  }
</style>
