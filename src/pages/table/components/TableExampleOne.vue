<script setup lang="ts">
  import UiTable from "@/lib/components/UiTable/UiTable.vue";

  import { ref } from "vue";

  import { UiTableHeader } from "@/lib/components/UiTable/types.ts";
  import { useFrontendPagination } from "@/pages/table/composables/useFrontendPagination.ts";

  interface User {
    id: number;
    firstName: string;
    lastName: string;
    isAccountActive: boolean;
  }

  defineProps<{ isLoading: boolean }>();

  const data = ref<User[]>([
    {
      id: 1,
      firstName: "Elena",
      lastName: "Volkova",
      isAccountActive: false
    },
    {
      id: 2,
      firstName: "Marcus",
      lastName: "Nguyen",
      isAccountActive: true
    },
    {
      id: 3,
      firstName: "Sofia",
      lastName: "Martinez",
      isAccountActive: true
    },
    {
      id: 4,
      firstName: "James",
      lastName: "O'Connor",
      isAccountActive: true
    },
    {
      id: 5,
      firstName: "Amira",
      lastName: "Hassan",
      isAccountActive: false
    },
    {
      id: 6,
      firstName: "Dmitry",
      lastName: "Sokolov",
      isAccountActive: true
    },
    {
      id: 7,
      firstName: "Anna",
      lastName: "Lindström",
      isAccountActive: true
    },
    {
      id: 8,
      firstName: "Kenji",
      lastName: "Yamamoto",
      isAccountActive: false
    },
    {
      id: 9,
      firstName: "Isabel",
      lastName: "Ribeiro",
      isAccountActive: true
    },
    {
      id: 10,
      firstName: "Oliver",
      lastName: "Thompson",
      isAccountActive: true
    },
    {
      id: 11,
      firstName: "Fatima",
      lastName: "Al-Farsi",
      isAccountActive: false
    },
    {
      id: 12,
      firstName: "Lukas",
      lastName: "Nowak",
      isAccountActive: true
    },
    {
      id: 13,
      firstName: "Yuki",
      lastName: "Tanaka",
      isAccountActive: true
    }
  ]);

  const { pagedData, tableMeta, handleTablePagination } = useFrontendPagination(data, {
    initialPerPage: 3
  });

  const perPagePresets: number[] = [3, 6, 10];

  const columns = ref<UiTableHeader<User>[]>([
    {
      sortable: true,
      label: "ID",
      name: "id"
    },
    {
      sortable: true,
      label: "First name",
      name: "firstName"
    },
    {
      sortable: true,
      label: "Last name",
      name: "lastName"
    },
    {
      sortable: true,
      label: "Active",
      name: "isAccountActive"
    }
  ]);
</script>

<template>
  <UiTable
    :loading="isLoading"
    :data="pagedData"
    :headers="columns"
    row-key="id"
    :meta="tableMeta"
    is-show-per-page-select
    :per-page-presets="perPagePresets"
    @changePagination="handleTablePagination"
  >
    <template #body-cell-firstName="{ row }">
      {{ row.firstName }}
    </template>
  </UiTable>
</template>