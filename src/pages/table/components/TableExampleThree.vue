<script setup lang="ts">
  import UiTable from "@/lib/components/UiTable/UiTable.vue";

  import { ref } from "vue";

  import { UiTableHeader, UiTableSortObject } from "@/lib/components/UiTable/types.ts";

  interface User {
    id: number;
    firstName: string;
    lastName: string;
    isAccountActive: boolean;
  }

  defineProps<{ isLoading: boolean }>();

  const defaultRows: User[] = [
    {
      id: 1,
      firstName: "Clara",
      lastName: "Weber",
      isAccountActive: false
    },
    {
      id: 2,
      firstName: "Theo",
      lastName: "Nakamura",
      isAccountActive: true
    },
    {
      id: 3,
      firstName: "Priya",
      lastName: "Kapoor",
      isAccountActive: true
    }
  ];

  const disabled = ref<string[]>(["Theo"]);
  const data = ref<User[]>(defaultRows.map((row) => ({ ...row })));
  const sortObj = ref<UiTableSortObject>({ order: null, name: null });

  const cloneRows = (rows: User[]): User[] => rows.map((row) => ({ ...row }));

  const applyLastNameSort = (order: "asc" | "desc") => {
    const rows = cloneRows(defaultRows);
    const pinned = rows.find((r) => r.lastName === "Weber");
    const rest = rows.filter((r) => r.lastName !== "Weber");
    rest.sort((a, b) => {
      const cmp = a.lastName.localeCompare(b.lastName);
      return order === "asc" ? cmp : -cmp;
    });
    data.value = pinned ? [pinned, ...rest] : rest;
  };

  const resetRowsOrder = () => {
    data.value = cloneRows(defaultRows);
  };

  const onSortChange = (so: UiTableSortObject) => {
    if (so.name === "lastName" && so.order) {
      applyLastNameSort(so.order);
    } else {
      resetRowsOrder();
    }
  };

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
      sortable: "custom",
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
    :data="data"
    :headers="columns"
    row-key="id"
    v-model:sort="sortObj"
    v-model:disabled="disabled"
    disabledKey="firstName"
    @sort-change="onSortChange"
  />
</template>