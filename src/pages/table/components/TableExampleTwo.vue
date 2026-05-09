<script setup lang="ts">
  import UiTable from "@/lib/components/UiTable/UiTable.vue";

  import { ref } from "vue";

  import { UiTableHeader, UiTableSortObject } from "@/lib/components/UiTable/types.ts";

  interface User {
    id: number;
    firstName: string;
    lastName: string;
    isAccountActive: boolean;
    person: {
      age: number;
      amount: string;
      gender?: string;
    };
  }

  defineProps<{ isLoading: boolean }>();

  const sortObj = ref<UiTableSortObject>({ order: "desc", name: "isAccountActive" });
  const expandListId = ref<Array<number>>([]);
  const selectedIds = ref<number[]>([]);
  const data = ref<User[]>([
    {
      id: 1,
      firstName: "Christophe",
      lastName: "Aolan",
      isAccountActive: false,
      person: {
        age: 25,
        amount: "1522",
        gender: "male"
      }
    },
    {
      id: 2,
      firstName: "Ralf",
      lastName: "Calf",
      isAccountActive: true,
      person: {
        age: 33,
        amount: "533",
        gender: "male"
      }
    },
    {
      id: 3,
      firstName: "Paul",
      lastName: "Branklin",
      isAccountActive: true,
      person: {
        age: 11,
        amount: "125",
        gender: "male"
      }
    }
  ]);
  const columns = ref<UiTableHeader<User>[]>([
    {
      selection: true
    },
    {
      // colspan: 2,
      // isShow: false,
      sortable: true,
      label: "First name",
      name: "firstName",
      summary: () => `Summary: ${data.value.length}`
    },
    {
      sortable: true,
      label: "Last name",
      name: "lastName",
      summary: () => ""
    },
    {
      sortable: true,
      label: "Active",
      name: "isAccountActive",
      summary: () => ""
    },
    {
      label: "Age",
      name: "person.age",
      sortable: true,
      sortName: "person.age",
      summary: (v) => (typeof v === "number" ? `Σ ${v}` : 0)
    },
    {
      label: "Amount",
      name: "person.amount",
      sortable: true,
      sortName: "person.amount",
      isNumberSort: true,
      summary: () => "",
      format: (row) => `$${row.person.amount}`
    },
    {
      label: "Gender",
      name: "person.gender",
      sortable: "custom",
      sortName: "gender",
      summary: () => "",
      columnClass: (_row, _headerName) => "is-red-column"
    },
    {
      expande: true,
      align: "right"
    }
  ]);

  const handleRowClick = (key: number) => {
    if (expandListId.value.includes(key)) {
      expandListId.value = expandListId.value.filter((item) => item !== key);
    } else {
      expandListId.value.push(key);
    }
  };

  function getRowClass(row: User) {
    return row.firstName === "Paul" ? "hide-expande-button" : "pointer";
  }
</script>

<template>
  <UiTable
    :loading="isLoading"
    :data="data"
    :headers="columns"
    row-key="id"
    :row-class="getRowClass"
    highlight-row="even"
    showSummary
    v-model:sort="sortObj"
    selectedKey="id"
    v-model:selected="selectedIds"
    expande-key="id"
    v-model:expanded="expandListId"
    @row-click="(row) => handleRowClick(row.id)"
  >
    <template #body-cell-firstName="{ row }">
      {{ row.firstName }}
    </template>
    <template #expande>
      <div class="expande">Example of a nested block</div>
    </template>
  </UiTable>
</template>

<style lang="scss">
  .expande {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    border-radius: 12px;
    margin: 24px;
    background-color: #f7f9fb;
    color: black;
    font-size: 16px;
  }
</style>